const Docker = require('dockerode');

const docker = new Docker();

const normalizeBinds = (binds) => binds.map((volumeBinding) => {
    let [src, dest] = volumeBinding.split(':');
    if (src.startsWith('.')) {
        src = process.cwd() + src.substring(1);
    }

    return `${src}:${dest}`;
});

const pullImage = async (image) => {
    const imageName = image.includes(':') ? image : `${image}:latest`;
    const stream = await docker.pull(imageName);
    await new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
    });
};

const runContainer = async (image, command, volumes) => {
    await pullImage(image);
    await docker.run(image, Array.isArray(command) ? command : [command], process.stdout, {
        HostConfig: {
            AutoRemove: true,
            Binds: volumes ? normalizeBinds(volumes) : []
        }
    });
};

module.exports = { runContainer };