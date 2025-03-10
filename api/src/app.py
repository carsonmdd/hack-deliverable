from contextlib import asynccontextmanager
from datetime import datetime
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return {"message": "Quote submitted successfully", "quote": quote}


# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get('/quote')
def get_quote(filter: str = 'week') -> list[Quote]:
    ''''
    Retrieve quotes from the database that are at most max_age seconds old.
    '''

    filter_durations = {
        'week': 7 * 24 * 60 * 60,
        'month': 30 * 24 * 60 * 60,
        'year': 365 * 24 * 60 * 60,
        'all': float('inf'),
    }

    max_age = filter_durations[filter]

    quotes = []
    current_time = datetime.now()

    for quote in database['quotes']:
        given_time = datetime.fromisoformat(quote['time'])
        age = current_time - given_time
        if age.total_seconds() <= max_age:
            quotes.append(quote)

    return quotes