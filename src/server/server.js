const path = require('path')
const http = require('http')
const express = require('express')
const geckos = require('@geckos.io/server').default

const io = geckos()
const app = express()
const server = http.Server(app)
const port = process.env.port || 3000

io.addServer(server)

io.onConnection((client) => {
  console.log(`${client.id} has connected`)

  client.emit('player connected');

  client.onDisconnect(() => {
    console.log(`${client.id} got disconnected`)
  })
})

app.use('/', express.static(path.join(__dirname, '../../public')))

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../../public/index.html'))
})

server.listen(port, () => {
  console.log('\n🌏 server init complete, listening for connections on port ' + port + ' 🌏\n')
})
