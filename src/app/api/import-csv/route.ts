import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import csvParser from 'csv-parser';
import fs from 'fs';
import { NextApiRequest } from 'next';
import { Readable, Transform } from 'stream';
import { CsvRowData, CsvRowValidate } from '@/domains/csv/validate';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

class Base64StringReadStream extends Readable {
  buffer: Buffer;
  offset: number;
  chunkSize?: number;

  constructor(base64String: string, chunkSize?: number) {
    super();

    this.buffer = Buffer.from(base64String, 'base64');
    this.offset = 0;
    this.chunkSize = chunkSize;
  }

  _read(size: number) {
    if (this.offset >= this.buffer.length) return this.push(null);

    const chunk = this.buffer.subarray(
      this.offset,
      this.offset + (this.chunkSize || size)
    );

    this.buffer = this.buffer.subarray(this.chunkSize || size);

    this.push(chunk);

    this.offset += this.chunkSize || size;
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handler(req);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error['message' || ''],
    });
  }
}

const handler = async (req: NextRequest) => {
  try {
    const base64String = (await req.formData()).get('file') as string;

    const readableStream = new Base64StringReadStream(base64String);

    const data = await new Promise((resolve, reject) => {
      const results: CsvRowData[] = [];
      let rowCount = 0;

      readableStream
        .pipe(csvParser())
        .on('data', async (row: CsvRowData) => {
          if (rowCount === 0) {
            rowCount++;
            return;
          }

          const csvRow = plainToClass(CsvRowValidate, row);

          const errors: ValidationError[] = await validate(csvRow);

          if (errors.length > 0) {
            console.log(JSON.stringify(row, null, 1));
            console.error('Validation Errors for Row:', row);
            console.error(errors);
          }

          console.log('------------------------');
          console.log('csvRow', csvRow);
          console.log('------------------------');

          results.push(csvRow);
          rowCount++;
        })
        .on('end', () => {
          console.log('------------------------');
          console.log('end');
          console.log('------------------------');
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    console.log('------------------------');
    console.log('data', data);
    console.log('------------------------');

    return NextResponse.json(
      { success: true, data: { data } },
      { status: 200 }
    );
  } catch (error) {
    throw error;
  }
};
