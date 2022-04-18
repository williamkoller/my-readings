import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '@/modules/books/schemas/book.schema';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';
import { UpdateBookDto } from '@/modules/books/dtos/update-book.dto';
import { propertyFalseMongo } from '@/utils/property-false-mongo';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async add(addBookDto: AddBookDto): Promise<Book> {
    const bookCreated = new this.bookModel(addBookDto, propertyFalseMongo);
    return bookCreated.save();
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find({}, propertyFalseMongo);
  }

  async findByName(name: string): Promise<Book> {
    return await this.bookModel.findOne({ name }, propertyFalseMongo);
  }

  async update(_id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.bookModel.findOneAndUpdate(
      { _id },
      { $set: updateBookDto },
      {
        new: true,
        propertyFalseMongo,
      },
    );
  }

  async findById(_id: string): Promise<Book> {
    return await this.bookModel.findOne({ _id }, propertyFalseMongo);
  }

  async delete(_id: string): Promise<void> {
    await this.bookModel.deleteOne({ _id });
  }

  async countBooks(offset: number, limit: number): Promise<any> {
    return await this.bookModel.find().skip(offset).limit(limit);
  }
}
