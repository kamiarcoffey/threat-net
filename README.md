
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

#### Connecting to a Local MongoDB Instance
First, install the appropriate [MongoDB Community Server](https://www.mongodb.com/download-center/community?tck=docs_server). The code block below is copied from their website when I tried to install it, but might've changed since then.
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```
To start the mongo service:
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```
Then, create the directory where the db will be stored:
```bash
sudo mkdir -p /data/db
```
If you want to see the current contents of the graph db:
```bash
mongo
use graph_db
db.graph_collection.find().pretty()
```

### Running on Windows
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
```bash
flask run
```
#### Starting the Frontend
You need to install all required npm packages:
```bash
cd threat-net\app\static
npm install
```
To use Webpack's automatic js reloading with Babel:
```bash
cd threat-net\app\static
webpack --watch
```
#### Connecting to a local MongoDB Instance
First, install the appropriate [MongoDB Community Server](https://www.mongodb.com/download-center/community?tck=docs_server) 
You do not need to install it as a service. 
Create a folder to store the DB data
```bash
cd C:\
md "\data\db"
```
Now run mongodb (change --dbpath if you made a folder in a different location)
```bash
"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"
```
## Example Routing

1. pass a variable through Jinja via render_template
2. call the flask api from a linked js file
3. call the flask function from within html via src="{{ url_for('home.dummyAPI') }}"

Number 3 is my personal choice for this project, and I've embedded it in an iframe to highlight it


## Running on AWS

IMPORTANT: Before attempting to run on AWS, follow the instructions for running locally and ensure it works. This will get all the dependencies needed for the program.

The current configuration is ready to be deployed on AWS elastic beanstalk. Follow these steps to deploy on AWS:
- In `threat-net/Dockerfile`, uncomment the 2 lines under the "# For AWS Docker configuration", and comment out the line under "# For Local Docker Configuration"
- In `app/models/DocumentDB.py`, comment out the graph_db declaration for a local database and uncomment the graph_db declaration for the DocumentDB
 - If this is a new deployment with a new Documentdb, change the graph_db declaration to be for the desired database.
	- The argument needed for the MongoClient constructor can be found by going to your DocumentDB cluster page, under "Connectivity and security", under "Connect to this cluster with an application".

- Create a new Elastic Beanstalk application
- Create a new Environment:
	- Select "Preconfigured Platform" and the "Preconfigured - Docker" Python option
	- Select "Upload your code" under the "Application Code" Section
	- Run "zip -r threat-net.zip threat-net" in the directory of this README to create a zip file of the code, then upload threat-net.zip under the "Upload Your Code" Section
	- Select "Create the Environment" and wait for the application to start up
