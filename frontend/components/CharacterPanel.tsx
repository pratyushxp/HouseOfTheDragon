"use client";

import { useEffect, useState } from "react";

type Props = {
  character: string | null;
  mentions: number;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function CharacterPanel({
  character,
  mentions,
}: Props) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!character) return;

    async function loadSummary() {
      setLoading(true);

      try {
        const res = await fetch(`${API_URL}/summary`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ character }),
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setSummary(data.summary ?? "No summary available.");
      } catch {
        setSummary("Failed to generate AI summary.");
      }

      setLoading(false);
    }

    loadSummary();
  }, [character]);

  if (!character) {
    return (
      <div className="rounded-3xl border border-white/5 bg-white/[0.015] px-6 py-16 text-center backdrop-blur-md md:py-24">
        <h2
          className="text-white"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "clamp(2rem,6vw,3rem)",
          }}
        >
          Character Intelligence
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base text-gray-400 md:text-lg">
          Select a character above to explore AI-generated insights.
        </p>
      </div>
    );
  }

  const imageName = character.toLowerCase();

  return (
    <section className="rounded-3xl border border-white/5 bg-white/[0.015] p-6 backdrop-blur-md sm:p-8 md:p-10">

      <div className="flex flex-col items-center text-center">

        <div className="relative">

          <div className="absolute inset-0 rounded-full bg-yellow-500/5 blur-[60px]" />

          <img
            src={`/characters/${imageName}.jpg`}
            alt={character}
            className="relative z-10 h-36 w-auto object-contain sm:h-48 md:h-60"
          />

        </div>

        <h1
          className="mt-6 text-white"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "clamp(2.2rem,7vw,3.5rem)",
          }}
        >
          {character}
        </h1>

        <div className="mt-5 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-5 py-2 text-sm font-semibold text-yellow-300 sm:px-6 sm:text-base">
          {mentions.toLocaleString()} YouTube Mentions
        </div>

      </div>

      <div className="mx-auto mt-8 max-w-4xl md:mt-10">

        <h2
          className="mb-6 text-center text-yellow-400"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "clamp(1.8rem,5vw,2.25rem)",
          }}
        >
          AI Summary
        </h2>

        {loading ? (
          <div className="space-y-4">
            <div className="h-4 animate-pulse rounded bg-white/5" />
            <div className="h-4 animate-pulse rounded bg-white/5" />
            <div className="h-4 animate-pulse rounded bg-white/5" />
            <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-white/5" />
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-black/5 p-5 sm:p-6 md:p-8">

            <p className="whitespace-pre-wrap text-center text-base leading-8 text-gray-300 md:text-lg md:leading-9">
              {summary}
            </p>

          </div>
        )}

      </div>

    </section>
  );
}