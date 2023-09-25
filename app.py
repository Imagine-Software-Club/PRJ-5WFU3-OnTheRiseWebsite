#-FastAPI
from typing import Union
from fastapi import FastAPI

app = FastAPI()

#-Landing Page
@app.get("/")
def read_root():
    print("Got to the Landing Page!")
    return {"Hello": "World"}

