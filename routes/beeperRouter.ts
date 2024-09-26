import express, { Router } from "express";
import {
  getBeepers,
  createBeeper,
  getBeeperDetail,
  deleteBeeper,
  updateStatusBeeper,
  getBeeperByStatus,
} from "../controllers/beeperController.js";

const router: Router = express.Router();

router.route("/").get(getBeepers).post(createBeeper);

router.route("/:Id").get(getBeeperDetail).delete(deleteBeeper);

router.route("/:id/status").put(updateStatusBeeper);

router.route("/status/:status").get(getBeeperByStatus);

export default router;
