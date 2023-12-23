import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { Row } from 'neat-csv';
import { CsvRowValidate } from '../validatePattern/rowValidate';
import { generateErrors } from './emitError';
import { CsvRowData } from '../types/rowData';

export const validateRows = async (rawData: Row[]) => {
  try {
    const data: CsvRowData[] = [];
    let dataRowNumber = 3; // data row starts from row number 3

    for (const row of rawData.slice(1)) {
      const csvRow = plainToClass(CsvRowValidate, row);

      const errors: ValidationError[] = await validate(csvRow);

      if (errors.length > 0) {
        return { errors: generateErrors(errors, dataRowNumber) };
      }

      data.push(csvRow);
      dataRowNumber++;
    }

    return { data };
  } catch (error) {
    throw error;
  }
};
