from flask import (
    Blueprint, flash, g, redirect, request, session, url_for
)

# from app.modules.cache import cache

from app.models.DocumentDB import *
from app.modules.cache.cache import Cache

from werkzeug.datastructures import ImmutableMultiDict

# create variables for collections in db
ioc_db = webroot_db.ioc_db
filesystem_collection = ioc_db.filesystem_collection
registry_collection = ioc_db.registery_collection



bp = Blueprint('IOC', __name__, url_prefix='/API/IOC')

webroot_db_cache = Cache()


@bp.route('/queryDetails/<ioc_type>/<sha>', methods=['GET'])
def queryArtifacts(ioc_type, sha):
  cache_key = 'queryArtifacts' + ioc_type + sha
  cache_val = webroot_db_cache.checkCache(cache_key)
  if(cache_val[0]):
    print("queryArtifacts Cache hit")
    return cache_val[1]
  else:
    print("queryArtifacts Cache miss")
    if ioc_type == "fs":
      try:
        doc = filesystem_collection.find_one({"sha256" : sha})
      except:
        print("NO DB CONNECTED. Query failed.")
        return {'Message': "Could not query IoCs, no DB connected."}
    elif ioc_type == "reg":
      try:
        doc = registry_collection.find_one({"sha256" : sha})
      except:
        print("NO DB CONNECTED. Query failed.")
        return {'Message': "Could not query IoCs, no DB connected."}
    else:
      print("INVALID IOC TYPE PASSED TO graph/queryArtifacts.")
      return {'Message': "Could not query IoCs, invalid IoC type."}

    if doc is not None:
      print(json.dumps(doc))
      # add value to cache 
      webroot_db_cache.addToCache(cache_key,json.dumps(doc))

      return json.dumps(doc)
    else:
      print("NO Artifact WITH SHA {} FOUND.".format(sha))
      return {'Message': "No artifact with SHA {} found.".format(sha)}


# given a key of given key_type, and a sha256, find all keys connected to the given node through this key
@bp.route('/ExpandNodeByKey', methods=['GET'])
def ExpandNodeByKey():
      results = "Error Querying Database"
      sha256 = request.args.get("sha256")
      key_type = request.args.get("key_type")
      key_value = request.args.get("key_value")
      collection = request.args.get("collection")

      key_value_list = json.loads(key_value)


      if collection == "reg":
        db_collection = registry_collection
      elif collection == "fs":
        db_collection = filesystem_collection
      #add more statements here for additional collections
      else:
        print("Error: not a valid collection")
        return ""

      cache_key = 'ExpandNodeByKey' + key_type + key_value + sha256 + collection
      cache_val = webroot_db_cache.checkCache(cache_key)
      if(cache_val[0]):
        print("Expand Node By Key Cache hit")
        return cache_val[1]

      print('Expand Node By Key Cache Miss')
      if not isinstance(key_value_list, list): #if key_value is singular
        try:
          results = list(db_collection.find({"sha256" : {"$ne" : sha256}, key_type : key_value}))
          for val in results:
            val["shared_key"] = key_type
            val["shared_value"] = key_value_list
          results = json.dumps(results)
          webroot_db_cache.addToCache(cache_key, results)
          return results
        except:
          print("Error Querying Database to expand node by key")
      else: #key_value has 2+ values, must check all
        results = []
        sha_list = [sha256]
        for val in key_value_list:
          try:
            ret = list(db_collection.find({"sha256" : {"$nin" : sha_list}, key_type : {"$in": [val]}}))
            if(len(ret) > 0):
              print("Match found! {}:{}".format(key_type, val))
              for match in ret:
                match["shared_key"] = key_type
                match["shared_value"] = val
              #if sha not already encountered, add it to the list so it will be filtered out next query
              sha_list.extend([match['sha256'] for match in ret if match['sha256'] not in sha_list]) 
            results.extend(ret)
          except:
            print("Error Querying Database to expand node by key")
        
        # add value to cache 
        results = json.dumps(results)
        webroot_db_cache.addToCache(cache_key,results)
        return results