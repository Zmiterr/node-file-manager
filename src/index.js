import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { chdir, cwd } from 'process';
import { readdir, rename, copyFile, unlink, readFile as fsReadFile } from 'fs/promises';
import os from 'os';
import readline from 'readline';
import {getArchitecture, getCPUsInfo, getEOL, getHomeDirectory, getSystemUsername} from "./os.js";
import {calculateFileHash} from "./calculateFileHash.js";
import {compressFile, decompressFile} from "./zlib.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const username = process.argv.find(arg => arg.startsWith('--username='))?.split('=')[1] || 'noName';


console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${cwd()}`);

chdir(os.homedir());

const handleCommand = async (input) => {
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
                console.log('Invalid input');
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
                console.log('Invalid input');
            }
            break;
        default:
            console.log('Invalid input');
    }
    console.log(`You are currently in ${cwd()}`);
};

function goUp() {
    const currentDir = cwd();
    const parentDir = dirname(currentDir);
    if (currentDir !== parentDir) {
        chdir(parentDir);
    }
}

function changeDirectory(newPath) {
    try {
        const resolvedPath = resolve(cwd(), newPath);
        chdir(resolvedPath);
    } catch (err) {
        console.log('Operation failed');
    }
}

async function listDirectory() {
    try {
        const files = await readdir(cwd(), { withFileTypes: true });
        const folders = files.filter(file => file.isDirectory()).map(dir => dir.name);
        const fileNames = files.filter(file => file.isFile()).map(file => file.name);

        folders.sort();
        fileNames.sort();

        console.log('Folders:');
        folders.forEach(name => console.log(name));
        console.log('Files:');
        fileNames.forEach(name => console.log(name));
    } catch (err) {
        console.log('Operation failed');
    }
}

async function readFile(filePath) {
    try {
        const fullPath = resolve(cwd(), filePath);
        const data = await fsReadFile(fullPath, 'utf-8');
        console.log(data);
    } catch (err) {
        console.log('Operation failed');
    }
}

async function addFile(fileName) {
    try {
        const fullPath = join(cwd(), fileName);
        await writeFile(fullPath, '', { flag: 'wx' });
    } catch (err) {
        console.log('Operation failed');
    }
}

async function renameFile(oldPath, newPath) {
    try {
        const resolvedOldPath = resolve(cwd(), oldPath);
        const resolvedNewPath = resolve(cwd(), newPath);
        await rename(resolvedOldPath, resolvedNewPath);
    } catch (err) {
        console.log('Operation failed');
    }
}

async function copyFileToDestination(srcPath, destPath) {
    try {
        const resolvedSrc = resolve(cwd(), srcPath);
        const resolvedDest = resolve(cwd(), destPath);
        await copyFile(resolvedSrc, resolvedDest);
    } catch (err) {
        console.log('Operation failed');
    }
}

async function moveFile(srcPath, destPath) {
    try {
        await copyFileToDestination(srcPath, destPath);
        await removeFile(srcPath);
    } catch (err) {
        console.log('Operation failed');
    }
}

async function removeFile(filePath) {
    try {
        const resolvedPath = resolve(cwd(), filePath);
        await unlink(resolvedPath);
    } catch (err) {
        console.log('Operation failed');
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

rl.on('line', (line) => {
    handleCommand(line.trim());
    rl.prompt();
}).on('close', () => {
    console.log(`Thank you for using File Manager, ${username} goodbye!`);
    process.exit(0);
});

rl.prompt();
