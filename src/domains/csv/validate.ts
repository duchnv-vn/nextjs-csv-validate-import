import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export interface CsvRowData {
  name: string;
  image_path: string;
  point: number;
  start_date: string;
  end_date: string;
}

export class CsvRowValidate {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image_path: string;

  @IsNumberString()
  point: number;

  // @IsDateString()
  start_date: string;

  // @IsDateString()
  end_date: string;
}
