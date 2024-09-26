import jsonfile from "jsonfile";
import { Beeper } from "../models/types.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const FILE_PATH: string = process.env.FILE_PATH || "./data/DB.json";

async function ensureJsonFileExists() {
  if (!fs.existsSync(FILE_PATH)) {
    await jsonfile.writeFile(FILE_PATH, []);
  }
}

export const readJsonFile = async (): Promise<Beeper[]> => {
  await ensureJsonFileExists();
  return await jsonfile.readFile(FILE_PATH);
};

export const writeToJsonFile = async (beepers: Beeper[]): Promise<void> => {
  await ensureJsonFileExists();
  await jsonfile.writeFile(FILE_PATH, beepers);
};
