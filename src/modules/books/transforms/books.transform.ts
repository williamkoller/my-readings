import { Book } from '@/modules/books/schemas/book.schema';
export const booksTransform = (books: Book[]): Book[] => {
  return books.map(bookTransform);
};

export const bookTransform = (book: Book): Book => {
  return {
    _id: book._id,
    name: book.name,
    description: book.description,
    author: book.author,
    status: book.status,
    url: book.url,
    createdAt: book.updatedAt,
    updatedAt: book.updatedAt,
  };
};
