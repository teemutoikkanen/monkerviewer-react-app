from flask import Flask
import pymongo

# todo

# # 1. servu ylös
# # 2. ERILLLINEN SCRIPT: paikallinen data -> save to mongodb
# # 3. SERVER v1: query database pala kerrallaan: 
# #     *periaatteessa tarvii min. auki olevan noden children nodet
# #         -> input: node-id. output: children nodes


app = Flask(__name__)

@app.route('/')
def getChildrenData():
    return 'Hello, World!'