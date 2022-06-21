import json
from unicodedata import category
from colorama import Cursor
from flask import Flask, Response, abort, request
from about_me import me
from mock_data import catalog
from config import db
from bson import ObjectId
from flask_cors import CORS

app = Flask("reactstore")
CORS(app)


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
    results = []
    cursor = db.products.find({})

    for prod in cursor:
        prod["_id"] = str(prod["_id"])
        results.append(prod)

    return json.dumps(results)


@app.route("/api/catalog", methods=["POST"])
def save_product():
    try:
        product = request.get_json()
        errors = ""

        if not "title" in product or len(product["title"]) < 5:
            errors = "Title is required and should have at least 5 characters"

        if not "image" in product:
            errors += ", Image is required"

        if not "price" in product or product["product"] < 1:
            errors += ", Price is required and should be >= 1"

        if errors:
            return (500, "Unexpected error")

        db.products.insert_one(product)
        product["_id"] = str(product["_id"])

        return json.dumps(product)

    except Exception as ex:
        return abort(500, F"Unexpected error: {ex}")


#################################################


@app.route("/api/catalog/count", methods=['GET'])
def get_count():
    cursor = db.products.find({})
    num_items = 0
    for prod in cursor:
        num_items += 1

    return json.dumps(num_items)


@app.route("/api/product/<id>", methods=['GET'])
def get_product(id):
    try:
        if not ObjectId.is_valid(id):
            return abort(400, "Invalid id")

        product = db.products.find_one({"_id": ObjectId(id)})

        if not product:
            return abort(404, "Product not found")

        product["_id"] = str(product["_id"])
        return json.dumps(product)

    except:
        return abort(500, "Unexpected error")


@app.route("/api/catalog/total", methods=['GET'])
def get_total():
    total = 0
    cursor = db.products.find({})
    for prod in cursor:
        # total = total + prod["price"]
        total += prod["price"]

    return json.dumps(total)

###########   Get product by category   ###########


@app.route("/api/catalog/<category>")
def products_by_category(category):
    results = []
    cursor = db.products.find({"category": category})

    for prod in catalog:
        prod["_id"] = str(prod["_id"])
        results.append(prod)

    return json.dumps(results)


@app.route("/api/categories")
def get_unique_categories():
    cursor = db.products.find({})

    results = []
    for prod in cursor:
        cat = prod["category"]
        if not cat in results:
            results.append(cat)

    return json.dumps(results)


@app.get("/api/product/cheapest")
def get_cheapest_product():
    cursor = db.products({})
    solution = catalog[0]
    for prod in catalog:
        if prod["price"] < solution["price"]:
            solution = prod

    solution["_id"] = str(solution["_id"])
    return json.dumps(solution)


@app.get("/api/exercise1")
def get_exe1():
    nums = [123, 123, 654, 124, 8865, 532, 4768, 8476, 45762,
            345, -1, 234, 0, -12, -456, -123, -865, 532, 4768]
    solution = {}

    # A: find the lowest number
    solution["a"] = 1

    # B: find how many numbers are lowe than 500
    solution["b"] = 1

    # C: sum all the negatives
    solution["c"] = 1

    # D: find the sum of numbers except negatives
    solution["d"] = 1

    return json.dumps(solution)

# competancy report due before saturday class

###########################################################
#################### COUPON CODES #########################
###########################################################


@app.route("/api/coupons", methods=["POST"])
def save_coupon():
    coupon = request.get_json()
    try:

        if not "code" in coupon or len(coupon["code"]) < 5:
            errors += "Coupon should have at least 5 characters"

        if not "discount" in coupon or coupon["discount"] < 1 or coupon["discount"] > 50:
            error += "Discount is required and should be 1-50"

        if errors:
            return Response(errors, status=400)

        exists = db.coupons.find_one({"code": coupon["code"]})
        if exists:
            # return abort(400, "A coupon exists for that code")
            return Response("A coupon already exists for that code", status=400)

        db.products.insert_one(coupon)

        coupon["_id"] = str(coupon["_id"])
        return json.dumps(coupon)

    except Exception as ex:
        print(ex)
        return Response("Unexpected error", status=500)

 #########################################################


@app.route("/api/coupons", methods=['GET'])
def get_all_coupon():
    results = []
    cursor = db.coupon.find({})

    for cc in cursor:
        cc["_id"] = str(cc["_id"])
        results.append(cc)

    return json.dumps(results)

###########################################################


@app.route("/api/coupons/code")
def coupons_by_code(category):
    results = []
    cursor = db.cc.find({"coupons": cc})

    for cc in coupons:
        cc["_id"] = str(cc["_id"])
        results.append(cc)

    return json.dumps(results)


@app.route("/api/coupons/<code>", methods=["Get"])
def get_coupon_by_code(code):

    coupon = db.coupons.find_one({"code": code})
    if not coupon:
        return abort(404, "Coupon not found")

    coupon["_id"] = str(coupon["_id"])
    return json.dumps(coupon)


app.run(debug=True)


# cd copy and paste folder
# venv\Scripts\activate
# py server.py

# 9Mdc5GnNku2STGLS
# mongodb+srv://benvance:<password>@cluster0.yhiym.mongodb.net/?retryWrites=true&w=majority
