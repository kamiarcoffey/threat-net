from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from app.models.DocumentDB import *
from werkzeug.datastructures import ImmutableMultiDict

import json
import os

__author__ = "Kamiar Coffey"
__version__ = "1.0.1"
__email__ = "kamiar.coffey@colorado.edu"

bp = Blueprint('home', __name__, url_prefix='')

# did = request.args.get('xyz', )

python_data = {'name': 'Kamiar'} # can be anything in python including just straight JSON

@bp.route('/')
@bp.route('/home')
def home():
    return render_template('index.html', jinja_data=python_data)

@bp.route('/hello')
def hello():
    return render_template('hello.html', jinja_data=python_data)

'''Example API Style data passing'''
@bp.route('/demo', methods=['GET', 'POST'])
def dummyAPI():
    return python_data


@bp.route('/dummydata', methods=['GET', 'POST'])
def dummyData():
    return json.dumps(json.load(open('./data/dummy.json')))


@bp.route('/graphdata', methods=['GET', 'POST'])
def graphData():
	# print()
	filesystem_ioc = json.load(open('./data/FileSystem-IOC.json'))
	registry_ioc = json.load(open('./data/Registy-IOC.json'))
	# ['Dockerfile', '.gitignore', '.gcloudignore', 'README.md', 'run.py', 'app.ini', 'requirements.txt']
	return filesystem_ioc, registry_ioc
