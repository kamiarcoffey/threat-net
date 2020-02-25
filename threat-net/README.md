# Threat Net

# To Run

### use virtual env
### run

$ cd threat-net

If you have not set up a virtual environment, you may need to do:
$ python3 -m venv env

Otherwise actiate the env via:
$ source app/env/bin/activate

If this is the first time you are running:
$ pip install -r requirements.txt

For dev use:
$ export FLASK_ENV=development

You may also need to set the app launch file:
$ export FLASK_APP=app/run.py

$ flask run
