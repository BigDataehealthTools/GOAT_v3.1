/*Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.*/

// Author of the file : Victor Dupuy
// mail : victor.dupuy@hei.fr

//Dependencies
require("amcharts3-export");
var React = require('react');
var ReactDOM = require('react-dom');
var ASTable = require('./Tables/ASTable.jsx');
var AmCharts = require("amcharts3-react");

//Sub-Components

//Component
var AreaselectionPage = React.createClass({

  render : function() {


    var data = [{
      "index": 0,
      "value": 160000000
    }, {
      "index": 1,
      "value": 250000000
    }, {
      "index": 2,
      "value": 240000000
    }, {
      "index": 3,
      "value": 195000000
    }, {
      "index": 4,
      "value": 190000000,
      "thirdValue": 165000000,
      "fourthValue": 65000000
    }, {
      "index": 5,
      "value": 180000000
    }, {
      "index": 6,
      "value": 170000000
    }, {
      "index": 7,
      "value": 160000000
    }, {
      "index": 8,
      "value": 145000000
    }, {
      "index": 9,
      "value": 140000000
    }, {
      "index": 10,
      "value": 130000000
    }, {
      "index": 11,
      "value": 130000000
    }, {
      "index": 12,
      "value": 130000000
    }, {
      "index": 13,
      "value": 120000000,
      "openValue": 20000000
    }, {
      "index": 14,
      "value": 110000000,
      "openValue": 10000000,
      "secondValue": 47000000
    }, {
      "index": 15,
      "value": 105000000,
      "openValue": 15000000
    }, {
      "index": 16,
      "value": 90000000
    }, {
      "index": 17,
      "value": 80000000
    }, {
      "index": 18,
      "value": 78000000
    }, {
      "index": 19,
      "value": 60000000
    }, {
      "index": 20,
      "value": 65000000
    }, {
      "index": 21,
      "value": 48000000,
      "openValue": 10000000
    }, {
      "index": 22,
      "value": 51000000,
      "openValue": 20000000
    }];



    function onInit (e) {

      var chart = e.chart,
          graphs = chart.graphs,
          createLegend = function (id, property) {

            var element = document.getElementById(id),
                itemElement,
                textElement,
                matchingGraphs = [],
                referenceItems = {},
                legendReference,
                graph,
                value,
                legendText;

            for (var i = 0, iLen = graphs.length; i < iLen; i++) {

              graph = graphs[i];
              value = graph[property];
              legendText = graph[[property, "LegendText"].join("")];

              if (value && legendText) {

                matchingGraphs.push(graph);
                legendReference = [property, value].join("-");

                if (!chart.customLegends[legendReference])
                  chart.customLegends[legendReference] = [];

                // Keep the graph reference per property name
                chart.customLegends[legendReference].push(graph);

                // Don't add to the DOM again if the item is already there
                if (!referenceItems[value]) {

                  // Keep reference that is item is already added
                  referenceItems[value] = true;

                  itemElement = document.createElement("div");
                  textElement = document.createElement("span");

                  textElement.innerText = legendText;

                  itemElement.appendChild(textElement);
                  element.appendChild(itemElement);

                  // Add the propery name to identify this item on click
                  itemElement.legendReference = legendReference;

                  itemElement.addEventListener("click", onLegendClick, false)
                }
              }
            }
          };

      // Leave a reference to the legend items in the chart object
      chart.customLegends = {};

      // Pass the legend's element id and which property to look for and group by
      createLegend("shapeslegend", "bullet");

      // Pass the legend's element id and which property to look for and group by
      createLegend("colorslegend", "lineColor");
    }

    function onLegendClick (e) {
      console.log(e);

      var target = e.currentTarget,
          legendReference = target.legendReference,
          chart = AmCharts.charts[0],
          selectedGraphs = chart.customLegends[legendReference];

      for (var i = 0, iLen = selectedGraphs.length; i < iLen; i++) {

        if (selectedGraphs[i].hidden)
          chart.showGraph(selectedGraphs[i]);
        else
          chart.hideGraph(selectedGraphs[i]);
      }
    }

    var config = {
      "type": "serial",
      "theme": "light",
      "dataProvider": data,
      "valueAxes": [{
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      }],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [{
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "value",
        "openField": "openValue"
      }, {
        "bullet": "square",
        "bulletLegendText": "Square",
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "lineColor": "#FF0000",
        "lineColorLegendText": "Red",
        "valueField": "secondValue"
      }, {
        "bullet": "square",
        "bulletLegendText": "Square",
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "lineColor": "#84B761",
        "lineColorLegendText": "Green",
        "valueField": "thirdValue"
      }, {
        "bullet": "circle",
        "bulletLegendText": "Circle",
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "lineColor": "#84B761",
        "lineColorLegendText": "Green",
        "valueField": "fourthValue"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "index",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20
      },
      "export": {
        "enabled": true
      },
      "listeners": [{
        "event": "init",
        "method": onInit
      }]
    };

    return (
      <div>
        <div className="col-md-10" style={{height:'500px', backgroundColor:"white"}}><AmCharts.React {...config} /></div>
        <div className="col-md-2">
          <strong>Shapes Legend</strong>
          <div id="shapeslegend" className="custom-legend"></div>
          <strong>Colors Legend</strong>
          <div id="colorslegend" className="custom-legend"></div>
        </div>
      </div>
    );
  }
});

module.exports = AreaselectionPage;
