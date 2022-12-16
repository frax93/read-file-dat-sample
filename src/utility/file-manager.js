import fs from 'fs';
import readline from 'readline';

export class FileManager {
  constructor(path = '') {
    this.path = path;
    this.readStream = fs.createReadStream(path);
    this.lineReader = readline.createInterface({
      input: this.readStream,
      crlfDelay: Infinity
    });
  }

  readFilePromise(hasHeader = false) {
    return new Promise((resolve, reject) => {
      const data = [];

      let header = [];

      this.lineReader.on('line', (line) => {
        const lines = line.toString().trim().split(' ');

        const parsedLines = lines.filter(line => !!line);

        if (hasHeader && header.length === 0) {
          header = parsedLines;
          return;
        }

        data.push(parsedLines);

      }).on('close', () => {    
        resolve({ data, header });
      }).on('error', (error) => {
        reject(error);
      });

      // The promise rejection on error
      this.readStream.on('error', (error) => {
        reject(error);
      });
    });
  }
}