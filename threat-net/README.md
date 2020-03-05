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


## Running on AWS
The current configuration is ready to be deployed on AWS elastic beanstalk. Follow these steps to deploy on AWS:
- In threat-net/Dockerfile, uncomment the 2 lines under the "# For AWS Docker configuration", and comment out the line under "# For Local Docker Configuration"
- Create a new Elastic Beanstalk application
- Create a new Environment:
	- Select "Preconfigured Platform" and the "Preconfigured - Docker" Python option
	- Select "Upload your code" under the "Application Code" Section
	- Run "zip threat-net.zip *" in the directory of this README to create a zip file of the code, then upload threat-net.zip under the "Upload Your Code" Section
	- Select "Create the Environment" and wait for the application to start up
