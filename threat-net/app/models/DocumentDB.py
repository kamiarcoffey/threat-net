'''
DB Model
'''

__author__ = "Kamiar Coffey"
__version__ = "1.0.1"
__email__ = "kamiar.coffey@colorado.edu"

import datetime
import json
from abc import ABCMeta, abstractmethod
from enum import Enum
from flask import session
from pymongo import MongoClient


from werkzeug.datastructures import ImmutableMultiDict

# database config goes here

# Use graph database config

#for local mongo database
user_graph_db = MongoClient(serverSelectionTimeoutMS = 500) 

#for aws database
# user_graph_db = MongoClient('mongodb://Threatnetmaster:snwpo8-wbdu@docdb-2020-04-07-15-21-17.cluster-cu7lbaapaywf.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false')


webroot_db = user_graph_db
