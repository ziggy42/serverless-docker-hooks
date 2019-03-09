const { normalizeBinds, normalizeImageName } = require('./utils');

test('"./" is normalized to "$PWD/"', () => {
    expect(normalizeBinds(['./:/tmp'])).toEqual([`${process.cwd()}/:/tmp`]);
});

test('"/tmp" is normalized to "/tmp"', () => {
    expect(normalizeBinds(['/tmp:/tmp'])).toEqual(['/tmp:/tmp']);
});

test('"ubuntu" is normalized to "ubuntu:latest"', () => {
    expect(normalizeImageName('ubuntu')).toEqual('ubuntu:latest');
});

test('"ubuntu:latest" is normalized to "ubuntu:latest"', () => {
    expect(normalizeImageName('ubuntu:latest')).toEqual('ubuntu:latest');
});
