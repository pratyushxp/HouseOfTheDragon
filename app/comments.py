from fastapi import APIRouter
from pydantic import BaseModel

from app.retriever import retriever

router = APIRouter()


class CharacterRequest(BaseModel):
    character: str


@router.post("/character-comments")
def character_comments(req: CharacterRequest):

    comments = retriever.search(
        req.character,
        top_k=100
    )

    return {
        "comments": comments
    }