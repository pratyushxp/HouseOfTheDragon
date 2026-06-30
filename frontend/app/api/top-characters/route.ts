import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

type Character = {
  character: string;
  mentions: string;
};

function readCSV(filePath: string): Promise<Character[]> {
  return new Promise((resolve, reject) => {
    const rows: Character[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "..",
    "data",
    "character_profiles.csv"
  );

  const characters = await readCSV(filePath);

  // Remove dragons
  const dragons = new Set([
    "Vhagar",
    "Caraxes",
    "Sunfyre",
    "Syrax",
    "Arrax",
  ]);

  // Merge aliases
  const aliases: Record<string, string> = {
    Jace: "Jacaerys",
    Luke: "Lucerys",
  };

  const merged = new Map<string, number>();

  for (const row of characters) {
    if (dragons.has(row.character)) continue;

    const name = aliases[row.character] ?? row.character;
    const mentions = Number(row.mentions);

    merged.set(
      name,
      (merged.get(name) ?? 0) + mentions
    );
  }

  const result = Array.from(merged.entries())
    .map(([character, mentions]) => ({
      character,
      mentions: mentions.toString(),
    }))
    .sort(
      (a, b) => Number(b.mentions) - Number(a.mentions)
    );

  return NextResponse.json(result);
}