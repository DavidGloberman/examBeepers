import { Request, Response, NextFunction } from "express";
import { Beeper, BeeperDTO, Status } from "../models/types.js";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import {
  getAllBeepers,
  createNewBeeper,
  getBeeperById,
  deleteBeeperById,
  updateStatus,
  getBeepersByStatusService,
} from "../services/beeperService.js";

const normalizeStatusDisplay = (...beepers: Beeper[]): BeeperDTO[] => {
  return beepers.map((beeper: Beeper): BeeperDTO => {
    const res: any = { ...beeper };
    res.status = Status[beeper.status] as string;
    return res as BeeperDTO;
  });
};

export const getBeepers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const beepers: Beeper[] = await getAllBeepers();

    res.status(200).send(normalizeStatusDisplay(...beepers));
  } catch (error) {
    next(error);
  }
};

export const createBeeper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const name: string = req.body.name;
    if (!name) {
      throw new ErrorWithStatusCode("name required", 400);
    }
    const beeper: Beeper = await createNewBeeper(name);
    res.status(201).send(...normalizeStatusDisplay(beeper));
  } catch (error) {
    next(error);
  }
};

export const getBeeperDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const beeperId: string = req.params.id;
    if (!beeperId) {
      throw new ErrorWithStatusCode("beeper id required", 400);
    }
    const beeper: Beeper = await getBeeperById(beeperId);

    res.status(200).send(...normalizeStatusDisplay(beeper));
  } catch (error) {
    next(error);
  }
};

export const deleteBeeper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const beeperId: string = req.params.id;
    if (!beeperId) {
      throw new ErrorWithStatusCode("beeper id required", 400);
    }
    await deleteBeeperById(beeperId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateStatusBeeper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const beeperId: string = req.params.id;
    if (!beeperId) {
      throw new ErrorWithStatusCode("beeper id required", 400);
    }
    const LAT: number = Number(req.body.latitude);
    const LON: number = Number(req.body.longitude);

    const beeper: Beeper = await updateStatus(beeperId, LON, LAT);

    res.status(200).send(...normalizeStatusDisplay(beeper));
  } catch (error) {
    next(error);
  }
};

export const getBeepersByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const status: string = req.params.status;

    const filteredBeepers: Beeper[] = await getBeepersByStatusService(status);

    res.status(200).send(normalizeStatusDisplay(...filteredBeepers));
  } catch (error) {
    next(error);
  }
};
