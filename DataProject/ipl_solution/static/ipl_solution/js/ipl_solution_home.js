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

function populateDropdown(fieldID) {
  var select = document.getElementById(fieldID);
  fetch("http://127.0.0.1:8000/ipl/player-data/")
    .then((response) => response.json())
    .then((data) => {
      var options = data["data"];
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    });
}

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

function populateDropdown3(fieldID) {
  var select = document.getElementById(fieldID);
  fetch("http://127.0.0.1:8000/ipl/umpire-data/")
    .then((response) => response.json())
    .then((data) => {
      data = JSON.parse(data["data"]);
      var options = data["nations"];
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    });
}

function populateDropdown4(fieldID) {
  var select = document.getElementById(fieldID);
  fetch("http://127.0.0.1:8000/ipl/match-team-season-data/")
    .then((response) => response.json())
    .then((data) => {
      data = JSON.parse(data["data"]);
      var options = Object.keys(data);
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    });
}

function populateDropdown5(fieldID) {
  var select = document.getElementById(fieldID);
  fetch("http://127.0.0.1:8000/ipl/teams-runs-data/")
    .then((response) => response.json())
    .then((data) => {
      var options = data["data"];
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    });
}

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

function plotGraphs1(fieldID1, fieldID2, fieldID3) {
  teams = getMultipleSelected(fieldID1);
  start = getMultipleSelected(fieldID2);
  end = getMultipleSelected(fieldID3);
  let csrftoken = getCookie("csrftoken");
  fetch("http://127.0.0.1:8000/ipl/teams-runs-graph/", {
    method: "POST",
    body: JSON.stringify({
      teams: teams,
      start: start,
      end: end,
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
      let obj;
      obj = JSON.parse(data);
      Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "Teams vs total runs",
        },
        xAxis: {
          type: "category",
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
            text: "Scores",
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: "Total runs: <b>{point.y:.1f}</b>",
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

function plotGraphs2(fieldID1, fieldID2, fieldID3) {
  players = getMultipleSelected(fieldID1);
  start = getMultipleSelected(fieldID2);
  end = getMultipleSelected(fieldID3);
  let csrftoken = getCookie("csrftoken");
  fetch("http://127.0.0.1:8000/ipl/player-runs-graph/", {
    method: "POST",
    body: JSON.stringify({
      players: players,
      start: start,
      end: end,
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
      let obj;
      obj = JSON.parse(data);
      Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "Teams vs total runs",
        },
        xAxis: {
          type: "category",
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
            text: "Scores",
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: "Total runs: <b>{point.y:.1f}</b>",
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

function plotGraphs3(fieldID1) {
  nations = getMultipleSelected(fieldID1);
  let csrftoken = getCookie("csrftoken");
  fetch("http://127.0.0.1:8000/ipl/umpire-nation-graph/", {
    method: "POST",
    body: JSON.stringify({
      nations: nations,
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
      let obj;
      obj = JSON.parse(data);
      Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "Number of umpires vs nationality",
        },
        xAxis: {
          type: "category",
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
            text: "number of umpires",
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: "Total runs: <b>{point.y:.1f}</b>",
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

function plotGraphs4(fieldID1, fieldID2) {
  seasons = getMultipleSelected(fieldID1);
  teams = getMultipleSelected(fieldID2);
  let csrftoken = getCookie("csrftoken");
  fetch("http://127.0.0.1:8000/ipl/match-team-season-graph/", {
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
