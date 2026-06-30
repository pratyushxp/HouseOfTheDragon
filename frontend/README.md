# House of the Dragon Observatory

> AI-powered fandom intelligence platform that analyzes over **5,100 YouTube discussions** to uncover character popularity, community sentiment, and AI-generated insights from the House of the Dragon fandom.

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge)

</p>

---

# Overview

House of the Dragon Observatory is an AI-powered analytics dashboard that transforms thousands of YouTube comments into interactive fandom intelligence.

Instead of manually reading discussions, users can explore:

- Character popularity
- AI-generated character summaries
- Community sentiment
- Character relationship insights
- Question answering over YouTube discussions using Gemini AI

The project combines modern web technologies with Natural Language Processing to provide an intelligent exploration experience for one of television's largest fandoms.

---

# Features

### AI Character Intelligence

- AI-generated summaries
- Character popularity ranking
- Mention statistics
- Interactive character explorer

### Ask the Maester

Ask natural language questions such as:

- Why is Daemon so popular?
- Compare Rhaenyra and Alicent.
- Who receives the most criticism?
- What do viewers think about Rhaenyra?

Answers are generated from thousands of YouTube discussions using semantic retrieval and Gemini AI.

### Community Analytics

- Character popularity
- Mention frequency
- Community opinions
- AI-powered summaries

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- FastAPI
- Python

## AI & NLP

- Google Gemini API
- Semantic Retrieval
- Prompt Engineering

## Data Processing

- Pandas
- CSV Processing
- YouTube Comment Analysis

---

# Dataset

The project analyzes over:

- **5,100+ YouTube discussions**

Extracted information includes:

- Character mentions
- Popularity counts
- Relationships
- Community opinions

---

# Project Structure

```
frontend/
├── app/
├── components/
├── public/
│   ├── characters/
│   └── home.jpg
├── package.json

app/
├── main.py
├── retriever.py
├── summary.py

data/
├── hotd_comments.csv
├── character_profiles.csv
└── character_relationships.csv
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/pratyushxp/HouseOfTheDragon.git
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

Backend

```bash
cd app
uvicorn main:app --reload
```

---

# Future Improvements

- Relationship network visualization
- Episode-wise analytics
- Emotion detection
- Character timeline
- Trending discussion dashboard
- Multi-language support

---

# Author

**Pratyush Mishra**

---

If you found this project interesting, consider giving it a.