from app.models.DocumentDB import *

import sys

ioc_db = webroot_db.ioc_db
filesystem_collection = ioc_db.filesystem_collection
registery_collection = ioc_db.registery_collection


with open('data/FS.json') as data_file:
	FS_json = json.load(data_file)


with open('data/Reg.json') as data_file:
	Reg_json = json.load(data_file)


if(filesystem_collection.find({}, {"_id":1}).count() == 0):
	# populate filesystem collection
	filesystem_collection.insert(FS_json)
	print("Initialized filesystem_collection", file=sys.stderr)

if(registery_collection.find({}, {"_id":1}).count() == 0):
	# populate registry collection
	registery_collection.insert(Reg_json)
	print("Initialized registery_collection", file=sys.stderr)