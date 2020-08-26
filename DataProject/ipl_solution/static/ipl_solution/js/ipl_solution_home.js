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
  console.log(teams);
  console.log(start);
  console.log(end);
  let csrftoken = getCookie("csrftoken");
  fetch("http://127.0.0.1:8000/ipl/show-data/", {
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
      console.log(obj);
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
  console.log("endddddddddddd");
}
