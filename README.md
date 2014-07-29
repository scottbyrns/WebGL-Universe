WebGL-Universe
==============

A real-time simulation of our living universe in WebGL


##Installing Dependencies

This project depends on a running instance of Javascript-Dependency-Manager on port 3000 at localhost
https://github.com/scottbyrns/Javascript-Dependency-Manager

### NPM
* request
* cheerio
* restify
* mysql

## Running Project

This project requires two seperate servers to run. One for the API and one for the static content.

### API Server

```

cd Server
node main.js

```

### Static Server

The static content is served from the root directory of this project.
In this projects root simply run:

```

python -m SimpleHTTPServer

```
