const { runContainer } = require('./docker');

class ServerlessDockerHooks {

    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;

        const { dockerHooks } = serverless.service.custom;

        this.hooks = Object.keys(dockerHooks).reduce((hooks, hook) => {
            const { image, command, volumes } = dockerHooks[hook];
            hooks[hook] = () => runContainer(image, command, volumes);
            return hooks;
        }, {});
    }
}

module.exports = ServerlessDockerHooks;