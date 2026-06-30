import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

type Character = {
  character: string;
  mentions: string;
};

function readCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => resolve(results))
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

  const data = await readCSV<Character>(filePath);

  data.sort((a, b) => Number(b.mentions) - Number(a.mentions));

  // Return every extracted character
  return NextResponse.json(data);
}