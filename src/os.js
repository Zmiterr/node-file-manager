import os from 'os';

export const getEOL = () => {
    console.log(`System End-Of-Line: ${JSON.stringify(os.EOL)}`);
};

export const getCPUsInfo = () => {
    const cpus = os.cpus();
    console.log(`Number of CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
    });
};

export const getHomeDirectory = () => {
    console.log(`Home Directory: ${os.homedir()}`);
};

export const getSystemUsername = () => {
    console.log(`System Username: ${os.userInfo().username}`);
};

export const getArchitecture = () => {
    console.log(`CPU Architecture: ${os.arch()}`);
};
