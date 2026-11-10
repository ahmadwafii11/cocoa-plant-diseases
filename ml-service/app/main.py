from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.routes.prediction import router as prediction_router

app = FastAPI(
    title="CocoaScan AI Service"
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

app.mount(
    "/results",
    StaticFiles(directory="results"),
    name="results"
)

app.include_router(
    prediction_router,
    prefix="/api"
)

@app.get("/health")
def health():
    return{
        "status"    : "OK",
        "service"   : "CocoaScan AI Service"
    }