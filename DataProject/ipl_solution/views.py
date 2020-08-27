import json
from django.db.models import Sum, Count
from django.http import JsonResponse
from django.shortcuts import render
from .config import logger
from .models import Delivery, Match, Umpire


def teams_runs(request):
    """renders the home page"""
    try:
        return render(request, "ipl_solution/sol1.html")
    except Exception as e:
        logger.error(e)


def teams_runs_data(request):
    """returns json data of teams vs runs"""
    try:
        data = (
            Delivery.objects.values("batting_team")
            .annotate(total_runs=Sum("total_runs"))
            .order_by("total_runs")
        )
        teams = []
        for row in data:
            teams.append(row["batting_team"])
        return JsonResponse({"data": teams})

    except Exception as e:
        logger.error(e)


def teams_runs_graph(request):
    """return json data required for plot"""
    try:
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
            teams = data["teams"]
            start = data["start"]
            end = data["end"]
            if teams:
                filtered_data = (
                    Delivery.objects.values("batting_team")
                    .filter(batting_team__in=teams)
                    .annotate(total_runs=Sum("total_runs"))
                    .filter(
                        total_runs__gte=int(start[0] or 0),
                        total_runs__lte=int(end[0]) or 30000,
                    )
                    .order_by("total_runs")
                )
            else:
                filtered_data = (
                    Delivery.objects.values("batting_team")
                    .annotate(total_runs=Sum("total_runs"))
                    .filter(
                        total_runs__gte=int(start[0] or 0),
                        total_runs__lte=int(end[0]) or 30000,
                    )
                    .order_by("total_runs")
                )
            sol_dict = {}
            for row in filtered_data:
                sol_dict[row["batting_team"]] = row["total_runs"]
            return JsonResponse({"data": json.dumps(sol_dict)})

    except Exception as e:
        logger.error(e)


def player_runs(request):
    """renders html page for players vs runs"""
    try:
        return render(request, "ipl_solution/sol2.html")
    except Exception as e:
        logger.error(e)


def player_data(request):
    """returns json data for players vs runs"""
    try:
        data = (
            Delivery.objects.values("batsman")
            .filter(batting_team="Royal_Challengers_Bangalore")
            .annotate(total_runs=Sum("total_runs"))
            .order_by("total_runs")
        )
        sol_dict = []
        for row in data:
            sol_dict.append(row["batsman"])
        return JsonResponse({"data": sol_dict})
    except Exception as e:
        logger.error(e)


def player_runs_graph(request):
    """returns json data required for plot"""
    try:
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
            players = data["players"]
            start = data["start"]
            end = data["end"]
            if players:
                data = (
                    Delivery.objects.values("batsman")
                    .filter(
                        batting_team="Royal_Challengers_Bangalore",
                        batsman__in=players
                    )
                    .annotate(total_runs=Sum("total_runs"))
                    .filter(total_runs__gte=int(start[0]),
                            total_runs__lte=int(end[0]))
                    .order_by("total_runs")
                )
            else:
                data = (
                    Delivery.objects.values("batsman")
                    .filter(batting_team="Royal_Challengers_Bangalore")
                    .annotate(total_runs=Sum("total_runs"))
                    .filter(total_runs__gte=int(start[0]),
                            total_runs__lte=int(end[0]))
                    .order_by("total_runs")
                )
            sol_dict = {}
            for row in data:
                sol_dict[row["batsman"]] = row["total_runs"]
            return JsonResponse({"data": json.dumps(sol_dict)})

    except Exception as e:
        logger.error(e)


def umpire_nationality(request):
    """renders html page for umpires vs nationality"""
    try:
        return render(request, "ipl_solution/sol3.html")
    except Exception as e:
        logger.error(e)


def umpire_data(request):
    """returns json data for umpires vs nationality"""
    try:
        data = (
            Umpire.objects.values("nationality")
            .annotate(total_umpires=Count("umpire"))
            .order_by("nationality")
        )
        sol_dict = {}
        nations = []
        number_of_umpires = []
        for row in data:
            nations.append(row["nationality"])
            number_of_umpires.append(row["total_umpires"])
        sol_dict["nations"] = nations
        sol_dict["number_of_umpires"] = number_of_umpires
        return JsonResponse({"data": json.dumps(sol_dict)})

    except Exception as e:
        logger.error(e)


def umpire_nation_graph(request):
    """returns required json data for plot"""
    try:
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
            nations = data["nations"]
            if nations:
                filtered_data = (
                    Umpire.objects.values("nationality")
                    .filter(nationality__in=nations)
                    .annotate(total_umpires=Count("umpire"))
                    .order_by("total_umpires")
                )
            else:
                filtered_data = (
                    Umpire.objects.values("nationality")
                    .exclude(nationality="India")
                    .annotate(total_umpires=Count("umpire"))
                    .order_by("total_umpires")
                )

            sol_dict = {}
            for row in filtered_data:
                sol_dict[row["nationality"]] = row["total_umpires"]
            return JsonResponse({"data": json.dumps(sol_dict)})

    except Exception as e:
        logger.error(e)


def matches_teams_season(request):
    """renders html page for number of matches by teams by season"""
    try:
        return render(request, "ipl_solution/sol4.html")
    except Exception as e:
        logger.error(e)


def match_team_season_data(request):
    """returns json data for number of matches by teams by season"""
    try:
        data = (
            Match.objects.values("team1", "season")
            .annotate(total_matches=Count("team1"))
            .order_by("season")
        )
        sol_dict = {}
        for row in data:
            if row["season"] in sol_dict:
                sol_dict[row["season"]][row["team1"]] = row["total_matches"]
            else:
                sol_dict[row["season"]] = {}
                sol_dict[row["season"]][row["team1"]] = row["total_matches"]
        return JsonResponse({"data": json.dumps(sol_dict)})

    except Exception as e:
        logger.error(e)


def match_team_season_graph(request):
    """returns json data required for the plot"""
    try:
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
            seasons = data["seasons"]
            teams = data["teams"]
            if seasons and teams:
                filtered_data = (
                    Match.objects.values("team1", "season")
                    .filter(season__in=seasons, team1__in=teams)
                    .annotate(total_matches=Count("team1"))
                    .order_by("season")
                )
            elif seasons or teams:
                if seasons:
                    filtered_data = (
                        Match.objects.values("team1", "season")
                        .filter(season__in=seasons)
                        .annotate(total_matches=Count("team1"))
                        .order_by("season")
                    )
                if teams:
                    filtered_data = (
                        Match.objects.values("team1", "season")
                        .filter(team1__in=teams)
                        .annotate(total_matches=Count("team1"))
                        .order_by("season")
                    )
            else:
                filtered_data = (
                    Match.objects.values("team1", "season")
                    .annotate(total_matches=Count("team1"))
                    .order_by("season")
                )
            sol_dict = {}
            for row in filtered_data:
                if row["season"] in sol_dict:
                    sol_dict[row["season"]][row["team1"]] = \
                        row["total_matches"]
                else:
                    sol_dict[row["season"]] = {}
                    sol_dict[row["season"]][row["team1"]] =\
                        row["total_matches"]
            return JsonResponse({"data": json.dumps(sol_dict)})

    except Exception as e:
        logger.error(e)
