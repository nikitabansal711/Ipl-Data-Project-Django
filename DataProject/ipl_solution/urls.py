from django.urls import path
from . import views

app_name = "ipl"

urlpatterns = [
    path("teams-runs/", views.teams_runs, name="teams_runs"),
    path("player-runs/", views.player_runs, name="player_runs"),
    path("umpires-nation/", views.umpire_nationality, name="umpire_nationality"),
    path(
        "matches-teams-season/", views.matches_teams_season, name="matches_teams_season"
    ),
    path('show-data/', views.show_data)
]
