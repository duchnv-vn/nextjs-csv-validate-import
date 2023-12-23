import { ValidationError } from 'class-validator';
import { ErrorTarget } from '../types/errorData';

export const generateErrors = (
  errors: ValidationError[],
  rowNumber: number
): ErrorTarget[] => {
  const targetErrors: ErrorTarget[] = errors.map((error) => ({
    rowNumber,
    columnName: error.property,
    value: error.value,
    messages: Object.values(error.constraints),
  }));

  return targetErrors;
};
