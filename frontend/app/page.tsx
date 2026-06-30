"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.82)), url('/home.jpg')",
      }}
    >
      {/* ================= HEADER ================= */}

      <header className="flex justify-center py-10">
        <h1
          className="text-white"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "2rem",
            fontWeight: 400,
            letterSpacing: ".03em",
          }}
        >
        </h1>
      </header>

      {/* ================= HERO ================= */}

      <section className="flex flex-col items-center justify-center h-[74vh] text-center px-8">

        <p className="tracking-[0.28em] text-yellow-400 text-3xl font-medium mb-10">
          HOUSE OF THE DRAGON
        </p>

        <h1
          className="text-white whitespace-nowrap"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "6.3rem",
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          Fandom Intelligence
        </h1>

        <p className="text-gray-300 text-2xl mt-8">
          Explore the World of Westeros Through AI
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="
            mt-14
            px-10
            py-4
            border
            border-yellow-500
            text-yellow-400
            rounded-sm
            tracking-[0.25em]
            hover:bg-yellow-500
            hover:text-black
            transition-all
            duration-300
          "
        >
          ENTER THE REALM
        </button>

      </section>
    </main>
  );
}