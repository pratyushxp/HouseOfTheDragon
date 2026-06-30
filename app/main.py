from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os

from app.retriever import retriever
from app.summary import router as summary_router
from app.comments import router as comments_router
from app.retriever import retriever
from app.summary import router as summary_router
from app.comments import router as comments_router
from app.characters.routes import router as characters_router
load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI(title="HOTD Observatory API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(summary_router)
app.include_router(comments_router)
app.include_router(characters_router)


class Question(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "HOTD Observatory API Running"
    }


@app.post("/ask")
def ask(question: Question):

    comments = retriever.search(question.question, top_k=10)

    context = "\n\n".join(comments)

    if not context:
        context = "No relevant YouTube comments found."

    prompt = f"""
You are an AI analyst studying House of the Dragon YouTube discussions.

Your job is NOT to answer from your own knowledge.

Use ONLY the comments below.

Summarize the community opinion.

If viewers disagree, mention both sides.

Never invent facts.

If the comments don't answer the question, say:

"I could not find enough evidence in the collected YouTube discussions."

========================
YOUTUBE COMMENTS
========================

{context}

========================
QUESTION
========================

{question.question}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return {
        "answer": response.text,
        "evidence": comments,
    }