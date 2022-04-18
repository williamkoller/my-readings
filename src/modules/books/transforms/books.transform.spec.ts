import { Book } from '@/modules/books/schemas/book.schema';
import { booksTransform, bookTransform } from './books.transform';

describe('booksTransform', () => {
  test('should transform book to output', () => {
    const book: Book = {
      _id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      status: 'any_status',
      url: 'any_url',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const actual = bookTransform(book);

    expect(actual.id).toBe(book._id);
    expect(actual.name).toBe(book.name);
    expect(actual.description).toBe(book.description);
    expect(actual.author).toBe(book.author);
    expect(actual.status).toBe(book.status);
    expect(actual.url).toBe(book.url);
    expect(actual.createdAt).toStrictEqual(book.createdAt);
    expect(actual.updatedAt).toStrictEqual(book.updatedAt);
  });

  test('should transform books to output', () => {
    const book: Book = {
      _id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      status: 'any_status',
      url: 'any_url',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const actual = booksTransform([book]);

    expect(actual.length).toBe(1);
    expect(actual[0].id).toBe(book._id);
    expect(actual[0].name).toBe(book.name);
    expect(actual[0].description).toBe(book.description);
    expect(actual[0].author).toBe(book.author);
    expect(actual[0].status).toBe(book.status);
    expect(actual[0].url).toBe(book.url);
    expect(actual[0].createdAt).toStrictEqual(book.createdAt);
    expect(actual[0].updatedAt).toStrictEqual(book.updatedAt);
  });
});
