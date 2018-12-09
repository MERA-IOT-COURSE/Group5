const fs = require('fs');
const exec = require('child_process').exec;

function getHardwareId() {
    const cpuinfoPath = "/proc/cpuinfo";

    var cpuinfo = fs.readFileSync(cpuinfoPath, 'utf-8');
    var hardwareIdRegexp = /Serial\s*:\s*(\w+)/g;
    var match = hardwareIdRegexp.exec(cpuinfo);

    return match ? match[1] : null
}

function now(callback) {
    exec(
        "date +%s",
        (error, stdout) => callback.call(this, stdout.substr(0, 10)) // timestamp is 10-digit
    );
}

module.exports = {
    getHardwareId: getHardwareId,
    now: now
};