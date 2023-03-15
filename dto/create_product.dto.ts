import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateProductDto {

  @IsOptional()
  vendor: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  short_description: string;

  @IsNotEmpty()
  @IsString()
  barcode: string;

  @IsOptional()
  category: { id: number };

  @IsNotEmpty()
  @IsDateString()
  manufactured_date: string;

  @IsNotEmpty()
  @IsDateString()
  expired_date: Date;

  @IsNotEmpty()
  @IsDateString()
  received_date: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  country: number;

  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  trade_price: number;

  @IsOptional()
  created: Date;

  @IsOptional()
  updated: Date;

  @IsOptional()
  deleted: boolean;
}