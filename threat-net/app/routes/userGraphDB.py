from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, render_template
)

from app.models.DocumentDB import *

from werkzeug.datastructures import ImmutableMultiDict

def createUniqueID(graphName, username):
	return checkUsedID(username + graphName)


#Checks if the id is already used. This is an early version and probably should be changed later
def checkUsedID(id) : 
	if(id in hard_coded_data.keys()):
		return checkUsedID(id+'_')
	return id

# this is a data format for the user graphs, based on the current API. if we want to change this format,
# we will likely have to change the interface for the API a bit. This assumes unique usernames for all users,
# and just creates graphids based on the username and graph name
hard_coded_data = {
'AlexThreats':{'user':'Alex',
	 'graphName':'Threats',
	 'jsonData':{}},
'KamiarIOCs':{'user':'Kamiar',
	 'graphName':'IOCs',
	 'jsonData':{}},
'Briangraph2':{'user':'Brian',
	 'graphName':'graph2',
	 'jsonData':{}}}



bp = Blueprint('userGraph', __name__, url_prefix='/API/userGraph')

@bp.route('/ShowSavedGraphs', methods=['GET'])
def ShowSavedGraphs() :
	#all of this is for hard coded data, this will all be replaced with a query to the database
	retval = {}
	for x in hard_coded_data.keys():
		retval.update({x : {}})
		retval[x].update({'user' : hard_coded_data[x]['user']})
		retval[x].update({'graphName' : hard_coded_data[x]['graphName']})
	return jsonify(retval)

@bp.route('/SaveGraph', methods=['POST'])
def SaveGraph(graphID,jsonObject):
	hard_coded_data[graphID]['jsonData'] = jsonObject

@bp.route('/SaveNewGraph', methods=['POST'])
def SaveNewGraph(graphname,username,jsonObject):
	graphID = createUniqueID(graphName,username)
	hard_coded_data[graphID] = {}
	hard_coded_data[graphID].update({'user' : username})
	hard_coded_data[graphID].update({'graphName' : graphName})
	hard_coded_data[graphID].update({'jsonData' : jsonObject})

@bp.route('/LoadGraph', methods=['GET'])
def LoadGraph(graphID):
	return  jsonify(hard_coded_data[graphID])