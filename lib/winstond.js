/*
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 24-08-2017
 * |
 * | File Name:     lib/winstond.js
 * +===============================================
 */
const winston = require('winston')
const hapi = require('hapi')

class Winstond extends winston.Logger {
  constructor (options) {
    super(options)

    if (!options) {
      options = {}
    }

    this.server = new hapi.Server()
    this.server.connection({
      port: options.port || 9003,
      host: options.host || '127.0.0.1'
    })

    this.server.route({
      method: 'POST',
      path: '/',
      config: {
        payload: {
          parse: true
        }
      },
      handler: (request, reply) => {
        if (request.payload.method === 'collect') {
          let log = request.payload.params
          this.log(log.level, log.message, log.meta)
        }
      }
    })
  }

  listen () {
    this.server.start((err) => {
      if (err) {
        throw err
      }

      this.emit('listening')
    })
  }
}

module.exports = Winstond
