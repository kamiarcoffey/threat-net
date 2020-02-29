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




## Example Routing

1. pass a variable through Jinja via render_template
2. call the flask api from a linked js file
3. call the flask function from within html via src="{{ url_for('home.dummyAPI') }}"

Number 3 is my personal choice for this project, and I've embedded it in an iframe to highlight it
