import { NextRequest, NextResponse } from 'next/server';
import { parseCsv } from '@/domains/csv/functions/parseCsv';
import { validateRows } from '@/domains/csv/functions/validate';

export async function POST(req: NextRequest) {
  try {
    const { status, ...props } = await handler(req);

    return NextResponse.json({ success: status === 200, ...props }, { status });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error['message' || ''],
      },
      { status: 500 }
    );
  }
}

const handler = async (req: NextRequest) => {
  try {
    const base64String = (await req.formData()).get('file') as string;

    const rawData = await parseCsv(base64String);

    const result = await validateRows(rawData);

    return { ...result, status: !result.errors ? 200 : 400 };
  } catch (error) {
    throw error;
  }
};
