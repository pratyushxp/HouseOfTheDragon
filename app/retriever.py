import re
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class CommentRetriever:

    def __init__(self):

        self.df = pd.read_csv("data/hotd_comments.csv")

        self.comments = (
            self.df["comment"]
            .fillna("")
            .astype(str)
            .tolist()
        )

        self.vectorizer = TfidfVectorizer(
            stop_words="english",
            max_features=10000,
            ngram_range=(1, 2)
        )

        print("Building TF-IDF index...")

        self.matrix = self.vectorizer.fit_transform(
            self.comments
        )

        print("Retriever Ready.")

    def clean_query(self, query: str):

        query = query.lower()

        # Remove common prompt phrases
        query = re.sub(
            r"(what do youtube viewers think about|summarize community opinion about|what are viewers saying about)",
            "",
            query,
        )

        query = query.replace("?", "").strip()

        return query

    def search(self, query, top_k=10):

        clean_query = self.clean_query(query)

        query_vector = self.vectorizer.transform([clean_query])

        scores = cosine_similarity(
            query_vector,
            self.matrix
        )[0]

        ranked = sorted(
            zip(scores, self.comments),
            key=lambda x: x[0],
            reverse=True
        )

        results = []

        blocked_phrases = [
            "in my opinion",
            "my opinion",
            "controversial opinion",
            "what's your opinion",
            "please make your opinion",
        ]

        for score, comment in ranked:

            comment = comment.strip()

            if score < 0.05:
                continue

            if len(comment) < 50:
                continue

            lower = comment.lower()

            # Skip generic opinion comments
            if any(p in lower for p in blocked_phrases):
                continue

            # Skip duplicates
            if comment in results:
                continue

            results.append(comment)

            if len(results) == top_k:
                break

        return results


retriever = CommentRetriever()