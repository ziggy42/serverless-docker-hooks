const Docker = require('dockerode');
const { normalizeBinds, normalizeImageName } = require('./utils');

const docker = new Docker();

const pullImage = async (image) => {
    const stream = await docker.pull(normalizeImageName(image));
    await new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
    });
};

const runContainer = async ({ image, command, volumes }) => {
    await pullImage(image);
    await docker.run(image, Array.isArray(command) ? command : [command], process.stdout, {
        HostConfig: {
            AutoRemove: true,
            Binds: volumes ? normalizeBinds(volumes) : []
        }
    });
};

module.exports = { runContainer };