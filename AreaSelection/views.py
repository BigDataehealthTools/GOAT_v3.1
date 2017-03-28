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

    data = [
        #"rs33333",
        {"rsid": "rs2558128", "position": "123123123", "chromosome": "4"},
        {"rsid": "rs2319227", "position": "234234234", "chromosome": "4"},
        {"rsid": "rs1177257", "position": "234234234", "chromosome": "4"},
        {"rsid": "rs12403445", "position": "234234234", "chromosome": "4"},
        {"rsid": "rs12403445", "position": "234234234", "chromosome": "4"},
        {"rsid": "rs7539261", "position": "234234234", "chromosome": "4"},
        {"rsid": "rs2718295", "position": "234234234", "chromosome": "4"},
        {"rsid": "rs6489602", "position": "234234234", "chromosome": "4"},
        {"rsid": "rs2319227", "position": "234234234", "chromosome": "4"},
        {"rsid": "rs1402337", "position": "234234234", "chromosome": "4"}
    ]

    return genomeViewer(data)

def genomeViewer(data):
    print data

    rsidArray = [o['rsid'] for o in data]

    chrBoundaries = getChromosomeBoundaries()
    validRsids = fetchValidRsids(rsidArray)

    response = json.dumps({
            'data' : {
                'jsonChrBoundaries' : chrBoundaries,
                'jsonValidRsids' : validRsids
            }
        },
        sort_keys=True,
        indent=4,
        separators=(',', ': ')
    )

    return HttpResponse(response)

def getChromosomeBoundaries():
    #We query the database for min and max positions for each chromosome
    sqlQuery = "SELECT chromosome, MIN(position) as min, MAX(position) as max FROM marqueurs GROUP BY chromosome;"
    chrBoundaries = connect.fetchData(sqlQuery)
    return buildJsonData(chrBoundaries)

def fetchValidRsids(rsids):
    #print "rsids"
    #print rsids
    #print ','.join(map(str, rsids))
    #We query all rows where we have a data match
    sqlQuery = 'SELECT * FROM marqueurs WHERE nom in ("' + '","'.join(map(str, rsids)) + '");'
    validRsids = connect.fetchData(sqlQuery)

    #validRsids = []

    #for rsid in rsids:
    #    sqlQuery = 'SELECT * FROM marqueurs WHERE nom="' + rsid + '";'
    #    match = connect.fetchData(sqlQuery)
    #    print match
    #    j = buildJsonData(match)
    #    print j

    #    o = json.loads(j)
    #    print o

    #    validRsids.append(o)

    return buildJsonData(validRsids)

def buildJsonData(data):
    jsonData = data.to_json(orient='records')#json table
    return jsonData

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
        print row
        print row[request.POST['rsid_header']]

        output.append({
            'rsid': row[request.POST['rsid_header']],
            'position': row[request.POST['position_header']],
            'chromosome': row[request.POST['chromosome_header']]
        })

    return genomeViewer(output)
