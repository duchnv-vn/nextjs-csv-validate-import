const fs = require('fs');

const header_1 = 'name,image_path,point,start_date,end_date';
const header_2 = 'NAME,IMAGE PATH,POINT,START DATE,END DATE';
const sample_data =
  'Product {index},https://storage.cloud.google.com/test/image_{index}.png,{index},2024-01-01 00:00:00,2024-01-31 00:00:00';

const eol = '\n';
const file_name = 'test.csv';

const writeFile = fs.createWriteStream(file_name);

writeFile.write(`${header_1}${eol}`);
writeFile.write(`${header_2}${eol}`);

for (let i = 0; i <= 1000; i++) {
  const row = sample_data.replace(/{index}/g, i);

  writeFile.write(`${row}${eol}`);
}

writeFile.end();
