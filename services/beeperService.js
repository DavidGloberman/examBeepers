var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Status } from "../models/types.js";
import { readJsonFile, writeToJsonFile } from "../DAL/beeperJson.js";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { coordinates } from "../data/coordinates.js";
import { v4 as uuidv4 } from "uuid";
export const getAllBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readJsonFile();
    return beepers;
});
export const createNewBeeper = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readJsonFile();
    const newBeeper = {
        id: uuidv4(),
        name: name,
        status: Status.MANUFACTURED,
        created_at: new Date(),
    };
    beepers.push(newBeeper);
    yield writeToJsonFile(beepers);
    return newBeeper;
});
export const getBeeperById = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readJsonFile();
    const beeper = beepers.find((beeper) => beeper.id == beeperId);
    if (!beeper) {
        throw new ErrorWithStatusCode("beeper not found", 404);
    }
    return beeper;
});
export const deleteBeeperById = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readJsonFile();
    const index = beepers.findIndex((beeper) => beeper.id == beeperId);
    if (index == -1) {
        throw new ErrorWithStatusCode("beeper not found", 404);
    }
    beepers.splice(index, 1);
    yield writeToJsonFile(beepers);
});
function validateCoordinates(LON, LAT) {
    if (!LON || !LAT) {
        throw new ErrorWithStatusCode("longitude and latitude required", 400);
    }
    if (!coordinates.find((coordinate) => coordinate.lat == LAT && coordinate.lon == LON)) {
        throw new ErrorWithStatusCode("invalid coordinates", 400);
    }
}
function setTargetAndDetonationTime(beeper, LON, LAT) {
    beeper.latitude = LON;
    beeper.longitude = LAT;
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        beeper.status = Status.DETONATED;
        beeper.detonated_at = new Date();
        const beepers = yield readJsonFile();
        const beeperIndex = beepers.findIndex((b) => b.id == beeper.id);
        beepers[beeperIndex] = beeper;
        yield writeToJsonFile(beepers);
    }), 10000);
}
export const updateStatus = (beeperId, LON, LAT) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readJsonFile();
    const beeper = beepers.find((beeper) => beeper.id == beeperId);
    if (!beeper) {
        throw new ErrorWithStatusCode("beeper not found", 404);
    }
    const status = beeper.status;
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
    yield writeToJsonFile(beepers);
    return beeper;
});
export const getBeepersByStatusService = (status) => __awaiter(void 0, void 0, void 0, function* () {
    if (!status) {
        throw new ErrorWithStatusCode("status required", 400);
    }
    if (!Object.keys(Status).includes(status)) {
        throw new ErrorWithStatusCode("invalid status", 400);
    }
    const beepers = yield getAllBeepers();
    const filteredBeepers = beepers.filter((beeper) => Status[beeper.status] == status);
    return filteredBeepers;
});
