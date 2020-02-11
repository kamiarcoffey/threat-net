from os.path import abspath, dirname, join, environ
from os import environ
import redis #not in use


_cwd = dirname(abspath(__file__))

SECRET_KEY = 'kamiarcoffey'
# SQLALCHEMY_DATABASE_URI = 'sqlite:///' + join(_cwd, '---.db')
# SQLALCHEMY_ECHO = True
