from fastapi import FastAPI
app = FastAPI()

from pydantic import BaseModel

#Firebase
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


past = {"Event 1"}
upcoming = {"Event 2"}

users = {"username": {"id": 1001, "password": "123456789", "email": "sample@msu.edu"}}

"""
# Adding to Firebase DB 
doc_ref = db.collection("events").document("Event 1")
doc_ref.set({
        "name": "Event 1",
        "id": 1,
        "date": "10/08/2023",
        "description": "Sample...",
        "pictures": "Picture ID",
        "key words": "Education",
})

doc_ref = db.collection("events").document("Event 2")
doc_ref.set({
    "name": "Event 2",
    "id": 2,
    "date": "10/12/2023",
    "description": "Sample...",
    "pictures": "Picture ID",
    "key words": "Education",
})
"""

# Starting Endpoints
@app.get("/")
def landing_page():
    return {"message": "Hello World"}


@app.get("/api/python")
def hello_world():
    print("Got to the hello world page")
    return {"message": "Hello World"}

'''
class ItemTest(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


@app.post("/test/")
async def create_item(item: ItemTest):
    item_dict = item.dict()
    if item.tax:
        price_with_tax = item.price + item.tax
        item_dict.update({"price_with_tax": price_with_tax})
    return item_dict
'''

# ------------
# - Events
# ------------


# Upcoming Events - Example Code
@app.get("/upcoming")
def upcomingEvents():
    result = []

    events_ref = db.collection("events")

    docs = events_ref.stream()

    for doc in docs:
        if doc.exists:
            this_event = doc.to_dict()
            if this_event["Type"] == "Upcoming":
                result.append(this_event)
        else:
            print("Document does not exist!")
    
    return {"Upcoming Events": result}


    #return data


# Schema for Event, used to add data via post request
class Event(BaseModel):
    name: str
    ID: int
    date: str
    description: str
    pictures: str
    keyWords: str
    type: str


@app.post("/upcoming/post")
async def upcomingPost(item: Event):

    doc_ref = db.collection("events").document(item.name)
    doc_ref.set({"Date": item.date, "Description": item.description, "Key_Words": item.keyWords,
                 "Name": item.name, "Type": "Upcoming"})

    # Return the added event
    return {"Upcoming": doc_ref}


# Past Events
@app.get("/past")
def pastEvents():
    result = []
    
    events_ref = db.collection("events")

    docs = events_ref.stream()

    for doc in docs:
        if doc.exists:
            this_event = doc.to_dict()
            if this_event["Type"] == "Past":
                result.append(this_event)
        else:
            print("Document does not exist!")
    
    return {"Past Events": result}


@app.post("/past")
def pastPost(item: Event):
    result = []
    # Add event from upcoming into past
    doc_ref = db.collection("events").document(item.name)
    data_to_update = {"Date": item.date, "Description": item.description, "Key_Words": item.keyWords,
                 "Name": item.name, "Type": "Past"}
    doc_ref.update(data_to_update)


    # Delete from upcoming

    # Check to see if worked by going to /upcoming and /past
    return {"Past Events": result}


# ------------
# - Users
# ------------


# All Profiles
@app.get("/profiles")
def profiles():
    result = []
    # Add all profiles into result

    return {"Users": result}


# Signup/Login
@app.get("/login")
def login(username: str, password: str):
    result = []
    # Check to see if User exists, if they do add to result

    if username in users:
        if password == users[username]["password"]:
            result.append(users[username])
        else:
            result.append("Incorrect Password")
    else:
        result.append("Incorrect Username")
    return {"User": result}


@app.post("/signup")
def signup():
    result = []
    # Create a user

    # Add new user to result

    return {"New User": result}
