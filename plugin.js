const { runContainer } = require('./docker');

class ServerlessDockerHooks {

    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;

        const { dockerHooks } = serverless.service.custom;

        this.hooks = Object.keys(dockerHooks).reduce((hooks, hook) => {
            const { image, command } = dockerHooks[hook];
            hooks[hook] = () => runContainer(image, command);
            return hooks;
        }, {});
    }
}

module.exports = ServerlessDockerHooks;