# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

# Authors of this page : Beatriz Kanzki & Victor Dupuy


#!/usr/bin/Python-2.7.11

from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import connection # Used to connect with the database

#--- Bokeh ---#
from bokeh.models import Plot
from bokeh.embed import components
from bokeh.resources import Resources
from bokeh.plotting import figure, output_file, show, ColumnDataSource, gridplot
from bokeh.models import TapTool, HoverTool, BoxSelectTool, BoxZoomTool, CrosshairTool, WheelZoomTool, ResizeTool, ResetTool, PanTool
from bokeh.models.glyphs import Rect
from bokeh.resources import CDN

from bokeh.models.layouts import HBox
import copy


from bokeh.models.widgets.groups import CheckboxGroup
from bokeh.io import output_file, show, hplot

#--- Pandas ---#
import pandas as pandas
import numpy as numpy

#--- Regex ---#
import re as regex

#--- CSV reader ---#
import csv

#--- Tools ---#
from Tools import connect
from Tools import getPhenotypes
from Tools import UserLogs

#--- JSON ---#
import json

# Create your views here.


def areaSelection(request, chromosome, position, phenotype, userWidth, userHeight):
    print request, chromosome, position, phenotype

    chrBoundaries = getChromosomeBoundaries()
    jsonChrBoundaries = buildJsonData(chrBoundaries)

    validRsids = fetchValidRsids([
        "rs33333",
        "rs2558128",
        "rs2319227",
        "rs1177257",
        "rs12403445",#chr 1
        "rs7539261",#chr 1
        "rs2718295",#chr 7
        "rs6489602",#chr 12
        "rs1402337",#chr 12

    ])
    jsonValidRsids = buildJsonData(validRsids)

    print "1"
    graphScript, div = generateGenomeViewer(chrBoundaries, validRsids, int(userWidth), int(userHeight))
    print "2"

    response = json.dumps({
            #'div': str(div),
            #'script': str(graphScript),
            'data' : json.dumps({
                'jsonChrBoundaries' : jsonChrBoundaries,
                'jsonValidRsids' : jsonValidRsids
            })
        },
        sort_keys=True,
        indent=4,
        separators=(',', ': ')
    )

    print "3"

    return HttpResponse(response)

def genomeViewer(data):
    chrBoundaries = getChromosomeBoundaries()
    jsonChrBoundaries = buildJsonData(chrBoundaries)

    validRsids = fetchValidRsids([
        "rs33333",
        "rs2558128",
        "rs2319227",
        "rs1177257",
        "rs12403445",#chr 1
        "rs7539261",#chr 1
        "rs2718295",#chr 7
        "rs6489602",#chr 12
        "rs1402337",#chr 12

    ])
    jsonValidRsids = buildJsonData(validRsids)

    print "1"

    response = json.dumps({
            #'div': str(div),
            #'script': str(graphScript),
            'data' : json.dumps({
                'jsonChrBoundaries' : jsonChrBoundaries,
                'jsonValidRsids' : jsonValidRsids
            })
        },
        sort_keys=True,
        indent=4,
        separators=(',', ': ')
    )

    print "3"

    return HttpResponse(response)

def getChromosomeBoundaries():
    #We query the database for min and max positions for each chromosome
    sqlQuery = "SELECT chromosome, MIN(position) as min, MAX(position) as max FROM marqueurs GROUP BY chromosome;"
    chrBoundaries = connect.fetchData(sqlQuery)
    return chrBoundaries

def fetchValidRsids(rsids):
    print "rsids"
    print rsids
    print ','.join(map(str, rsids))
    #We query all rows where we have a data match
    sqlQuery = 'SELECT * FROM marqueurs WHERE nom in ("' + '","'.join(map(str, rsids)) + '");'
    validRsids = connect.fetchData(sqlQuery)
    return validRsids

def buildJsonData(data):
    jsonData = data.to_json(orient='records')#json table
    return jsonData

def generateGenomeViewer(chrBoundaries, validRsids, userWidth, userHeight):
    print "11"
    source = ColumnDataSource(validRsids)# SOURCE DATA FOR BOKEH PLOT
    print "12"

    TOOLS = [HoverTool(
        names=["rsid"],
        tooltips=[
        ("Rsid", "@nom"),
        ("Chromosome", "@chromosome"),
        ("Position","@position")
        ]
    ), CrosshairTool(), WheelZoomTool(), BoxSelectTool(), BoxZoomTool(), ResizeTool(), ResetTool(), PanTool(), TapTool()]

    print "13"
    stringLegend = "Positions max et min"
    plot = figure(
                webgl=True,
                tools=TOOLS,
                x_axis_label='Chromosome',
                y_axis_label='Position',
                plot_width=userWidth,
                plot_height=userHeight,
                x_range=(-1,23),
                y_range=(0,250000000)
            )

    checkbox_button_group = CheckboxGroup(
        labels=["Option 1", "Option 2", "Option 3"], active=[0, 1])

    print "14"
    # Shows a little square for every matched rsid. A tooltip is available for the square.
    plot.square('chromosome', 'position', name="rsid", color="#000000", source=source, size=18, legend='Matched rsid')
    print "15"


    # Show rectangles representing the chromosomes
    jsonChrBoundaries = buildJsonData(chrBoundaries)
    jsonChrBoundaries = json.loads(jsonChrBoundaries)
    for boundary in jsonChrBoundaries:
        plot.rect(x=boundary['chromosome'],
                  y=((boundary['max']-boundary['min'])/2)+boundary['min'],
                  width=0.2,
                  height=boundary['max']-boundary['min'])

    graph, div = components(plot, CDN)
    print "16"

    return graph, div


def uploadFile(request):
    return HttpResponse()

def extractHeader(request):
    f = request.FILES['file']

    reader = csv.reader(f)

    headers = reader.next()

    response = json.dumps({'headers': headers})

    f.close()

    return HttpResponse(response)

def handleFile(request):
    reader = csv.DictReader(request.FILES['file'])
    data = json.dumps([ row for row in reader ])

    output = []

    for row in json.loads(data):
        output.append({
            'rsid': row[request.POST['rsid_header']],
            'position': row[request.POST['position_header']],
            'chromosome': row[request.POST['chromosome_header']]
        })

    return genomeViewer(output)
