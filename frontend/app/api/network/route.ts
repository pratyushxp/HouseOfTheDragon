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
    const rows: T[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

export async function GET() {
  const dataDir = path.join(process.cwd(), "..", "data");

  const characters = await readCSV<Character>(
    path.join(dataDir, "character_profiles.csv")
  );

  const relationships = await readCSV<Relationship>(
    path.join(dataDir, "character_relationships.csv")
  );

  const nodes = characters.map((c) => ({
    id: c.character,
    position: { x: 0, y: 0 },
    data: {
      label: c.character,
      mentions: Number(c.mentions),
    },
  }));

  const edges = relationships.map((r, index) => ({
    id: `e${index}`,
    source: r.source,
    target: r.target,
    strength: Number(r.strength),
    label: r.strength,
  }));

  return NextResponse.json({
    nodes,
    edges,
  });
}