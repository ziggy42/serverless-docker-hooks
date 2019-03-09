# serverless-docker-hooks

Run commands in docker containers as serverless hooks.
Requires `docker` to be installed and running.

## Install
```
npm install serverless-docker-hooks
```

## Usage
```yml
plugins:
  - serverless-docker-hooks

custom:
  dockerHooks:
    before:deploy:deploy:
      image: ubuntu
      command:
        - 'bash' 
        - '-c'
        - 'ls local'
      volumes:
        - './:/local'
```