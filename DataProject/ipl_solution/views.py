import json

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Delivery, Match, Umpire
from django.db.models import Sum, Count
from .config import logger


def teams_runs(request):
    try:
        return render(request, "ipl_solution/sol1.html")
    except Exception as e:
        logger.error(e)


def show_data(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
            teams = data['teams']
            start = data['start']
            end = data['end']
            filtered_data = (
                Delivery.objects.values("batting_team")
                    .filter(batting_team__in=teams)
                    .annotate(total_runs=Sum("total_runs"))
                    .filter(total_runs__gte=int(start[0]),
                            total_runs__lte=int(end[0]))
                    .order_by("total_runs")
            )
            sol_dict = {}
            for row in filtered_data:
                sol_dict[row["batting_team"]] = row["total_runs"]
            print(sol_dict)
            return JsonResponse({"data": json.dumps(sol_dict)})
    except Exception as e:
        logger.error(e)


def teams_runs_graph(request):
    try:
        data = (
            Delivery.objects.values("batting_team")
                .annotate(total_runs=Sum("total_runs"))
                .order_by("total_runs")
        )
        sol_dict = {}
        for row in data:
            sol_dict[row["batting_team"]] = row["total_runs"]
        return JsonResponse({"data": json.dumps(sol_dict)})
    except Exception as e:
        logger.error(e)


def player_runs(request):
    try:
        content = []
        data = (
            Delivery.objects.values("batsman")
                .filter(batting_team="Royal_Challengers_Bangalore")
                .annotate(total_runs=Sum("total_runs"))
                .order_by("batsman")
        )
        for row in data:
            sol_dict = {}
            sol_dict[row["batsman"]] = row["total_runs"]
            content.append(sol_dict)
        return JsonResponse({"data": content})

    except Exception as e:
        logger.error(e)


def umpire_nationality(request):
    try:
        content = []
        data = (
            Umpire.objects.values("nationality")
                .exclude(nationality="India")
                .annotate(total_umpires=Count("umpire"))
                .order_by("nationality")
        )
        for row in data:
            sol_dict = {}
            sol_dict[row["nationality"]] = row["total_umpires"]
            content.append(sol_dict)
        return JsonResponse({"data": content})

    except Exception as e:
        logger.error(e)


def matches_teams_season(request):
    try:
        content = []
        data = (
            Match.objects.values("team1", "season")
                .annotate(total_matches=Count("team1"))
                .order_by("season")
        )
        print(data)
        sol_dict = {}
        for row in data:
            if row["season"] in sol_dict:
                sol_dict[row["season"]][row["team1"]] = row["total_matches"]
            else:
                sol_dict[row["season"]] = {}
                sol_dict[row["season"]][row["team1"]] = row["total_matches"]
        content.append(sol_dict)
        return JsonResponse({"data": content})

    except Exception as e:
        logger.error(e)
