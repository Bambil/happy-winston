const happyWinston = require('../')

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
