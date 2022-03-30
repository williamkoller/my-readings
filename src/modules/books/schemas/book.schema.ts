import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: String })
  url: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
