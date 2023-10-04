from fastapi import FastAPI
app = FastAPI()

#- Sample Database
data = {"Upcoming" : {"Volunteer at...": {"Date": "Sunday", "Description": "afdkdaj;ljad;jf;lajd;fjadfajfh"}}}



@app.get("/upcoming")
def upcoming():
    return {"message": data["Upcoming"]}

@app.get("/past")
def past():
    return {"message": "Past Events"}

@app.get("/pictures")
def pictures():
    return {"message": "Pictures"}

@app.get("/contact")
def contact():
    return {"message": "Contact"}

@app.get("/about_us")
def about():
    return {"message": "About Us"}