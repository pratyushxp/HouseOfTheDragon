"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import CharacterExplorer from "@/components/CharacterExplorer";
import CharacterPanel from "@/components/CharacterPanel";
import AskMaester from "@/components/AskMaester";

type Stats = {
  characters: number;
  comments: number;
  relationships: number;
  topCharacter: string;
};

type Character = {
  character: string;
  mentions: string;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  const [characters, setCharacters] = useState<Character[]>([]);

  const [selectedCharacter, setSelectedCharacter] =
    useState<string | null>(null);

  const [selectedMentions, setSelectedMentions] =
    useState(0);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats);

    fetch("/api/top-characters")
      .then((r) => r.json())
      .then(setCharacters);
  }, []);

  if (!stats) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white text-3xl">
        Loading...
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.72), rgba(0,0,0,.95)), url('/home.jpg')",
      }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <Hero />

        <section className="mt-10">

          <CharacterExplorer
            characters={characters}
            selectedCharacter={selectedCharacter}
            onSelect={(character, mentions) => {
              setSelectedCharacter(character);
              setSelectedMentions(mentions);
            }}
          />

        </section>

        <section className="mt-10">

          <CharacterPanel
            character={selectedCharacter}
            mentions={selectedMentions}
          />

        </section>

        <section className="mt-10">

          <AskMaester
            selectedCharacter={selectedCharacter}
          />

        </section>

      </div>

    </main>
  );
}