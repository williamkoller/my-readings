import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '@/modules/books/schemas/book.schema';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async add(addBookDto: AddBookDto): Promise<Book> {
    const bookCreated = new this.bookModel(addBookDto);
    return bookCreated.save();
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find({}, { __v: false });
  }
}
