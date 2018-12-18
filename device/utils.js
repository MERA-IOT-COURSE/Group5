const fs = require('fs');
const exec = require('child_process').exec;

function getHardwareId() {
    let match = /Serial\s*:\s*(\w+)/g.exec(fs.readFileSync("/proc/cpuinfo", 'utf-8'));
    return match ? match[1] : null
}

async function now() {
    return new Promise(resolve => {
        exec(
            "date +%s",
            (error, stdout) => resolve(stdout.substr(0, 10)) // timestamp is 10-digit
        );
    });
}

module.exports = {
    getHardwareId: getHardwareId,
    now: now
};