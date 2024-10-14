import { cwd } from 'node:process';
import {getArchitecture, getCPUsInfo, getEOL, getHomeDirectory, getSystemUsername} from "./os.js";
import {calculateFileHash} from "./calculateFileHash.js";
import {compressFile, decompressFile} from "./zlib.js";
import {
    addFile,
    changeDirectory,
    copyFileToDestination, goUp,
    listDirectory,
    moveFile,
    readFile, removeFile,
    renameFile
} from "./fileSystem.js";




export const handleCommand = async (input) => {
    const [command, ...args] = input.split(' ');
    switch (command) {

        case '.exit':
            rl.close();
            break;
        case 'up':
            goUp();
            break;
        case 'cd':
            if (args[0]) {
                changeDirectory(args[0]);
            } else {
                console.log('Invalid input');
            }
            break;
        case 'ls':
            await listDirectory();
            break;
        case 'cat':
            if (args[0]) {
                await readFile(args[0]);
            } else {
                console.log('Invalid input');
            }
            break;
        case 'add':
            if (args[0]) {
                await addFile(args[0]);
            } else {
                console.log('Invalid input');
            }
            break;
        case 'rn':
            if (args[0] && args[1]) {
                await renameFile(args[0], args[1]);
            } else {
                console.log('Invalid input');
            }
            break;
        case 'cp':
            if (args[0] && args[1]) {
                await copyFileToDestination(args[0], args[1]);
            } else {
                console.log('Invalid input');
            }
            break;
        case 'mv':
            if (args[0] && args[1]) {
                await moveFile(args[0], args[1]);
            } else {
                console.log('Invalid input');
            }
            break;
        case 'rm':
            if (args[0]) {
                await removeFile(args[0]);
            } else {
                console.log('Invalid input');
            }
            break;
        case 'os':
            switch (args[0]) {
                case '--EOL':
                    getEOL();
                    break;
                case '--cpus':
                    getCPUsInfo();
                    break;
                case '--homedir':
                    getHomeDirectory();
                    break;
                case '--username':
                    getSystemUsername();
                    break;
                case '--architecture':
                    getArchitecture();
                    break;
                default:
                    console.log('Invalid input');
            }
            break;

        case 'hash':
            if (args[0]) {
                try {
                    await calculateFileHash(args[0]);
                } catch {
                    console.log('Operation failed');
                }
            } else {
                console.log('Invalid input');
            }
            break;
        case 'compress':
            if (args[0] && args[1]) {
                const destination = args[1].endsWith('.br') ? args[1] : `${args[1]}.br`;
                try {
                    await compressFile(args[0], destination);
                } catch {
                    console.log('Operation failed');
                }
            } else {
                console.log('Invalid input. Usage: compress <path_to_file>');
            }
            break;
        case 'decompress':
            if (args[0] && args[1]) {
                try {
                    await decompressFile(args[0], args[1]);
                } catch {
                    console.log('Operation failed');
                }
            } else {
                console.log('Invalid input. Usage: decompress <path_to_file>');
            }
            break;
        default:
            console.log('Invalid input');
    }
    console.log(`You are currently in ${cwd()}`);
};
