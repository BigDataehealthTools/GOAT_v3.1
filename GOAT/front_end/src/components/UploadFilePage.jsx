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
var AreaSelectionActions = require('../reflux/AreaSelectionActions.jsx');

//Component
var UploadFilePage = React.createClass({
    getInitialState:function() {
        return {
            rsid_header: 'rsid',
            chromosome_header: 'chr',
            position_header: 'position'
        };
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({
            rsid_header: nextProps.rsid,
            chromosome_header: nextProps.chr,
            position_header: nextProps.pos
        });
    },

    OnSelectRsidChange:function(e) {
        this.setState({ rsid_header:e.target.value });
    },

    OnSelectChromosomeChange:function(e) {
        this.setState({ chromosome_header:e.target.value });
    },

    OnSelectPositionChange:function(e) {
        this.setState({ position_header:e.target.value });
    },

    onDrop: function (files) {
      this.setState({ file : files[0]});
    },

    onOpenClick: function () {
      this.refs.dropzone.open();
    },

    onSubmit : function(e) {
        e.preventDefault();
        AreaSelectionActions.extractHeader(this.state.file);
    },

    OnHandleFile : function(e) {
        e.preventDefault();

        AreaSelectionActions.handleFile(
            this.state.file,
            this.state.rsid_header,
            this.state.chromosome_header,
            this.state.position_header
        );
    },

    render : function() {
        return (
          <div>
            <h1>Upload file</h1>
            <Dropzone ref="dropzone" onDrop={this.onDrop} >
                <div>Drag and drop to upload a file.</div>
            </Dropzone>

            <div>
                <p>rsId</p>
                <select id="dropdown_rsid" value={this.state.rsid_header} onChange={this.OnSelectRsidChange}>
                    <option value={this.props.rsid}>{this.props.rsid}</option>
                    <option value={this.props.chr}>{this.props.chr}</option>
                    <option value={this.props.pos}>{this.props.pos}</option>
                </select>

                <p>chromosome</p>
                <select id="dropdown_chromosome" value={this.state.chromosome_header} onChange={this.OnSelectChromosomeChange}>
                    <option value={this.props.rsid}>{this.props.rsid}</option>
                    <option value={this.props.chr}>{this.props.chr}</option>
                    <option value={this.props.pos}>{this.props.pos}</option>
                </select>

                <p>position</p>
                <select id="dropdown_position" value={this.state.position_header} onChange={this.OnSelectPositionChange}>
                    <option value={this.props.rsid}>{this.props.rsid}</option>
                    <option value={this.props.chr}>{this.props.chr}</option>
                    <option value={this.props.pos}>{this.props.pos}</option>
                </select>
            </div>

            <button type="button" onClick={this.onOpenClick}>
                Upload
            </button>

            <button onClick={this.onSubmit} type="submit" id="submitAS">Submit</button>

            <p>
                <button type="button" onClick={this.OnHandleFile}>
                    Area selection
                </button>
            </p>
          </div>
        );
    }
});

module.exports = UploadFilePage;
