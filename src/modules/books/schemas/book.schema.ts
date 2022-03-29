import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
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
}

export const BookSchema = SchemaFactory.createForClass(Book);
