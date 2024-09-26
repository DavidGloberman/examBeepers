import { Request, Response, NextFunction } from "express";
import {
  getBooks,
  addBook,
  editBook,
  deleteBook,
} from "../services/BookService.js";
import { Book } from "../models/types.js";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";

export const getBooksFromUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.query.userId) {
      throw new ErrorWithStatusCode("userId required", 400);
    }
    const userId: string = req.query.userId.toString();

    res.status(200).send(await getBooks(userId));
  } catch (error) {
    next(error);
  }
};

export const addBookToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = req.body.userId;
    const bookName: string = req.body.bookName;
    if (!bookName) {
      throw new ErrorWithStatusCode("book name required", 400);
    }

    const addedBook = await addBook(userId, bookName);
    res.status(201).send({ bookId: addedBook.id, book: addedBook });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = req.body.userId;
    const bookId: number = Number(req.params.bookId);
    const updateData: Book = req.body.updateData;

    if (!bookId) {
      throw new ErrorWithStatusCode("book id required", 400);
    }
    if (!updateData) {
      throw new ErrorWithStatusCode("update data required", 400);
    }
    await editBook(userId, bookId, updateData);
    res.status(204).send("Book updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteBookFromUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = req.body.userId;
    const bookId: number = Number(req.params.bookId);
    if (!bookId) {
      throw new ErrorWithStatusCode("book id required", 400);
    }

    await deleteBook(userId, bookId);
    res.status(204).send("Book deleted successfully");
  } catch (error) {
    next(error);
  }
};
