from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from app.models.DocumentDB import *

from werkzeug.datastructures import ImmutableMultiDict

bp = Blueprint('graph', __name__, url_prefix='/graph')

import json

@bp.route('/', methods=['GET', 'POST'])
def displayGraph():
    return render_template('graph.html')


@bp.route('/saveGraph', methods=['POST'])
def saveGraph():
    # Graph data saved as blob sent here
	return {'Message' : 'saving graph :)'}

@bp.route('/graphList', methods=['GET'])
def getGraphList():
    return 'List'

@bp.route('/loadGraph', methods=['GET'])
def loadGraph():
    # Load graph with specified identifier
    return '''[
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