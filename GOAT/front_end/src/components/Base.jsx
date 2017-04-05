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

//This is the base of the application.
//Here you can find the header, the menu, etc...

//Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

    //Snps for Table
    var SnpActions = require('../reflux/SnpActions.jsx');
    var SnpStore = require('../reflux/SnpStore.jsx');

    //Interactive Manhattan
    var ManhattanActions = require('../reflux/ManhattanActions.jsx');
    var ManhattanStore = require('../reflux/ManhattanStore.jsx');

    //Area Selection
    var AreaSelectionActions = require('../reflux/AreaSelectionActions.jsx');
    var AreaSelectionStore = require('../reflux/AreaSelectionStore.jsx');

    //Snps for one gene
    var SnpsForGeneActions = require('../reflux/SnpsForGeneActions.jsx');
    var SnpsForGeneStore = require('../reflux/SnpsForGeneStore.jsx');

//Sub Components
var HomePage = require("./HomePage.jsx");
var TablePage = require("./TablePage.jsx");
var QueryParamsPage = require('./QueryParamsPage.jsx');
var UploadFilePage = require('./UploadFilePage.jsx');
var ManhattanPage = require('./ManhattanPage.jsx');
var AreaSelectionParamsPage = require('./QueryASParamsPage.jsx');
var AreaSelectionPage = require('./AreaSelectionPage.jsx');
var QuerySFGPage = require('./QuerySFGPage.jsx');
var SnpsForGenePage = require('./SnpsForGenePage.jsx');

//Test Page to try new components
var TestPage = require("./TestPage.jsx");

//Component
var Base = React.createClass({
  mixins : [
    Reflux.listenTo(SnpStore, 'onChange'),
    Reflux.listenTo(ManhattanStore, 'onChange'),
    Reflux.listenTo(AreaSelectionStore,'onChange'),
    Reflux.listenTo(SnpsForGeneStore, 'onChange')
  ],
  getInitialState : function(){
    return {
      appState : "Home",
      snps : []
    }
  },
  onChange : function(event, data){
    switch(event){
      case "table":
        this.setState({
          appState : "Table",
          snps : data[0],
          phenotypes : data[1]
        });
        break;
      case "home" :
        this.setState({
          appState : "Home",
          snps : [],
          phenotypes : []
        });
        break;
      case "queryParams" :
        this.setState({
          appState : "QueryParams",
          snps : [],
          phenotypes : data[0],
          message : data[1]
        });
        break;

      case "uploadFile":
          this.setState({
            appState : "UploadFile",
            snps : []
          });
          break;

      case "sendHeaders":
          this.setState({
            appState : "UploadFile",
            snps : [],
            rsid : data[0],
            chr : data[1],
            pos : data[2]
          });
          break;

      case "manhattan" :
        this.setState({
          appState : "Manhattan",
          snps : [],
          function : data[0],
          div : data[1]
        });
        break;
      case "areaSelectionQueryParams":
        console.log("AREA SELECTION");
        this.setState({
          appState : "AreaSelectionForm"
        });
        break;
      case "areaSelection":
        console.log(data);
        this.setState({
          appState : "AreaSelection",
          data : data[0],
          chromosome : data[1].chromosome,
          phenotype : data[1].phenotype,
          rsid : data[1].rsid
        });
        break;
      case "querySFGParams":
        this.setState({
          appState : "QuerySFGParams"
        });
        break;
      case "SnpForGeneData":
        this.setState({
          appState : "SnpForGeneTable",
          snps : data[0],
          phenotypes : data[1],
          gene : data[2]
        });
        break;
      case "test" :
        this.setState({
          appState : "Test",
          snps : []
        });
        break;
      default :
        console.log('');
    }
  },
  handlingState : function(){
    switch(this.state.appState){
      case "Home" :
        return <HomePage/>
        break;
      case "Table" :
        return <TablePage snps={this.state.snps} phenotypes={this.state.phenotypes}/>
        break;
      case "QueryParams":
        return <QueryParamsPage phenotypes={this.state.phenotypes} message={this.state.message}/>
        break;

      case "UploadFile":
        return <UploadFilePage rsid={this.state.rsid} chr={this.state.chr} pos={this.state.pos}/>
      case "Manhattan":
        return <ManhattanPage  function={this.state.function} div={this.state.div}/>
        break;
      case "AreaSelectionForm":
        return <AreaSelectionParamsPage/>
        break;
      case "AreaSelection":
        return <div style={{height:'500px', backgroundColor:"white"}}><AreaSelectionPage data={this.state.data} chromosome={this.state.chromosome} phenotype={this.state.phenotype} rsid={this.state.rsid}/></div>
        break;
      case "QuerySFGParams":
        return <QuerySFGPage/>
      case "SnpForGeneTable":
        return <SnpsForGenePage snps={this.state.snps} phenotypes={this.state.phenotypes} gene={this.state.gene}/>
      case "Test" :
        return <TestPage/>
        break;
      default :
        return <HomePage/>
    }
  },
  render : function(){
    return (
      <div className = "row">
        {this.handlingState()}
      </div>
    );
  }
});

module.exports = Base;
