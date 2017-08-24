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
const boom = require('boom')

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
          this.log(log.level, log.message, log.meta, (err) => {
            if (err) {
              return reply(err).code(500)
            } else {
              return reply({
                ok: true
              })
            }
          })
        } else if (request.payload.method === 'query') {
          let options = request.payload.params
          this.query(options, (err, results) => {
            if (err) {
              return reply(err)
            } else {
              return reply(results)
            }
          })
        } else {
          return reply(boom.badRequest({
            message: 'Bad Request'
          }))
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
