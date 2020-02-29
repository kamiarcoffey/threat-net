'''
This is the driver file for testing the Flask web app
'''

__author__ = "Kamiar Coffey"
__version__ = "1.0.1"
__email__ = "kamiar.coffey@colorado.edu"

import __init__

def test_index():
    main.app.testing = True
    client = main.app.test_client()

    r = client.get('/')
    assert r.status_code == 200
