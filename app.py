#-FastAPI
from typing import Union
from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory='templates')

#-Landing Page
@app.get("/", response_class = HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse('home.html', {'request': request})

#-Upcoming Events Page

#-Past Events Page

#-Pictures Page

#-Contact Page

#-About Us Page

