# serverless-docker-hooks

Run commands in docker containers as serverless hooks

## Install
```
npm install serverless-docker-hooks
```

## Usage
```yml
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