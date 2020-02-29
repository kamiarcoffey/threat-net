from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from app.models.DocumentDB import *
from werkzeug.datastructures import ImmutableMultiDict

import json


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


'''Example API Style data passing'''
@bp.route('/demo', methods=['GET', 'POST'])
def dummyAPI():
    return python_data
