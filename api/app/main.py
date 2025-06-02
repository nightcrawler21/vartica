from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI(title="Vartica API stub")
BASE = Path(__file__).resolve().parent.parent.parent / "fixtures"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

def _load(name):
    with open(BASE / f"{name}.json") as fp:
        return json.load(fp)

@app.get("/v1/articles/latest")
def latest(limit: int = 20):
    return _load("latest")[:limit]

@app.get("/v1/articles/{article_id}")
def article(article_id: str):
    for art in _load("latest"):
        if art["id"] == article_id:
            return art
    raise HTTPException(status_code=404, detail="Not found")

@app.get("/v1/stats/overview")
def stats():
    return {"left": 0.33, "centre": 0.45, "right": 0.22}
