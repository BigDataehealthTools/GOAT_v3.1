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

      var jsonChrBoundaries = JSON.parse(this.props.data.jsonChrBoundaries);
      var jsonValidRsids = JSON.parse(this.props.data.jsonValidRsids);

      var dataProvider = [];

      for (var i=0; i<jsonChrBoundaries.length; i++) {
        dataProvider.push({
          "chromosome": jsonChrBoundaries[i].chromosome,
          "min": jsonChrBoundaries[i].min,
          "max": jsonChrBoundaries[i].max,
          "phenotype": i
        });
      }

      var graphs = [{
        "colorField": "color",
        "fillAlphas": 0.8,
        "lineColor": "#00bfff",
        "openField": "min",
        "type": "column",
        "valueField": "max"
      }];

      for (var i=0; i<jsonValidRsids.length; i++) {
        dataProvider[jsonValidRsids[i].chromosome][jsonValidRsids[i].nom] = jsonValidRsids[i].position;

        graphs.push({
            "title": jsonValidRsids[i].nom,
            "bullet": "square",
            "bulletColor": "#ff1144",
            "bulletSize": "15",
            "valueField": jsonValidRsids[i].nom,
            "balloonText":
              "nom : " + jsonValidRsids[i].nom + "\n" +
              "chromosome : " + jsonValidRsids[i].chromosome + "\n" +
              "position : " + jsonValidRsids[i].position + "\n" +
              "gene_before : " + jsonValidRsids[i].gene_before + "\n" +
              "gene_after : " + jsonValidRsids[i].gene_after + "\n" +
              "idgenes : " + jsonValidRsids[i].idgenes + "\n" +
              "idmarqueurs : " + jsonValidRsids[i].idmarqueurs,
            "phenotype" : i,
            "mutation" : i+1

        });
      }

      function handleLegendClick( graph ) {
        var chart = graph.chart;

        for( var i = 0; i < chart.graphs.length; i++ ) {
          if ( graph.id == chart.graphs[i].id )
            if (chart.graphs[i].hidden) {
              chart.showGraph(chart.graphs[i]);
            } else {
              chart.hideGraph(chart.graphs[i]);
            }
        }

        // return false so that default action is canceled
        return false;
      }


      return React.createElement(AmCharts.React, {
          "libs": { "path": "node_modules/amcharts3-export/libs/" },
          "type": "serial",
          "theme": "light",
          "thousandsSeparator": " ",
          "sequencedAnimation": false,
          "startDuration": 1,

          "legend": {
            "position": "right",
            "horizontalGap": 10,
            "useGraphSettings": true,
            "markerSize": 10,
            "valueText": "[[value]]",
            "clickMarker": handleLegendClick,
            "clickLabel": handleLegendClick
          },

          "dataProvider": dataProvider,

          "valueAxes": [ {
            "axisAlpha": 0,
            "gridAlpha": 0.1,
            "position": "left"
          } ],

          "graphs": graphs,
          "columnWidth": 0.4,
          "categoryField": "chromosome",
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

module.exports = AreaselectionPage;
