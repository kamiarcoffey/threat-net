import os

from flask import Flask, g
import requests

import json

from app.routes import home
from app.routes import graph

class Config(object):
    JOBS = []
    SECRET_KEY = 'dev'
    TESTING = True

app = Flask(__name__)
app.config.from_object(Config())
app.secret_key = 'dev'


app.register_blueprint(home.bp)
app.register_blueprint(graph.bp)

from app.models.DocumentDB import *


@app.before_request
def before_request():
    # configure db with g
    pass


@app.context_processor
def provide_constants():
    return {"athor": {"Kamiar Coffey"}}
