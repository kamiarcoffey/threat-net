from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from app.models.DocumentDB import *

from werkzeug.datastructures import ImmutableMultiDict


__author__ = "Kamiar Coffey"
__version__ = "1.0.1"
__email__ = "kamiar.coffey@colorado.edu"

bp = Blueprint('home', __name__, url_prefix='')

# did = request.args.get('xyz', )


@bp.route('/')
@bp.route('/home')
def home():
    return render_template('index.html')
