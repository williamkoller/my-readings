import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@ObjectType()
@Schema()
export class Book {
  @Field()
  _id: string;

  @Field()
  @Prop({ type: String, required: true })
  name: string;

  @Field()
  @Prop({ type: String, required: true })
  description: string;

  @Field()
  @Prop({ type: String, required: true })
  author: string;

  @Field()
  @Prop({ type: String })
  status: string;

  @Field()
  @Prop({ type: String })
  url: string;

  @Field()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Field()
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
