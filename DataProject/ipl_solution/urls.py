from django.urls import path
from . import views

app_name = "ipl"

urlpatterns = [
    path("teams-runs/", views.teams_runs, name="teams_runs"),
    path("teams-runs-data/", views.teams_runs_data, name="teams_runs_data"),
    path("teams-runs-graph/", views.teams_runs_graph, name="teams_runs_graph"),
    path("player-runs/", views.player_runs, name="player_runs"),
    path("player-data/", views.player_data, name="player_data"),
    path("player-runs-graph/",
         views.player_runs_graph,
         name="player_runs_graph"),
    path("umpires-nationality/",
         views.umpire_nationality,
         name="umpire_nationality"),
    path("umpire-data/", views.umpire_data, name="umpire_data"),
    path("umpire-nation-graph/",
         views.umpire_nation_graph,
         name="umpire_nation_graph"),
    path(
        "matches-teams-season/",
        views.matches_teams_season,
        name="matches_teams_season"
    ),
    path(
        "match-team-season-data/",
        views.match_team_season_data,
        name="match_team_season_data",
    ),
    path(
        "match-team-season-graph/",
        views.match_team_season_graph,
        name="match_team_season_graph",
    ),
]
