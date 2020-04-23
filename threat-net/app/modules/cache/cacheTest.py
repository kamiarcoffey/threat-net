import unittest
import time
from app.modules.cache.cache import *

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

