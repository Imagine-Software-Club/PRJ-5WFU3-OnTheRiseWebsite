from fastapi import FastAPI
app = FastAPI()

from pydantic import BaseModel

events = {
	"Event 1": {
		"id": 1,
		"date": "10/08/2023",
		"description": "Sample...",
		"pictures": "Picture ID",
		"key words": "Education"
	},
	"Event 2": {
		"id": 2,
		"date": "10/12/2023",
		"description": "Sample...",
		"pictures": "Picture ID",
		"key words": "Education"
	}
}

past = {"Event 1"}
upcoming = {"Event 2"}


users = {
	"username" : {
		"id": 1001,
		"password": "123456789",
		"email": "sample@msu.edu"
	}
}

currentUsers = {"username"}



#Starting Endpoints
@app.get("/")
def landing_page():
	return {"message": "Hello World"}


@app.get("/api/python")
def hello_world():
	print("Got to the hello world page")
	return {"message": "Hello World"}


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




#------------
#- Events
#------------

#Upcoming Events - Example Code
@app.get("/upcoming")
def upcomingEvents():
	result = []
	for i in upcoming: #Goes through names in set, and uses to retrieve from data
		result.append(events[i])

	return {"Upcoming": result}

#Schema for Event, used to add data via post request
class Event(BaseModel):
	name: str
	ID: int
	date: str
	description: str | None = None
	pictures: str
	keyWords: str

@app.post("/upcoming/post")
async def upcomingPost(item: Event):
    # Create and add info to dictionary
    events[item.name] = {
        "id": item.ID,
        "date": item.date,
        "description": item.description,
        "pictures": item.pictures,
        "key words": item.keyWords
    }

    print(events)

    # Return the added event
    return {"Upcoming": events[item.name]}


#Past Events
@app.get("/past")
def pastEvents():
	result = []
	#Add all past events into result

	return {"Past Events": result}


@app.post("/past")
def pastPost(item: Event):
	result = []
	#Add event from upcoming into past

	#Delete from upcoming

	#Check to see if worked by going to /upcoming and /past
	return {"Past Events": result}


#------------
#- Users
#------------

#All Profiles
@app.get("/profiles")
def profiles():
	result = []
	#Add all profiles into result

	return {"Users": result}

#Signup/Login
@app.get("/login")
def login(username: str, password: str):
	result = []
	# Check to see if User exists, if they do add to result

	if username in currentUsers:
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
	#Create a user

	#Add new user to result

	return {"New User": result}
















	