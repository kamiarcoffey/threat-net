from flask import (
    Blueprint, flash, g, redirect, request, session, url_for
)

# from app.modules.cache import cache

from app.models.DocumentDB import *

# from werkzeug.datastructures import ImmutableMultiDict

bp = Blueprint('IOC', __name__, url_prefix='/API/IOC')

@bp.route('/QueryModuleDetails', methods=['GET'])
def QueryModuleDetails(SHA):
	return 'not implemented'

@bp.route('/QueryIOC', methods=['GET'])
def QueryIOC(SHA, IOC_Types):
	return 'not implemented'

@bp.route('/QueryArtifacts', methods=['GET'])
def QueryArtifacts(SHA):
	return 'not implemented'

@bp.route('/test', methods=['GET'])
def test() :
	#all of this is for hard coded data, this will all be replaced with a query to the database
	return 'hello there'#jsonify(retval)