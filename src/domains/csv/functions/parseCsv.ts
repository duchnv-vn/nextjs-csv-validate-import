import neatCsv from 'neat-csv';

export const parseCsv = async (base64Str: string) => {
  try {
    const rawData = await neatCsv(Buffer.from(base64Str, 'base64'));

    return rawData;
  } catch (error) {
    throw error;
  }
};
