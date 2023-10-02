from fastapi import FastAPI
app = FastAPI()


@app.get("/")
def landing_page():
    return {"message": "Hello World"}


@app.get("/api/python")
def hello_world():
    print("Got to the hello world page")
    return {"message": "Hello World"}