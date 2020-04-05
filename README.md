
# Threat Net

Threat Net is a graphing utility used to display connections between Indicators of Compromise (IoC), built for Webroot as a senior capstone project in Fall 2019 to Spring 2020.

## Installation Instructions

### Running on Mac/Unix
#### Starting the Backend
```bash
cd threat-net
```
If this is the first time you are running:
```bash
python3 -m venv env
pip install -r requirements.txt
```
Otherwise activate the environment via:
```bash
source env/bin/activate
```
For dev use:
```bash
export FLASK_ENV=development
```
You may also need to set the app launch file:
```bash
export FLASK_APP=run.py
```
To run the backend:
```bash
flask run
```

#### Starting the Frontend
You need to install all required npm packages:
```bash
cd threat-net/app/static
npm install
```
To use Webpack's automatic js reloading with Babel:
```bash
cd threat-net/app/static
webpack --watch
```
### Running on Windows (Outdated)
```bash
cd threat-net
```
If you have not set up a virtual environment, you may need to do:
```bash
python3 -m venv env
```
Otherwise actiate the env via:
```bash
env\Scripts\activate.bat
```
If this is the first time you are running:
```bash
$ pip install -r requirements.txt
```
For dev use:
```bash
set FLASK_ENV=development
```
You may also need to set the app launch file:
```bash
set FLASK_APP=run.py
```
To run the backend:
```
flask run
```
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