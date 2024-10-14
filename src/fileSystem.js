import {chdir, cwd} from "node:process";
import {dirname, join, resolve} from "node:path";
import {copyFile, readdir, readFile as fsReadFile, rename, unlink, writeFile} from "fs/promises";

export const goUp = () => {
    const currentDir = cwd();
    const parentDir = dirname(currentDir);
    if (currentDir !== parentDir) {
        chdir(parentDir);
    }
};

export const changeDirectory = newPath => {
    try {
        const resolvedPath = resolve(cwd(), newPath);
        chdir(resolvedPath);
    } catch (err) {
        console.log('Operation failed');
    }
};

export const listDirectory = async () => {
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
};

export const readFile = async filePath => {
    try {
        const fullPath = resolve(cwd(), filePath);
        const data = await fsReadFile(fullPath, 'utf-8');
        console.log(data);
    } catch (err) {
        console.log('Operation failed');
    }
};

export const addFile = async fileName => {
    try {
        const fullPath = join(cwd(), fileName);
        await writeFile(fullPath, '', { flag: 'wx' });
    } catch (err) {
        console.log('Operation failed');
    }
};

export const renameFile = async (oldPath, newPath) => {
    try {
        const resolvedOldPath = resolve(cwd(), oldPath);
        const resolvedNewPath = resolve(cwd(), newPath);
        await rename(resolvedOldPath, resolvedNewPath);
    } catch (err) {
        console.log('Operation failed');
    }
};

export const copyFileToDestination = async (srcPath, destPath) => {
    try {
        const resolvedSrc = resolve(cwd(), srcPath);
        const resolvedDest = resolve(cwd(), destPath);
        await copyFile(resolvedSrc, resolvedDest);
    } catch (err) {
        console.log('Operation failed');
    }
};

export const removeFile = async filePath => {
    try {
        const resolvedPath = resolve(cwd(), filePath);
        await unlink(resolvedPath);
    } catch (err) {
        console.log('Operation failed');
    }
};

export const moveFile = async (srcPath, destPath) => {
    try {
        await copyFileToDestination(srcPath, destPath);
        await removeFile(srcPath);
    } catch (err) {
        console.log('Operation failed');
    }
};


