from cachetools import TTLCache
import time
import json
import unittest


class Cache:

	# Initializes a cache object based on a config file
	def __init__(self):
		with open('../config.json') as json_data_file:
			data = json.load(json_data_file)
		self.cache = TTLCache(data["cache"]["maxItems"], data["cache"]["timeToLive"])

	# Initializes TTL cache based on number of items and time to live 
	def __init__(self,numItems,timeToLive):
		self.cache = TTLCache(numItems,timeToLive)

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
		self.cache[key] = value




class TestCache(unittest.TestCase):
	def setUp(self):
		pass
	
	def testNotInCache(self):
		cache1 = Cache(3,1)
		self.assertEqual(cache1.checkCache(1),(False,None))

	def testInCache(self):
		cache1 = Cache(3,1)
		cache1.addToCache(1,12)
		self.assertEqual(cache1.checkCache(1),(True, 12))

	def testCacheExpire(self):
		cache1 = Cache(3,1)
		cache1.addToCache(1,12)
		time.sleep(2)
		self.assertEqual(cache1.checkCache(1),(False,None))

	def testCacheFull(self):
		cache1 = Cache(3,1)
		cache1.addToCache(1,12)
		cache1.addToCache(2,13)
		cache1.addToCache(3,13)
		cache1.addToCache(4,13)

		self.assertEqual(cache1.checkCache(1),(False,None))



if __name__ == '__main__':
	unittest.main()




