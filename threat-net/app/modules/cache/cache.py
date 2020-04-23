from cachetools import TTLCache

import json
from app.modules.cache.cacheConfig import * 
from threading import Lock



class Cache:

	


	# Initializes TTL cache based on number of items and time to live 
	def __init__(self,numItems=MAX_ITEMS,timeToLive=TIME_TO_LIVE):
		self.cache = TTLCache(numItems,timeToLive)
		self.lock = Lock()

	# returns a pair, (bool success, value)
	# if it was a cache hit, success will be true, otherwise it will be false
	# if cache hit, value will be the value in the cache, otherwise value will be None
	def checkCache(self,key):
		try:
			return (True,self.cache[key])
		except:
			return (False,None)

	# adds the key, value pair to the cache
	def addToCache(self,key, value):
		self.lock.acquire()
		self.cache[key] = value
		self.lock.release()





