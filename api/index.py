from fastapi import FastAPI
app = FastAPI()
from datetime import datetime
from pydantic import BaseModel

#Firebase
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

from fastapi import HTTPException

from fastapi.middleware.cors import CORSMiddleware
# Allow all origins for CORS (adjust accordingly for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
# All Events
@app.get("/events")
def upcomingEvents():
    result = []

    events_ref = db.collection("events")

    docs = events_ref.stream()

    for doc in docs:
        if doc.exists:
            this_event = doc.to_dict()
            result.append(this_event)
        else:
            print("Document does not exist!")
    
    return {"Events": result}

# Upcoming Events
@app.get("/upcoming")
def upcomingEvents():
    result = []

    events_ref = db.collection("events")

    docs = events_ref.stream()

    for doc in docs:
        if doc.exists:
            this_event = doc.to_dict()
            event_date = datetime.datetime.strptime(this_event.get("Date"), "%Y-%m-%d")
            current_date = datetime.datetime.now()
            event_type = "Upcoming" if event_date > current_date else "Past"

            if event_type == "Upcoming":
                result.append(this_event)
        else:
            print("Document does not exist!")
    
    return {"Upcoming Events": result}



# Schema for Event
class Event(BaseModel):
    name: str
    date: str
    description: str
    pictures: str
    keyWords: str
    type: str


@app.post("/event/post")
async def upcomingPost(item: Event):
    doc_ref = db.collection("events").document(item.name)
    doc_ref.set({"Date": item.date, "Description": item.description, "Key_Words": item.keyWords,
                 "Name": item.name, "Type": "Upcoming"})

    return {"Upcoming": doc_ref}

@app.get("/event/{event_id}")
def event(event_id: str):
    events_ref = db.collection("events")

    # Retrieve the specific event with the given ID
    doc_ref = events_ref.document(event_id)
    doc = doc_ref.get()

    if doc.exists:
        this_event = doc.to_dict()
        return this_event
   
    return {"Event": this_event}

@app.put("/event/update/{event_id}")
async def update_event(event_id: str, updated_event: Event):
    print(event_id)
    events_ref = db.collection("events").document(event_id)

    # Check if the event exists
    if not events_ref.get().exists:
        raise HTTPException(status_code=404, detail="Event not found")

    # Update the event
    events_ref.update({
        "Date": updated_event.date,
        "Description": updated_event.description,
        "Key_Words": updated_event.keyWords,
        "Name": updated_event.name,
    })

    return {"Updated": event_id}

@app.delete("/event/delete/{event_id}")
async def delete_event(event_id: str):
    events_ref = db.collection("events").document(event_id)

    # Check if the event exists
    if not events_ref.get().exists:
        raise HTTPException(status_code=404, detail="Event not found")

    # Delete the event
    events_ref.delete()

    return {"Deleted": event_id}


# Past Events
@app.get("/past")
def pastEvents():
    result = []
    
    events_ref = db.collection("events")

    docs = events_ref.stream()

    for doc in docs:
        if doc.exists:
            this_event = doc.to_dict()
            event_date = datetime.datetime.strptime(this_event.get("Date"), "%Y-%m-%d")
            current_date = datetime.datetime.now()
            event_type = "Upcoming" if event_date > current_date else "Past"

            if event_type == "Past":
                result.append(this_event)
        else:
            print("Document does not exist!")
    
    return {"Past Events": result}


@app.post("/past")
def pastPost(item: Event):
    result = []

    doc_ref = db.collection("events").document(item.name)
    data_to_update = {"Date": item.date, "Description": item.description, "Key_Words": item.keyWords,
                 "Name": item.name, "Type": "Past"}
    doc_ref.update(data_to_update)

    return {"Past Events": result}


# ------------
# - Emails
# ------------
# import smtplib
# import ssl

# def send_email(subject, body, sender_email, receiver_email, password):
#     port = 465
#     smtp_server = "smtp.gmail.com"
#     message = f"""\
#     Subject: {subject}

#     {body}
#     """

#     context = ssl.create_default_context()
    
#     with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
#         try:
#             print("Logging in...")
#             server.login(sender_email, password)
#             print("Sending email...")
#             server.sendmail(sender_email, receiver_email, message)
#             print("Email sent successfully!")
#         except Exception as e:
#             print(f"An error occurred: {e}")

# # Example usage:
# subject = "Hello from Python"
# body = "This is a test email sent from Python."
# sender_email = "5wfu3.imagine@gmail.com"
# receiver_email = "swabhankatkoori@gmail.com"
# password = input("password")

# send_email(subject, body, sender_email, receiver_email, password)

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

class Member(BaseModel):
    name: str
    role: str
    major: str

@app.post("/members/post")
async def add_member(member: Member):
    members_ref = db.collection("Members").document(member.name)

    # Check if the member already exists
    if members_ref.get().exists:
        raise HTTPException(status_code=400, detail="Member with this name already exists")

    # Add the new member
    members_ref.set({
        "Name": member.name,
        "Role": member.role,
        "Major": member.major
    })

    return {"Added Member": member.name}

@app.delete("/members/delete/{member_name}")
async def delete_member(member_name: str):
    members_ref = db.collection("Members").document(member_name)

    # Check if the member exists
    if not members_ref.get().exists:
        raise HTTPException(status_code=404, detail="Member not found")

    # Delete the member
    members_ref.delete()

    return {"Deleted Member": member_name}
