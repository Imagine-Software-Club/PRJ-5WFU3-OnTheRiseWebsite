from fastapi import FastAPI
app = FastAPI()

from pydantic import BaseModel

#Firebase
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


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

# ------------
# - Events
# ------------

# Upcoming Events
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



# Schema for Event
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


# Community Service
@app.get("/upcoming")
def upcomingServices():
    result = []

    service_ref = db.collection("events")

    docs = service_ref.stream()

    for doc in docs:
        if doc.exists:
            this_service = doc.to_dict()
            if this_service["Type"] == "Upcoming":
                result.append(this_service)
        else:
            print("Document does not exist!")

    return {"Community Service": result}

@app.get("/past")
def pastServices():
    result = []

    services_ref = db.collection("community_services")

    docs = services_ref.stream()

    for doc in docs:
        if doc.exists:
            this_service = doc.to_dict()
            if this_service["Type"] == "Past":
                result.append(this_service)
        else:
            print("Document does not exist!")

    return {"Community Service": result}


@app.post("/past")
def pastPost(item: Event):
    result = []

    doc_ref = db.collection("events").document(item.name)
    data_to_update = {"Date": item.date, "Description": item.description, "Key_Words": item.keyWords,
                 "Name": item.name, "Type": "Past"}
    doc_ref.update(data_to_update)

    return {"Past Events": result}


# ------------
# - OTR Members
# ------------
@app.get("/members")
def upcomingEvents():
    result = []

    members_ref = db.collection("Members")

    docs = members_ref.stream()

    for doc in docs:
        if doc.exists:
            the_member = doc.to_dict()
            result.append(the_member)
        else:
            print("Document does not exist!")
    
    return {"OTR Members": result}
