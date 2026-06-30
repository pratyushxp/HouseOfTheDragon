"use client";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-white/5 bg-white/[0.015] px-5 py-8 backdrop-blur-md sm:px-8 md:px-10 md:py-12">

      <div className="flex flex-col items-center text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-400 sm:text-base md:text-lg md:tracking-[0.35em]">
          AI Fandom Intelligence
        </p>

        <h1
          className="mt-4 text-white leading-tight"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "clamp(2.2rem, 7vw, 4rem)",
          }}
        >
          House of the
          <br className="md:hidden" />
          {" "}Dragon Observatory
        </h1>

        <p className="mt-5 max-w-4xl px-2 text-base leading-7 text-gray-300 sm:text-lg md:mt-6 md:px-0 md:text-lg md:leading-8">
          Discover community sentiment, character popularity and AI-generated
          insights from over{" "}
          <span className="font-semibold text-yellow-400">
            5,100
          </span>{" "}
          YouTube discussions.
        </p>

        <div className="mt-7 inline-flex max-w-full items-center rounded-full border border-yellow-500/20 bg-yellow-500/5 px-5 py-3 text-center sm:px-7">

          <span className="text-sm font-semibold text-yellow-300 sm:text-base">
            5,100 YouTube Discussions Analysed
          </span>

        </div>

      </div>

    </section>
  );
}