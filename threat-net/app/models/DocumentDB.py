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


from werkzeug.datastructures import ImmutableMultiDict

# database config goes here
