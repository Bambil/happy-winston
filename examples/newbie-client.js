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
