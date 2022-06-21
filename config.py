import pymongo
import certifi

con_str = "mongodb+srv://benvance:9Mdc5GnNku2STGLS@cluster0.yhiym.mongodb.net/?retryWrites=true&w=majority"

client = pymongo.MongoClient(con_str, tlsCAFile=certifi.where())

db = client.get_database("FoodStore")
