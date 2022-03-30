import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '@/modules/books/schemas/book.schema';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';
import { UpdateBookDto } from '@/modules/books/dtos/update-book.dto';

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

  async findByName(name: string): Promise<Book> {
    return await this.bookModel.findOne({ name }, { __v: false });
  }

  async update(_id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.bookModel.findOneAndUpdate(
      { _id },
      { $set: updateBookDto },
      {
        new: true,
        __v: false,
      },
    );
  }

  async findById(_id: string): Promise<Book> {
    return await this.bookModel.findOne({ _id }, { __v: false });
  }

  async delete(_id: string): Promise<void> {
    await this.bookModel.deleteOne({ _id });
  }
}
