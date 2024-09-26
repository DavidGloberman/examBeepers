import express, { Router } from "express";
import {
  getBooksFromUser,
  addBookToUser,
  updateBook,
  deleteBookFromUser,
} from "../controllers/bookController.js";

const router: Router = express.Router();

router.route("/").get(getBooksFromUser).post(addBookToUser);

router.route("/:Id").get(updateBook).delete(deleteBookFromUser);

router.route("/:id/status").get();

router.route("/status/:status").get();

export default router;
