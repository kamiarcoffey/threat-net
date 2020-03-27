from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from app.models.DocumentDB import *

from werkzeug.datastructures import ImmutableMultiDict

bp = Blueprint('graph', __name__, url_prefix='/graph')



@bp.route('/', methods=['GET', 'POST'])
def displayGraph():
    return render_template('graph.html')



