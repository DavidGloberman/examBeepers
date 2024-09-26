import { Book, User } from "../models/types.js";
import { readFromJsonFile, writeToJsonFile } from "../DAL/beeperJson.js";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import axios, { AxiosResponse } from "axios";

const getUserById = async (
  userId: string
): Promise<{ users: User[]; user: User }> => {
  const usersList: User[] = await readFromJsonFile();
  const user1: User = usersList.find((user) => user.id == userId)!;
  return { users: usersList, user: user1 };
};

export const getBooks = async (userId: string): Promise<Book[]> => {
  const { user }: { user: User } = await getUserById(userId);
  return user.books;
};

export const addBook = async (
  userId: string,
  bookName: string
): Promise<Book> => {
  const { users, user }: { users: User[]; user: User } = await getUserById(
    userId
  );

  const response: AxiosResponse = await axios.get(
    `https://freetestapi.com/api/v1/books?search=${bookName}`
  );

  const book: Book = response.data[0] as Book;
  if (!book) {
    throw new ErrorWithStatusCode("Book not found", 404);
  }

  user.books.push(book);
  await writeToJsonFile(users);
  return book;
};

export const editBook = async (
  userId: string,
  bookId: number,
  updateData: Book
): Promise<void> => {
  if (!updateData.id) {
    throw new ErrorWithStatusCode("Book id required", 400);
  }
  if (Number(updateData.id) != bookId) {
    throw new ErrorWithStatusCode("Book id does not match", 400);
  }

  const { users, user }: { users: User[]; user: User } = await getUserById(
    userId
  );
  const book: Book | undefined = user.books.find(
    (book) => Number(book.id) == bookId
  );

  if (!book) {
    throw new ErrorWithStatusCode("Book not found", 404);
  }
  book.author = updateData.author || book.author;
  book.publication_year = updateData.publication_year || book.publication_year;
  book.genre = updateData.genre || book.genre;
  book.description = updateData.description || book.description;
  book.cover_image = updateData.cover_image || book.cover_image;

  await writeToJsonFile(users);
};

export const deleteBook = async (userId: string, bookId: number) => {
  const { users, user }: { users: User[]; user: User } = await getUserById(
    userId
  );

  const bookIndex: number = user.books.findIndex(
    (book) => Number(book.id) == bookId
  );
  if (bookIndex == -1) {
    throw new ErrorWithStatusCode("Book not found", 404);
  }

  user.books.splice(bookIndex, 1);

  await writeToJsonFile(users);
};
