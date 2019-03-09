const { runContainer } = require('./src/docker');

class ServerlessDockerHooks {

    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;

        const { dockerHooks } = serverless.service.custom;
        this.hooks = Object.keys(dockerHooks).reduce((hooks, hook) => {
            hooks[hook] = () => runContainer(dockerHooks[hook]);
            return hooks;
        }, {});
    }
}

module.exports = ServerlessDockerHooks;