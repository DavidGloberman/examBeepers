var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { getAllBeepers, createNewBeeper, getBeeperById, deleteBeeperById, updateStatus, getBeepersByStatusService, } from "../services/beeperService.js";
export const getBeepers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getAllBeepers();
        res.status(200).send(beepers);
    }
    catch (error) {
        next(error);
    }
});
export const createBeeper = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        if (!name) {
            throw new ErrorWithStatusCode("name required", 400);
        }
        const beeper = yield createNewBeeper(name);
        res.status(201).send(beeper);
    }
    catch (error) {
        next(error);
    }
});
export const getBeeperDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            throw new ErrorWithStatusCode("beeper id required", 400);
        }
        const beeper = yield getBeeperById(beeperId);
        res.status(200).send(beeper);
    }
    catch (error) {
        next(error);
    }
});
export const deleteBeeper = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            throw new ErrorWithStatusCode("beeper id required", 400);
        }
        yield deleteBeeperById(beeperId);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
export const updateStatusBeeper = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            throw new ErrorWithStatusCode("beeper id required", 400);
        }
        const LAT = Number(req.body.latitude);
        const LON = Number(req.body.longitude);
        console.log(LON, LAT);
        const beeper = yield updateStatus(beeperId, LON, LAT);
        res.status(200).send(beeper);
    }
    catch (error) {
        next(error);
    }
});
export const getBeepersByStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        const filteredBeepers = yield getBeepersByStatusService(status);
        res.status(200).send(filteredBeepers);
    }
    catch (error) {
        next(error);
    }
});
