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
          body: JSON.stringify({
            character,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch summary");
        }

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
      <div className="rounded-3xl border border-white/5 bg-white/[0.015] backdrop-blur-md py-24 text-center">
        <h2
          className="text-white"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "3rem",
          }}
        >
          Character Intelligence
        </h2>

        <p className="mt-4 text-lg text-gray-400">
          Select a character above to explore AI-generated insights.
        </p>
      </div>
    );
  }

  const imageName = character.toLowerCase();

  return (
    <section className="rounded-3xl border border-white/5 bg-white/[0.015] backdrop-blur-md p-10">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-yellow-500/5 blur-[70px]" />

          <img
            src={`/characters/${imageName}.jpg`}
            alt={character}
            className="relative z-10 h-60 w-auto object-contain"
          />
        </div>

        <h1
          className="mt-6 text-white"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "3.5rem",
          }}
        >
          {character}
        </h1>

        <div className="mt-5 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-6 py-2 font-semibold text-yellow-300">
          {mentions} YouTube Mentions
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <h2
          className="mb-8 text-center text-yellow-400"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "2.25rem",
          }}
        >
          AI Summary
        </h2>

        {loading ? (
          <div className="space-y-4">
            <div className="h-4 animate-pulse rounded bg-white/5"></div>
            <div className="h-4 animate-pulse rounded bg-white/5"></div>
            <div className="h-4 animate-pulse rounded bg-white/5"></div>
            <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-white/5"></div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-black/5 p-8">
            <p className="whitespace-pre-wrap text-center text-lg leading-9 text-gray-300">
              {summary}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}