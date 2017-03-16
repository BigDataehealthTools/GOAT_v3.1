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

      return React.createElement(AmCharts.React, {
          "libs": { "path": "node_modules/amcharts3-export/libs/" },
          "type": "serial",
          "theme": "light",
          "dataProvider": [ {
            "name": "Income A",
            "open": 0,
            "close": 11.13,
            "color": "#54cb6a",
            "balloonValue": 11.13
          }, {
            "name": "Income B",
            "open": 11.13,
            "close": 15.81,
            "color": "#54cb6a",
            "balloonValue": 4.68
          }, {
            "name": "Total Income",
            "open": 0,
            "close": 15.81,
            "color": "#169b2f",
            "balloonValue": 15.81
          }, {
            "name": "Expenses A",
            "open": 12.92,
            "close": 15.81,
            "color": "#cc4b48",
            "balloonValue": 2.89
          }, {
            "name": "Expenses B",
            "open": 8.64,
            "close": 12.92,
            "color": "#cc4b48",
            "balloonValue": 4.24
          }, {
            "name": "Revenue",
            "open": 0,
            "close": 8.64,
            "color": "#1c8ceb",
            "balloonValue": 11.13
          } ],

          "valueAxes": [ {
            "axisAlpha": 0,
            "gridAlpha": 0.1,
            "position": "left"
          } ],

          "startDuration": 1,
          "graphs": [ {
            "balloonText": "<span style='color:[[color]]'>[[category]]</span><br><b>$[[balloonValue]] Mln</b>",
            "colorField": "color",
            "fillAlphas": 0.8,
            "labelText": "$[[balloonValue]]",
            "lineColor": "#BBBBBB",
            "openField": "open",
            "type": "column",
            "valueField": "close"
          } ],

          "trendLines": [ {
            "dashLength": 3,
            "finalCategory": "Income B",
            "finalValue": 11.13,
            "initialCategory": "Income A",
            "initialValue": 11.13,
            "lineColor": "#888888"
          }, {
            "dashLength": 3,
            "finalCategory": "Expenses A",
            "finalValue": 15.81,
            "initialCategory": "Income B",
            "initialValue": 15.81,
            "lineColor": "#888888"
          }, {
            "dashLength": 3,
            "finalCategory": "Expenses B",
            "finalValue": 12.92,
            "initialCategory": "Expenses A",
            "initialValue": 12.92,
            "lineColor": "#888888"
          }, {
            "dashLength": 3,
            "finalCategory": "Revenue",
            "finalValue": 8.64,
            "initialCategory": "Expenses B",
            "initialValue": 8.64,
            "lineColor": "#888888"
          } ],

          "columnWidth": 0.6,
          "categoryField": "name",
          "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "gridAlpha": 0.1
          },
          "export": {
            "enabled": true
          }
        });
      }
});

module.exports= AreaselectionPage;
