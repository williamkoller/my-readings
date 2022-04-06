import { Book } from '@/modules/books/schemas/book.schema';
import { BookOutputType } from '@/modules/books/types/book-output.type';

export const booksTransform = (books: Book[]): BookOutputType[] => {
  return books.map((book) => ({
    id: book._id,
    name: book.name,
    description: book.description,
    author: book.author,
    status: book.status,
    url: book.url,
    createdAt: book.updatedAt,
    updatedAt: book.updatedAt,
  }));
};

export const bookTransform = (book: Book): BookOutputType => {
  return {
    id: book._id,
    name: book.name,
    description: book.description,
    author: book.author,
    status: book.status,
    url: book.url,
    createdAt: book.updatedAt,
    updatedAt: book.updatedAt,
  };
};
