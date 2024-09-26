import { Beeper, Status } from "../models/types.js";
import { readJsonFile, writeToJsonFile } from "../DAL/beeperJson.js";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { coordinates } from "../data/coordinates.js";
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

function validateCoordinates(LON: Number, LAT: Number) {
  if (!LON || !LAT) {
    throw new ErrorWithStatusCode("longitude and latitude required", 400);
  }
  if (
    !coordinates.find(
      (coordinate) => coordinate.lat == LAT && coordinate.lon == LON
    )
  ) {
    throw new ErrorWithStatusCode("invalid coordinates", 400);
  }
}

function setTargetAndDetonationTime(beeper: Beeper, LON: Number, LAT: Number) {
  beeper.latitude = LON;
  beeper.longitude = LAT;

  setTimeout(async () => {
    beeper.status = Status.DETONATED;
    beeper.detonated_at = new Date();

    const beepers: Beeper[] = await readJsonFile();
    const beeperIndex = beepers.findIndex((b) => b.id == beeper.id);
    beepers[beeperIndex] = beeper;
    await writeToJsonFile(beepers);
  }, 10000);
}

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

  const status: Status = beeper.status;

  // bed request if status is detonated or deployed
  if (status == Status.DETONATED || status == Status.DEPLOYED) {
    throw new ErrorWithStatusCode("bed request for this status", 400);
  }

  // set Beeper if status is shipped
  if (status == Status.SHIPPED) {
    validateCoordinates(LON, LAT);
    setTargetAndDetonationTime(beeper, LON, LAT);
  }

  // increment status
  beeper.status++;

  await writeToJsonFile(beepers);
  return beeper;
};

export const getBeepersByStatusService = async (
  status: string
): Promise<Beeper[]> => {
  if (!status) {
    throw new ErrorWithStatusCode("status required", 400);
  }

  if (!Object.keys(Status).includes(status)) {
    throw new ErrorWithStatusCode("invalid status", 400);
  }

  const beepers: Beeper[] = await getAllBeepers();
  const filteredBeepers: Beeper[] = beepers.filter(
    (beeper) => Status[beeper.status] == status
  );

  return filteredBeepers;
};
