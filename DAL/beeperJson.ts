import jsonfile from "jsonfile";
import { User } from "../models/types.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const FILE_PATH: string = process.env.FILE_PATH || "./data/DB.json";
console.log(process.env.FILE_PATH);

async function ensureJsonFileExists() {
  if (!fs.existsSync(FILE_PATH)) {
    await jsonfile.writeFile(FILE_PATH, []);
  }
}
export const readFromJsonFile = async (): Promise<User[]> => {
  await ensureJsonFileExists();
  return await jsonfile.readFile(FILE_PATH);
};

export const writeToJsonFile = async (users: User[]): Promise<void> => {
  await ensureJsonFileExists();
  await jsonfile.writeFile(FILE_PATH, users);
};
