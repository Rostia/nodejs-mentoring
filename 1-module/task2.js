import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

const readStream = fs.createReadStream(path.join(__dirname, '/csv', '/nodejs-hw1-ex1.csv'));
const writeStream= fs.createWriteStream(path.join(__dirname, '/txt', '/nodejs-hw1-ex1.txt'));

readStream.pipe(csv()).pipe(writeStream);

readStream.on('error', (err) => {
  console.log('Error in read stream... \n');
  console.log(err);
});
writeStream.on('error', (err) => {
  console.log('Error in write stream... \n');
  console.log(err);
});