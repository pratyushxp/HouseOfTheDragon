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
      <section className="flex min-h-screen flex-col items-center justify-center px-8 py-16 text-center">

        {/* Subtitle */}

        <p className="mb-5 text-sm font-medium tracking-[0.35em] text-yellow-400 sm:text-lg md:mb-8 md:text-2xl">
          HOUSE OF THE DRAGON
        </p>

        {/* Main Title */}

        <h1
          className="text-white leading-none"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontWeight: 400,
            fontSize: "clamp(3rem, 11vw, 6.3rem)",
          }}
        >
          <span className="block md:inline">Fandom</span>{" "}
          <span className="block md:inline">Intelligence</span>
        </h1>

        {/* Description */}

        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300 sm:text-xl md:mt-8 md:max-w-2xl md:text-2xl">
          Explore the World of Westeros Through AI
        </p>

        {/* Button */}

        <button
          onClick={() => router.push("/dashboard")}
          className="
            mt-12
            w-full
            max-w-sm
            rounded-sm
            border
            border-yellow-500
            py-4
            text-base
            font-medium
            tracking-[0.25em]
            text-yellow-400
            transition-all
            duration-300
            hover:bg-yellow-500
            hover:text-black
            sm:w-auto
            sm:px-12
            md:mt-14
            md:py-4
          "
        >
          ENTER THE REALM
        </button>

      </section>
    </main>
  );
}