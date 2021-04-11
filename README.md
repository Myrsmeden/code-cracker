# CodeCracker
This is an application where you get to crack some codes.
It is a Svelte frontend and a netlify functions backend.

## Getting started
To run the application, you first need to install the dependencies
```
npm i
```

Furthermore, you need `netlify-cli`
```
npm install netlify-cli -g
```

To run the application, run `npm run build:watch` in one terminal window and `netlify dev` in another. You will now access the application at http://localhost:4001

A known issue is that the netlify application can sometimes break. 
It will still continue to run on the port 4001, and you won't be able to start it again. This is then solved by running `lsof -i :4001` and then `kill -9 INSERT_PID_HERE`.
