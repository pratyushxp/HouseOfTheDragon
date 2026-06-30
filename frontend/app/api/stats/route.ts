import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

type Character = {
  character: string;
  mentions: string;
};

type Relationship = {
  source: string;
  target: string;
  strength: string;
};

function readCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "..", "data");

    const characters = await readCSV<Character>(
      path.join(dataDir, "character_profiles.csv")
    );

    const relationships = await readCSV<Relationship>(
      path.join(dataDir, "character_relationships.csv")
    );

    const commentsPath = path.join(dataDir, "hotd_comments.csv");

    const comments = await new Promise<number>((resolve, reject) => {
      let count = 0;

      fs.createReadStream(commentsPath)
        .pipe(csv())
        .on("data", () => count++)
        .on("end", () => resolve(count))
        .on("error", reject);
    });

    let topCharacter = "";
    let maxMentions = -1;

    for (const row of characters) {
      const mentions = Number(row.mentions);

      if (mentions > maxMentions) {
        maxMentions = mentions;
        topCharacter = row.character;
      }
    }

    return NextResponse.json({
      characters: characters.length,
      comments,
      relationships: relationships.length,
      topCharacter,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed to load dataset",
      },
      {
        status: 500,
      }
    );
  }
}