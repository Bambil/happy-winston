# happy-winston
![npm-downloads](https://img.shields.io/npm/dw/happy-winston.svg?style=flat-square)
![npm-license](https://img.shields.io/npm/l/happy-winston.svg?style=flat-square)
[![npm-version](https://img.shields.io/npm/v/happy-winston.svg?style=flat-square)](https://www.npmjs.com/package/happy-winston)

## Introdcution

A logging server built on top of [winston](https://github.com/winstonjs/winston) and
[hapi.js](https://hapijs.com/), capable of receiving and querying logs.

## Services

Each winstond server can utilize up to 2 different services, which leverage
the main capabilities of a winston transport.

- `collect` - log collection
- `query` - querying logs

## Usage

### Creating a winstond server

```js
const happyWinston = require('happy-winston')

const server = new happyWinston.Winstond()
server.add(happyWinston.transports.Console, {
  colorize: true,
  timestamp: true,
  stringify: true,
  prettyPrint: true
})
server.add(happyWinston.transports.File, {
  filename: 'newbie.log'
})
server.listen()

server.on('listening', () => {
  console.log('server starts on 127.0.0.1:9003')
})
```

### Communicating with a winstond server

```js
const winston = require('winston')

winston.add(winston.transports.Http, {
  host: '127.0.0.1',
  port: 9003
})

winston.log('info', 'hello')
winston.log('info', 2)
winston.query({
  from: new Date() - 24 * 60 * 60 * 1000,
  until: new Date(),
  limit: 10,
  start: 0,
  order: 'desc'
}, (err, results) => {
  if (err) {
    console.log(err)
  } else {
    if (results.http.file) {
      for (let r of results.http.file) {
        console.log(r)
      }
    }
  }
})
```

## Backends

winstond supports http backend.

## Installation

``` bash
$ npm install happy-winston
```
