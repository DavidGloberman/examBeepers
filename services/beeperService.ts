import { Beeper, Status } from "../models/types.js";
import { readJsonFile, writeToJsonFile } from "../DAL/beeperJson.js";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { v4 as uuidv4 } from "uuid";

export const getAllBeepers = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await readJsonFile();
  return beepers;
};

export const createNewBeeper = async (name: string): Promise<Beeper> => {
  const beepers: Beeper[] = await readJsonFile();
  const newBeeper: Beeper = {
    id: uuidv4(),
    name: name,
    status: Status.MANUFACTURED,
    created_at: new Date(),
    detonated_at: new Date(),
    latitude: 0,
    longitude: 0,
  };

  beepers.push(newBeeper);
  await writeToJsonFile(beepers);
  return newBeeper;
};

export const getBeeperById = async (beeperId: string): Promise<Beeper> => {
  const beepers: Beeper[] = await readJsonFile();
  const beeper: Beeper = beepers.find((beeper) => beeper.id == beeperId)!;
  if (!beeper) {
    throw new ErrorWithStatusCode("beeper not found", 404);
  }
  return beeper;
};

export const deleteBeeperById = async (beeperId: string): Promise<void> => {
  const beepers: Beeper[] = await readJsonFile();
  const index = beepers.findIndex((beeper) => beeper.id == beeperId);
  if (index == -1) {
    throw new ErrorWithStatusCode("beeper not found", 404);
  }
  beepers.splice(index, 1);
  await writeToJsonFile(beepers);
};

export const getStatusById = async (beeperId: string): Promise<Status> => {
  const beepers: Beeper[] = await readJsonFile();
  const beeper: Beeper = beepers.find((beeper) => beeper.id == beeperId)!;
  if (!beeper) {
    throw new ErrorWithStatusCode("beeper not found", 404);
  }
  return beeper.status;
};

export const updateStatus = async (
  beeperId: string,
  LON: Number,
  LAT: Number
): Promise<Beeper> => {
  const beepers: Beeper[] = await readJsonFile();
  const beeper: Beeper = beepers.find((beeper) => beeper.id == beeperId)!;
  if (!beeper) {
    throw new ErrorWithStatusCode("beeper not found", 404);
  }
  beeper.status = Status.SHIPPED;
  beeper.detonated_at = new Date();
  beeper.latitude = LON;
  beeper.longitude = LAT;
  await writeToJsonFile(beepers);
  return beeper;
};
