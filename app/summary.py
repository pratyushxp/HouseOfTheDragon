from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os

from app.retriever import retriever

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

router = APIRouter()


class CharacterRequest(BaseModel):
    character: str


@router.post("/summary")
def summary(req: CharacterRequest):

    comments = retriever.search(req.character, top_k=12)

    context = "\n\n".join(comments)

    if not context:
        context = "No relevant YouTube comments found."

    prompt = f"""
You are an expert analyst of House of the Dragon YouTube discussions.

Write a concise summary (120-150 words) of the character.

Include:
- Overall community opinion
- Positive traits
- Negative traits
- Why the character is important

Only use the comments below.

====================
COMMENTS
====================

{context}

====================
CHARACTER
====================

{req.character}
"""

    response = model.generate_content(prompt)

    return {
        "summary": response.text
    }