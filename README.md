# serverless-docker-hooks

Run commands in docker containers as [serverless](https://serverless.com/) hooks.
Requires `docker` to be installed and running.

## Install
```
npm install --save-dev serverless-docker-hooks
```

## Usage
```yml
plugins:
  - serverless-docker-hooks

custom:
  dockerHooks:
    before:deploy:deploy:
      image: ubuntu
      command: # Optional
        - 'bash' 
        - '-c'
        - 'ls local'
      volumes: # Optional
        - './:/local'
```
