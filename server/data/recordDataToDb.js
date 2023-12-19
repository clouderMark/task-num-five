import { createReadStream } from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { FemaleName, MaleName, Surname } from '../models/mapping';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let i = 0;

const recordDataToDb = async () => {
  const filePath = path.join(__dirname, '../data/cities.txt');
  const fileStream = createReadStream(filePath);

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    try {
      await City.create({ name: line, index: i });
      i++;
    } catch (e) {
      console.log(e);
    }
  }
};
