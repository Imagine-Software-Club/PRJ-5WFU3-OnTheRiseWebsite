from fastapi import FastAPI
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from starlette.requests import Request
from starlette.responses import JSONResponse
from datetime import datetime
from typing import List
from pydantic import EmailStr, BaseModel


app = FastAPI()

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
            event_date = datetime.strptime(this_event.get("Date"), "%Y-%m-%d")
            current_date = datetime.now()
            event_type = "Upcoming" if event_date > current_date else "Past"

            if event_type == "Upcoming":
                result.append(this_event)
        else:
            print("Document does not exist!")

    result = sorted(result, key=lambda x: datetime.strptime(x.get("Date"), "%Y-%m-%d"), reverse = True)
    
    return {"Upcoming Events": result}



# Schema for Event
class Event(BaseModel):
    name: str
    date: str
    description: str
    thumbnail: str


@app.post("/event/post")
async def upcomingPost(item: Event):
    doc_ref = db.collection("events").document(item.name)
    doc_ref.set({"Date": item.date, "Description": item.description,
                 "Name": item.name, "Thumbnail": item.thumbnail, "Registerd": []})

    return {"Upcoming": doc_ref}

@app.get("/event/{event_id}")
def event(event_id: str):
    events_ref = db.collection("events").document(event_id)

    # Check if the event exists
    if not events_ref.get().exists:
        raise HTTPException(status_code=404, detail="Event not found")
    
    doc = events_ref.get()


    this_event = doc.to_dict()
   
    return {"Event": this_event}

@app.put("/event/update/{event_id}")
async def update_event(event_id: str, updated_event: Event):
    events_ref = db.collection("events").document(event_id)

    # Check if the event exists
    if not events_ref.get().exists:
        raise HTTPException(status_code=404, detail="Event not found")

    # Update the event
    events_ref.update({
        "Date": updated_event.date,
        "Description": updated_event.description,
        "Thumbnail": updated_event.thumbnail,
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
            event_date = datetime.strptime(this_event.get("Date"), "%Y-%m-%d")
            current_date = datetime.now()
            event_type = "Upcoming" if event_date > current_date else "Past"

            if event_type == "Past":
                result.append(this_event)
        else:
            print("Document does not exist!")

    result = sorted(result, key=lambda x: datetime.strptime(x.get("Date"), "%Y-%m-%d"), reverse = True)
    
    return {"Past Events": result}


# ---------------------
# - Register for Events
# ---------------------
class Register(BaseModel):
    email: str
    event: str
    first: str
    last: str
    phone: str

@app.post("/register")
def registerEvent(item: Register):
    # Add to events mailing list
    doc_ref = db.collection("events").document(item.event)
    event_data = doc_ref.get().to_dict()
    
    if event_data:
        registered_emails = event_data.get("Registered", [])
        registered_emails.append(item.email)

        data_to_update = {
            "Date": event_data.get("Date", ""),
            "Description": event_data.get("Description", ""),
            "Key_Words": event_data.get("Key_Words", ""),
            "Name": event_data.get("Name", ""),
            "Type": "Past",
            "Registered": registered_emails
        }

        doc_ref.update(data_to_update)
    else:
        return {"Error": "Event not found"}

    # Add to user's events
    user_doc_ref = db.collection("Registered").document(item.email)
    user_data = user_doc_ref.get().to_dict()

    if user_data:
        registered_events = user_data.get("Events", [])
        registered_events.append(item.event)

        user_data_to_update = {"Email": item.email, "Events": registered_events}
        user_doc_ref.update(user_data_to_update)
    else:
        # Create a new document for the user if not found
        new_user_data = {"Email": item.email, "Events": [item.event]}
        user_doc_ref.set(new_user_data)

    return {"Done": "Succeeded"}





# ------------
# - Emails
# ------------
conf = ConnectionConfig(
    MAIL_USERNAME="5wfu3.imagine@gmail.com",
    MAIL_PASSWORD="vkmh fiqx emyi ipta",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    MAIL_FROM="5wfu3.imagine@gmail.com"
)

class EmailSchema(BaseModel):
   subject: str
   from_email: str
   message: str

@app.post("/contact_us")
async def send_mail(email: EmailSchema):
    template = """
        <html>
        <body>
 
        <p>Hi !!!</p>
        <br>Thanks for using fastapi mail, keep using it..!!!</p>
 
 
        </body>
        </html>
        """

    message = MessageSchema(
        subject = email.subject + " | Email from " + email.from_email,
        recipients =["swabhankatkoori@gmail.com"],
        body = email.message,
        subtype= 'plain'
    )
 
    fm = FastMail(conf)
    await fm.send_message(message)
    print(message)
 
    return JSONResponse(status_code=200, content={"message": "email has been sent"})


class EmailSchema(BaseModel):
   email: List[EmailStr]
   subject: str
   message: str

@app.post("/emailList")
async def send_mailList(email: EmailSchema):
    template = email.message

    message = MessageSchema(
        subject = email.subject,
        recipients = [],
        bcc = email.dict().get("email"),
        body = email.message,
        subtype= 'html'
    )
 
    fm = FastMail(conf)
    await fm.send_message(message)
    print(message)
 
    return JSONResponse(status_code=200, content={"message": "email has been sent"})


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
            
    return {"Members": result}

class Member(BaseModel):
    name: str
    role: str
    major: str
    image: str

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
        "Major": member.major,
        "Image": member.image
    })

    return {"Added Member": member.name}

@app.put("/members/update/{member_id}")
async def update_member(member_id: str, updated_member: Event):
    members_ref = db.collection("Members").document(member_id)

    # Check if the event exists
    if not members_ref.get().exists:
        raise HTTPException(status_code=404, detail="Member not found")

    # Update the event
    members_ref.update({
        "Name": updated_member.name,
        "Role": updated_member.role,
        "Major": updated_member.major,
        "Image": updated_member.image
    })

    return {"Updated": member_id}

@app.delete("/members/delete/{member_name}")
async def delete_member(member_name: str):
    members_ref = db.collection("Members").document(member_name)

    # Check if the member exists
    if not members_ref.get().exists:
        raise HTTPException(status_code=404, detail="Member not found")

    # Delete the member
    members_ref.delete()

    return {"Deleted Member": member_name}


