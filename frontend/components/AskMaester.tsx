"use client";

import { useState } from "react";

type Props = {
  selectedCharacter?: string | null;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function AskMaester({
  selectedCharacter,
}: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evidence, setEvidence] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState(false);

  const suggestions = [
    "Why is Daemon so popular?",
    "Who is the most controversial character?",
    "Compare Rhaenyra and Alicent.",
    "Why do fans support Team Black?",
    "Who is viewed as the biggest villain?",
    "Which character receives the most criticism?",
  ];

  async function askQuestion(customQuestion?: string) {
    const currentQuestion = customQuestion ?? question;

    if (!currentQuestion.trim()) return;

    setAsked(true);
    setQuestion(currentQuestion);
    setLoading(true);
    setAnswer("");
    setEvidence([]);

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
        }),
      });

      if (!res.ok) throw new Error("Backend Error");

      const data = await res.json();

      setAnswer(data.answer ?? "No answer returned.");
      setEvidence(data.evidence ?? []);
    } catch {
      setAnswer(
        "The AI service couldn't generate a response. Please try again."
      );
      setEvidence([]);
    }

    setLoading(false);
  }

  function newQuestion() {
    setQuestion("");
    setAnswer("");
    setEvidence([]);
    setAsked(false);
    setLoading(false);
  }

  return (
    <section className="mt-8 rounded-3xl border border-white/5 bg-white/[0.015] p-6 backdrop-blur-md sm:p-8 md:mt-12 md:p-10">

      <div className="text-center">

        <h2
          className="text-white"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "clamp(2rem,6vw,3rem)",
          }}
        >
          Ask the Maester
        </h2>

        <p className="mt-3 text-base text-gray-400 md:text-lg">
          Ask questions based on 5,100 YouTube discussions.
        </p>

      </div>

      {!asked && (
        <div className="mt-8 md:mt-10">

          <p className="mb-6 text-center font-semibold text-yellow-400">
            Suggested Questions
          </p>

          <div className="flex flex-wrap justify-center gap-3">

            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => askQuestion(q)}
                className="rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-300 transition hover:bg-yellow-500 hover:text-black sm:px-5 sm:py-3 sm:text-base"
              >
                {q}
              </button>
            ))}

            {selectedCharacter && (
              <button
                onClick={() =>
                  askQuestion(
                    `What do YouTube viewers think about ${selectedCharacter}?`
                  )
                }
                className="rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-300 transition hover:bg-yellow-500 hover:text-black sm:px-5 sm:py-3 sm:text-base"
              >
                What do viewers think about {selectedCharacter}?
              </button>
            )}

          </div>

        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 md:mt-10 md:flex-row">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askQuestion();
          }}
          placeholder="Ask your own question..."
          className="flex-1 rounded-xl border border-white/5 bg-black/5 px-5 py-4 text-white outline-none placeholder:text-gray-500"
        />

        <button
          onClick={() => askQuestion()}
          className="rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-black transition hover:bg-yellow-400"
        >
          Ask
        </button>

        {asked && (
          <button
            onClick={newQuestion}
            className="rounded-xl border border-white/5 bg-white/[0.02] px-6 py-4 text-white transition hover:bg-white/10"
          >
            New Question
          </button>
        )}

      </div>

      {loading && (
        <div className="mt-8 text-center text-yellow-400 md:mt-10">
          ⚔️ The Maester is consulting ancient scrolls...
        </div>
      )}

      {!loading && answer && (
        <>

          <div className="mt-8 rounded-2xl border border-white/5 bg-black/5 p-5 sm:p-6 md:mt-10 md:p-8">

            <h3
              className="mb-6 text-center text-yellow-400"
              style={{
                fontFamily: '"Times New Roman", serif',
                fontSize: "clamp(1.6rem,5vw,2rem)",
              }}
            >
              AI Answer
            </h3>

            <p className="whitespace-pre-wrap text-base leading-8 text-gray-300 md:text-lg md:leading-9">
              {answer}
            </p>

          </div>

          {evidence.length > 0 && (

            <div className="mt-8 rounded-2xl border border-white/5 bg-black/5 p-5 sm:p-6 md:p-8">

              <h3
                className="mb-6 text-center text-yellow-400"
                style={{
                  fontFamily: '"Times New Roman", serif',
                  fontSize: "clamp(1.6rem,5vw,2rem)",
                }}
              >
                Evidence from YouTube Comments
              </h3>

              <div className="max-h-[420px] space-y-4 overflow-y-auto">

                {evidence.map((comment, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-4 leading-7 text-gray-300 md:p-5"
                  >
                    {comment}
                  </div>
                ))}

              </div>

            </div>

          )}

        </>
      )}

    </section>
  );
}