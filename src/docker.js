const Docker = require('dockerode');
const { normalizeBinds, normalizeImageName } = require('./utils');

const docker = new Docker();

const pullImage = async (image) => {
    const stream = await docker.pull(image);
    await new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
    });
};

const isImageLocal = async (image) => {
    const localImages = await docker.listImages({
        filters: { reference: [image] }
    });

    return localImages.length > 0;
};

const runContainer = async ({ image, command, volumes }) => {
    const imageName = normalizeImageName(image);
    const imageLocal = await isImageLocal(imageName);
    if (!imageLocal) {
        await pullImage(imageName);
    }

    await docker.run(image, Array.isArray(command) ? command : [command], process.stdout, {
        HostConfig: {
            AutoRemove: true,
            Binds: volumes ? normalizeBinds(volumes) : []
        }
    });
};

module.exports = { runContainer };