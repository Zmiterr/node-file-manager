import fs from 'fs';
import crypto from 'crypto';

export const calculateFileHash = (filePath) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            const result = hash.digest('hex');
            console.log(`Hash of the file: ${result}`);
            resolve(result);
        });

        stream.on('error', (error) => {
            console.log('Operation failed');
            reject(error);
        });
    });
};
