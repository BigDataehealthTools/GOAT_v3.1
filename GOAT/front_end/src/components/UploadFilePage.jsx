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
var React = require('react');
var Reflux = require('reflux');
var Dropzone = require('react-dropzone');

//Sub Components
var FormPanel = require('./Panels/FormPanel.jsx');
var PhenotypesTable = require('./Tables/PhenotypesTable.jsx');

//Component
var UploadFilePage = React.createClass({
  onDrop: function (acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
  },

  render : function(){
    return (
      <div>
        <h1>Upload file</h1>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    );
  }
});

module.exports = UploadFilePage;
