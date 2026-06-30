"use client";

type Props = {
  characters: number;
  comments: number;
  relationships: number;
  topCharacter: string;
};

export default function StatsGrid({
  characters,
  comments,
  relationships,
  topCharacter,
}: Props) {
  const cards = [
    {
      title: "Characters",
      value: characters,
      icon: "👥",
    },
    {
      title: "YouTube Comments",
      value: comments.toLocaleString(),
      icon: "💬",
    },
    {
      title: "Relationships",
      value: relationships,
      icon: "⚔️",
    },
    {
      title: "Most Discussed",
      value: topCharacter,
      icon: "👑",
      highlight: true,
    },
  ];

  return (
    <section className="grid grid-cols-4 gap-6 mt-8">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`rounded-3xl border backdrop-blur-xl p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
            card.highlight
              ? "border-yellow-500/40 bg-yellow-500/10"
              : "border-white/10 bg-white/5"
          }`}
        >

          <div className="flex items-center justify-between">

            <p className="text-gray-400">
              {card.title}
            </p>

            <span className="text-3xl">
              {card.icon}
            </span>

          </div>

          <h2
            className={`mt-6 font-bold ${
              card.highlight
                ? "text-yellow-400 text-4xl"
                : "text-white text-5xl"
            }`}
          >
            {card.value}
          </h2>

        </div>

      ))}

    </section>
  );
}