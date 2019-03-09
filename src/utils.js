const normalizeBinds = (binds) => binds.map((volumeBinding) => {
    let [src, dest] = volumeBinding.split(':');
    if (src.startsWith('.')) {
        src = process.cwd() + src.substring(1);
    }

    return `${src}:${dest}`;
});

const normalizeImageName = (image) => image.includes(':') ? image : `${image}:latest`;

module.exports = { normalizeBinds, normalizeImageName };