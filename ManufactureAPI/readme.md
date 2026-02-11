<!--
1) create app on command:
1.1: create new folder
mkdir ManufactureAPI_v01
cd ManufactureAPI_v01

2) Create and activate a new virtual environment:

2.1) python3 -m venv .venv && source .venv/bin/activate

3) Install libary:

pip install -r requirements.txt

4) create a file
    
    6.1) touch main.py

5) create folder and file    
    mkdir app && \
        mkdir app/auth && \
        touch app/__init__.py app/api.py && \
        touch app/auth/__init__.py app/model.py
6) In the main.py file we insert an entry point to run the application. We define a listening port. For example the 8081. We add — reload = True so that in case of changes, the app will be reloaded:

# main.py

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="localhost", port=8081, reload=True)


7) Now we need a base route. Create a base route in app/api.py:

# app/api.py

from fastapi import FastAPI

app = FastAPI()

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your example blog app!"}

8) Run the application:
python main.py
-->
