const Docker = require('dockerode');

const docker = new Docker();

const pullImage = async (image) => {
    const imageName = image.includes(':') ? image : `${image}:latest`;
    const stream = await docker.pull(imageName);
    await new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
    });
};

const runContainer = async (image, command, config) => {
    await pullImage(image);
    console.dir(Array.isArray(command) ? command : [command], { colors: true })
    await docker.run(image, Array.isArray(command) ? command : [command], process.stdout, {
        HostConfig: {
            AutoRemove: true
        }
    });
};

// runContainer('ubuntu', ['bash', '-c', 'uname -a'], {});

module.exports = { runContainer };