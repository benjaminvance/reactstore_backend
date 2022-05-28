import json
from flask import Flask
from about_me import me
from mock_data import catalog

app = Flask("reactstore")


@app.route("/")
def home():
    return "This is the home page"


@app.route("/about")
def about():
    return me["first"] + " " + me["last"]


@app.route("/myaddress")
def address():
    return f'{me["address"]["street"]} #{me["address"]["number"]}'


################ API ENDPOINTS ###################

@app.route("/api/catalog", methods=['GET'])
def get_catalog():
    return json.dumps(catalog)


@app.route("/api/catalog/count", methods=['GET'])
def get_count():
    counts = len(catalog)

    return json.dumps(counts)


@app.route("/api/product/<id>", methods=['GET'])
def get_product(id):
    return json.dumps(id)


app.run(debug=True)


# cd copy and paste folder
# venv\Scripts\activate
# py server.py
