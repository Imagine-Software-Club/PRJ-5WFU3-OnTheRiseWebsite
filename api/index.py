from fastapi import FastAPI
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from starlette.requests import Request
from starlette.responses import JSONResponse
from datetime import datetime
from typing import List
from pydantic import EmailStr, BaseModel
from urllib.parse import unquote
import os


app = FastAPI()

#Firebase
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

from fastapi import HTTPException

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    print(result)
    return {"Upcoming Events": result}



# Schema for Event
class Event(BaseModel):
    name: str
    date: str
    description: str
    thumbnail: str

@app.get("/event/{event_id}")
def event(event_id: str):
    decoded_event_id = unquote(event_id)
    print(decoded_event_id)
    events_ref = db.collection("events").document(decoded_event_id)

    # Check if the event exists
    if not events_ref.get().exists:
        raise HTTPException(status_code=404, detail="Event not found")
    
    doc = events_ref.get()

    this_event = doc.to_dict()
   
    return {"Event": this_event}

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
    MAIL_USERNAME="websiteontherise@gmail.com",
    MAIL_PASSWORD=os.environ.get('App_Password'),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    MAIL_FROM="websiteontherise@gmail.com"
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
        recipients =["otrmsuwebsite@gmail.com"],
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


# ------------
# - OTR Services
# ------------
@app.get("/services")
def upcomingEvents():
    result = []

    services_ref = db.collection("Services")

    docs = services_ref.stream()

    for doc in docs:
        if doc.exists:
            the_service = doc.to_dict()
            result.append(the_service)
        else:
            print("Document does not exist!")
            
    return {"Services": result}