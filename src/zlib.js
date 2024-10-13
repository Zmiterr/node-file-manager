import fs from 'fs';
import zlib from 'zlib';

export const compressFile = (sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        const source = fs.createReadStream(sourcePath);
        const destination = fs.createWriteStream(destinationPath);
        const brotli = zlib.createBrotliCompress();

        source.pipe(brotli).pipe(destination);

        destination.on('finish', () => {
            console.log(`File compressed successfully: ${destinationPath}`);
            resolve();
        });

        destination.on('error', (error) => {
            console.log('Operation failed');
            reject(error);
        });
    });
};

export const decompressFile = (sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        const source = fs.createReadStream(sourcePath);
        const destination = fs.createWriteStream(destinationPath);
        const brotli = zlib.createBrotliDecompress();

        source.pipe(brotli).pipe(destination);

        destination.on('finish', () => {
            console.log(`File decompressed successfully: ${destinationPath}`);
            resolve();
        });

        destination.on('error', (error) => {
            console.log('Operation failed');
            reject(error);
        });
    });
};
