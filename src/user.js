export const getUsername = () => {
    return process.argv.find(arg => arg.startsWith('--username='))?.split('=')[1] || 'noName';
};
