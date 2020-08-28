$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
// set hostname and port here
var hostname = "http://127.0.0.1:8000/";
// function to get cookie
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
// helper function to populate dropdown list
function helper_populateDropdown(select, options) {
  for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
}

// function to populate dropdown
function populateDropdown(fieldID) {
  var select = document.getElementById(fieldID);
  fetch(hostname + "ipl/player-data/")
    .then((response) => response.json())
    .then((data) => {
      var options = data["data"];
      helper_populateDropdown(select, options);
    });
}

// function to populate dropdown
function populateDropdown2(fieldID) {
  var select = document.getElementById(fieldID);
  for (var i = 1; i < 5000; i++) {
    var opt = i;
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
}

// function to populate dropdown
function populateDropdown3(fieldID) {
  var select = document.getElementById(fieldID);
  fetch(hostname + "ipl/umpire-data/")
    .then((response) => response.json())
    .then((data) => {
      data = JSON.parse(data["data"]);
      var options = data["nations"];
      helper_populateDropdown(select, options);
    });
}

// function to populate dropdown
function populateDropdown4(fieldID) {
  var select = document.getElementById(fieldID);
  fetch(hostname + "ipl/match-team-season-data/")
    .then((response) => response.json())
    .then((data) => {
      data = JSON.parse(data["data"]);
      var options = Object.keys(data);
      helper_populateDropdown(select, options);
    });
}

// function to populate dropdown
function populateDropdown5(fieldID) {
  var select = document.getElementById(fieldID);
  fetch(hostname + "ipl/teams-runs-data/")
    .then((response) => response.json())
    .then((data) => {
      var options = data["data"];
      helper_populateDropdown(select, options);
    });
}

// function to get multiple selected values
function getMultipleSelected(fieldID) {
  var elements = document.getElementById(fieldID).childNodes;
  var selectedKeyValue = {};
  var arrayOfSelecedIDs = [];
  for (i = 0; i < elements.length; i++) {
    if (elements[i].selected) {
      selectedKeyValue[elements[i].value] = elements[i].textContent;
      arrayOfSelecedIDs.push(elements[i].value);
    }
  }
  return arrayOfSelecedIDs;
}

// function to plot the bar graph
function plotBarGraph(body, url, title_text, x_text, y_text, tootltip_text) {
  let csrftoken = getCookie("csrftoken");
  fetch(url, {
    method: "POST",
    body: body,
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data = data["data"];
      let obj;
      obj = JSON.parse(data);
      Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: title_text,
        },
        xAxis: {
          type: "category",
          title: {
            text: x_text,
          },
          labels: {
            rotation: -90,
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif",
            },
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: y_text,
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: tootltip_text + ": <b>{point.y:.1f}</b>",
        },
        series: [
          {
            data: Object.entries(obj),
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: "#FFFFFF",
              align: "right",
              format: "{point.y:.1f}",
              y: 10,
              style: {
                fontSize: "13px",
                fontFamily: "Verdana, sans-serif",
              },
            },
          },
        ],
      });
    });
}
// function to plot graph teams vs runs
function plotGraphs1(fieldID1, fieldID2, fieldID3) {
  teams = getMultipleSelected(fieldID1);
  start = getMultipleSelected(fieldID2);
  end = getMultipleSelected(fieldID3);
  var url = hostname + "ipl/teams-runs-graph/";
  var body = JSON.stringify({
    teams: teams,
    start: start,
    end: end,
  });
  plotBarGraph(body, url, "Teams vs total runs", "Teams", "Runs", "Total runs");
}

// function to plot graph players vs runs
function plotGraphs2(fieldID1, fieldID2, fieldID3) {
  players = getMultipleSelected(fieldID1);
  start = getMultipleSelected(fieldID2);
  end = getMultipleSelected(fieldID3);
  var url = hostname + "ipl/player-runs-graph/";
  var body = JSON.stringify({
    players: players,
    start: start,
    end: end,
  });
  plotBarGraph(body, url, "Players vs runs", "Players", "Runs", "Total runs");
}

// function to plot graph umpires vs nationality
function plotGraphs3(fieldID1) {
  nations = getMultipleSelected(fieldID1);
  var url = hostname + "ipl/umpire-nation-graph/";
  var body = JSON.stringify({
    nations: nations,
  });
  plotBarGraph(
    body,
    url,
    "Number of umpires vs nationality",
    "Nations",
    "NUmber of umpires",
    "Number of umpires"
  );
}

// function to plot graph number of matches by teams by season
function plotGraphs4(fieldID1, fieldID2) {
  seasons = getMultipleSelected(fieldID1);
  teams = getMultipleSelected(fieldID2);
  let csrftoken = getCookie("csrftoken");
  fetch(hostname + "ipl/match-team-season-graph/", {
    method: "POST",
    body: JSON.stringify({
      seasons: seasons,
      teams: teams,
    }),
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data = data["data"];
      let obj = JSON.parse(data);
      let seasons = [];
      let season_values = [];
      seasons = Object.keys(obj);
      season_values = Object.values(obj);
      let data_list = [];
      let data_dict = {};
      let teams_set = new Set();
      for (obj of season_values) {
        for (key of Object.keys(obj)) teams_set.add(key);
      }
      teams_list = Array.from(teams_set);
      for (var team of teams_list) {
        for (obj of season_values) {
          let temp = Object.keys(obj);
          if (temp.includes(team) == true) {
            if (team in data_dict) {
              data_dict[team].push(obj[team]);
            } else {
              data_dict[team] = [];
              data_dict[team].push(obj[team]);
            }
          } else {
            if (team in data_dict) {
              data_dict[team].push(0);
            } else {
              data_dict[team] = [];
              data_dict[team].push(0);
            }
          }
        }
      }
      let teams = Object.keys(data_dict);
      let num_matches = Object.values(data_dict);
      let solution_list = [];
      for (var i = 0; i < teams.length; i++) {
        let sol_dict = {};
        sol_dict["name"] = teams[i];
        sol_dict["data"] = num_matches[i];
        solution_list.push(sol_dict);
      }
      Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "Number of matches played by teams by season",
        },
        xAxis: {
          categories: seasons,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Number of matches",
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: "bold",
              color:
                // theme
                (Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "gray",
            },
          },
        },
        legend: {
          align: "right",
          x: -30,
          verticalAlign: "top",
          y: 25,
          floating: true,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "white",
          borderColor: "#CCC",
          borderWidth: 1,
          shadow: false,
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>",
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: solution_list,
      });
    });
}
