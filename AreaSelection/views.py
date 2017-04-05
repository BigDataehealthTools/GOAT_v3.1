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


def areaSelection(request, chromosome, position, rsid, userWidth, userHeight):
    print request, chromosome, position, rsid

    data = [
        {"rsid": "rs2558128", "position": "168052827", "chromosome": "4"},
        {"rsid": "rs2319227", "position": "68281255", "chromosome": "4"},
        {"rsid": "rs1177257", "position": "35936786", "chromosome": "14"},
        {"rsid": "rs12403445", "position": "180587560", "chromosome": "1"},
        {"rsid": "rs7539261", "position": "40050503", "chromosome": "1"},
        {"rsid": "rs2718295", "position": "88262924", "chromosome": "7"},
        {"rsid": "rs6489602", "position": "5140968", "chromosome": "12"},
        {"rsid": "rs1402337", "position": "119154183", "chromosome": "12"}
    ]

    return genomeViewer(data)

def genomeViewer(data):

    rsidArray = data#[o['rsid'] for o in data]

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

def fetchValidRsids(rows):
    #This code was used back when we only searched for matching rsids (no position or chromosome).
    #print "rsids"
    #print rsids
    #print ','.join(map(str, rsids))
    #We query all rows where we have a data match
    #sqlQuery = 'SELECT * FROM marqueurs WHERE nom in ("' + '","'.join(map(str, rsids)) + '");'
    #validRsids = connect.fetchData(sqlQuery)

    validRsids = []

    for row in rows:
        sqlQuery = 'SELECT * FROM marqueurs WHERE nom="' + row['rsid'] + '" AND position=' + row['position'] + ' AND chromosome=' + row['chromosome'] + ';'
        match = connect.fetchData(sqlQuery)

        # We do [1:-1] because it extracts the data from stringified-array. The data being a string, it removes the first and last characters : [ and ].
        j = buildJsonData(match)[1:-1]
        # If no result was returned, the data was "[]" which both chars were stripped. So.. empty string.
        if j != "":
            validRsids.append(j)

    return json.dumps(validRsids)

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
    f = request.FILES['file']
    reader = csv.DictReader(f)
    data = json.dumps([ row for row in reader ])
    f.close()

    output = []

    for row in json.loads(data):
        output.append({
            'rsid': row[request.POST['rsid_header']],
            'position': row[request.POST['position_header']],
            'chromosome': row[request.POST['chromosome_header']]
        })

    return genomeViewer(output)
