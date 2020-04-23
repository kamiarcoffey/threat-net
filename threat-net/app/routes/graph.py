from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from app.models.DocumentDB import *


from werkzeug.datastructures import ImmutableMultiDict

import json
from pymongo import MongoClient

#TODO: add logic for when the DBs are on AWS instead of local, configure MongoClient appropriately
#see https://docs.aws.amazon.com/documentdb/latest/developerguide/connect_programmatically.html

# gets the database config from app.models.DocumentDB
client = user_graph_db

graph_db = client.graph_db #creates db if it doesn't exist already
graph_collection = graph_db.graph_collection #creates collection if it doesn't exist already

ioc_db = client.ioc_db
reg_collection = ioc_db.registery_collection
fs_collection = ioc_db.filesystem_collection

bp = Blueprint('graph', __name__, url_prefix='/graph')

@bp.route('/', methods=['GET', 'POST'])
def displayGraph():
    return render_template('graph.html')


@bp.route('/saveGraph', methods=['POST'])
def saveGraph():
  # Auto generate next id
  id = 0
  try:
    graph_list = graph_collection.find({}, {"_id": 1, "name": 1})
  except:
    print("NO DB CONNECTED. Save failed.")
    return {'Message' : "Could not save graph, no DB connected."}
  graph_dict = {}
  for graph in graph_list:
    graph_dict[graph["_id"]] = graph["name"]
  for i in graph_dict.keys():
    if graph_dict[i] == request.args.get("name"):
      id = i
  if id == 0:
    if graph_dict:
      id = max(graph_dict.keys()) + 1
  
  name = request.args.get("name")
  json_string_data = request.form.to_dict()["json_data"]

  #list of dictionaries, each dict represents a cytoscape element (node or edge)
  json_dict_data = json.loads(json_string_data) 
  
  #associate name and id before saving to DB
  graph_document = {"_id": id, "name" : name, "graph_data" : json_dict_data}

  #inserts if there is no graph with the id (i.e. the graph is new)
  try:
    graph_collection.replace_one({"_id" : id} , graph_document, upsert = True) 
  except:
    print("NO DB CONNECTED. Save failed.")
    return {'Message' : "Could not save graph, no DB connected."}

  return {'Message' : 'Sucessfully saved graph with name "{}" and ID {}'.format(name, id), 'id': id}


@bp.route('/graphList', methods=['GET'])
def getGraphList():
  try:
    graph_list = graph_collection.find({}, {"_id": 1, "name": 1}) #only return name and id
  except:
    print("NO DB CONNECTED. Could not get graph list.")
    return "ERROR: No DB connected"

  graph_dict = {}
  for graph in graph_list:
    graph_dict[graph["_id"]] = graph["name"]
  
  return json.dumps(graph_dict)


@bp.route('/loadGraph', methods=['GET'])
def loadGraph():
  dummy_data = '''[
      { data: { id: 'ioc1', label: 'IOC 1' }, position: { x: 150, y: 400 } },
      { data: { id: 'ioc2', label: 'IOC 2' }, position: { x: 250, y: 50  } },
      { data: { id: 'ioc3', label: 'IOC 3' }, position: { x: 250, y: 200 } },
      { data: { id: 'ioc4', label: 'IOC 4' }, position: { x: 350, y: 200 } },
      { data: { id: 'ioc5', label: 'IOC 5' }, position: { x: 150, y: 300 } },
      { data: { id: 'ioc6', label: 'IOC 6' }, position: { x: 250, y: 300 } },
      { data: { id: 'ioc7', label: 'IOC 7' }, position: { x: 350, y: 400 } },
      {
        data: { source: 'ioc1', target: 'ioc2', label: '1 -> 2' }
      },
      {
        data: { source: 'ioc1', target: 'ioc3', label: '1 -> 3' }
      },
      {
        data: { source: 'ioc1', target: 'ioc4', label: '1 -> 4' }
      },
      {
        data: { source: 'ioc1', target: 'ioc5', label: '1 -> 5' }
      },
      {
        data: { source: 'ioc1', target: 'ioc6', label: '1 -> 6' }
      },
      {
        data: { source: 'ioc1', target: 'ioc7', label: '1 -> 7' }
      },
      {
        data: { source: 'ioc2', target: 'ioc5', label: '2 -> 5' }
      },
      {
        data: { source: 'ioc3', target: 'ioc4', label: '3 -> 4' }
      }
  ]'''

  # if request.args.get("id") == "dummy":
  #   return dummy_data
  
  id = int(request.args.get("id"))

  try:
    graph_document = graph_collection.find_one({"_id" : id})
  except:
    print("NO DB CONNECTED. Returning hardcoded data.")
    return dummy_data

  #print(graph_document)

  if graph_document is not None:
    return json.dumps(graph_document["graph_data"])
  else:
    print("NO GRAPH WITH ID {} FOUND. Returning hardcoded data.".format(id))
    return dummy_data