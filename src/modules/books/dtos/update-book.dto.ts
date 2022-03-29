import { IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  url: string;
}
