"use client";

type Character = {
  character: string;
  mentions: string;
};

type Props = {
  characters: Character[];
  selectedCharacter: string | null;
  onSelect: (character: string, mentions: number) => void;
};

export default function CharacterExplorer({
  characters,
  selectedCharacter,
  onSelect,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-sm sm:p-8 md:p-10">

      <div className="mb-8 text-center md:mb-10">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400 sm:text-base md:text-lg md:tracking-[0.4em]">
          Characters
        </p>

        <h2
          className="mt-3 text-white"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
          }}
        >
          Explore Characters
        </h2>

        <p className="mt-4 px-2 text-base text-gray-400 sm:text-lg">
          Browse every character discovered from YouTube discussions.
        </p>

        <p className="mt-3 text-sm text-gray-500 sm:text-base">
          {characters.length} Characters Analysed
        </p>

      </div>

      <div className="overflow-x-auto pb-4">

        <div className="flex w-max gap-5 px-2 sm:gap-8 sm:px-4 md:gap-12 md:px-8">

          {characters.map((c) => {

            const active = selectedCharacter === c.character;

            return (

              <button
                key={c.character}
                onClick={() => onSelect(c.character, Number(c.mentions))}
                className="flex-shrink-0"
              >

                <div className="w-24 text-center sm:w-28 md:w-36">

                  <img
                    src={`/characters/${c.character.toLowerCase()}.jpg`}
                    alt={c.character}
                    className={`mx-auto h-20 w-20 rounded-full border-2 object-cover transition-all duration-300 sm:h-24 sm:w-24 md:h-32 md:w-32 ${
                      active
                        ? "scale-110 border-yellow-400 shadow-[0_0_45px_rgba(250,204,21,.65)]"
                        : "border-white/10 hover:border-yellow-500 hover:scale-105"
                    }`}
                  />

                  <h3
                    className="mt-4 text-white"
                    style={{
                      fontFamily: '"Times New Roman", serif',
                      fontSize: "clamp(.9rem,2vw,1.1rem)",
                    }}
                  >
                    {c.character}
                  </h3>

                  <p className="mt-2 text-xs text-gray-400 sm:text-sm">
                    {Number(c.mentions).toLocaleString()} mentions
                  </p>

                </div>

              </button>

            );

          })}

        </div>

      </div>

    </section>
  );
}