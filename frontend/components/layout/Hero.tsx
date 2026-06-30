"use client";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-white/5 bg-white/[0.015] backdrop-blur-md px-10 py-12">

      <div className="flex flex-col items-center text-center">

        <p className="uppercase tracking-[0.35em] text-yellow-400 text-lg font-semibold">
          AI Fandom Intelligence
        </p>

        <h1
          className="mt-4 text-white leading-none"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "4rem",
          }}
        >
          House of the Dragon Observatory
        </h1>

        <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-300">
          Discover community sentiment, character popularity and AI-generated
          insights from over{" "}
          <span className="font-semibold text-yellow-400">
            5,100
          </span>{" "}
          YouTube discussions.
        </p>

        <div className="mt-8 inline-flex items-center rounded-full border border-yellow-500/20 bg-yellow-500/5 px-7 py-3">

          <span className="font-semibold text-yellow-300">
            5,100 YouTube Discussions Analysed
          </span>

        </div>

      </div>

    </section>
  );
}