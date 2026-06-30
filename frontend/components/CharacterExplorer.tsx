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
    <section className="rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-sm p-10">

      <div className="mb-10 text-center">

        <p className="text-lg font-semibold uppercase tracking-[0.4em] text-yellow-400">
          Characters
        </p>

        <h2
          className="mt-3 text-white"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: "3.2rem",
          }}
        >
          Explore Characters
        </h2>

        <p className="mt-4 text-lg text-gray-400">
          Browse every character discovered from YouTube discussions.
        </p>

        <p className="mt-4 text-gray-500">
          {characters.length} Characters Analysed
        </p>

      </div>

      <div className="overflow-x-auto overflow-y-visible scrollbar-hide py-8">

        <div className="flex w-max gap-12 px-8">

          {characters.map((c) => {

            const active = selectedCharacter === c.character;

            return (

              <button
                key={c.character}
                onClick={() =>
                  onSelect(
                    c.character,
                    Number(c.mentions)
                  )
                }
                className="flex-shrink-0 overflow-visible"
              >

                <div className="w-36 text-center overflow-visible">

                  <img
                    src={`/characters/${c.character.toLowerCase()}.jpg`}
                    alt={c.character}
                    className={`mx-auto h-32 w-32 rounded-full object-cover border-2 transition-all duration-300 ${
                      active
                        ? "scale-110 border-yellow-400 shadow-[0_0_45px_rgba(250,204,21,.65)]"
                        : "border-white/10 hover:border-yellow-500 hover:scale-105"
                    }`}
                  />

                  <h3
                    className="mt-5 text-white"
                    style={{
                      fontFamily: '"Times New Roman", serif',
                      fontSize: "1.1rem",
                    }}
                  >
                    {c.character}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
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