import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { CsvRowData } from '../types/rowData';

export class CsvRowValidate implements CsvRowData {
  @IsString({ message: 'Must be string.' })
  @IsNotEmpty({ message: 'Must be not empty.' })
  name: string;

  @IsString({ message: 'Must be string.' })
  @IsNotEmpty({ message: 'Must be not empty.' })
  image_path: string;

  @IsNumberString({}, { message: 'Must be number.' })
  point: number;

  start_date: string;

  end_date: string;
}
