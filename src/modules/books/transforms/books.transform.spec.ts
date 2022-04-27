import { Book } from '@/modules/books/schemas/book.schema';
import { booksTransform, bookTransform } from './books.transform';

const makeBook = (): Book => {
  return {
    _id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    author: 'any_author',
    status: 'any_status',
    url: 'any_url',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

describe('booksTransform', () => {
  it('should transform book to output', () => {
    const book: Book = makeBook();

    const actual = bookTransform(book);

    expect(actual._id).toBe(book._id);
    expect(actual.name).toBe(book.name);
    expect(actual.description).toBe(book.description);
    expect(actual.author).toBe(book.author);
    expect(actual.status).toBe(book.status);
    expect(actual.url).toBe(book.url);
    expect(actual.createdAt).toStrictEqual(book.createdAt);
    expect(actual.updatedAt).toStrictEqual(book.updatedAt);
  });

  it('should transform books to output', () => {
    const books: Book[] = [makeBook()];

    const actual = booksTransform(books);

    expect(actual.length).toBe(1);
    expect(actual[0]._id).toBe(books[0]._id);
    expect(actual[0].name).toBe(books[0].name);
    expect(actual[0].description).toBe(books[0].description);
    expect(actual[0].author).toBe(books[0].author);
    expect(actual[0].status).toBe(books[0].status);
    expect(actual[0].url).toBe(books[0].url);
    expect(actual[0].createdAt).toStrictEqual(books[0].createdAt);
    expect(actual[0].updatedAt).toStrictEqual(books[0].updatedAt);
  });
});
