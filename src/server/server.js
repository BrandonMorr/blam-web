const path = require('path')
const http = require('http')
const express = require('express')
const geckos = require('@geckos.io/server').default

const port = 3000

const io = geckos()
const app = express()
const server = http.Server(app)

// io.addServer(server)
io.listen()

app.use('/', express.static(path.join(__dirname, '../../public')))

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../../public/index.html'))
})

server.listen(port, () => {
  console.log('\n🌏 server init complete, listening for connections on port ' + port + ' 🌏\n')

  io.onConnection(channel => {
    console.log(`${channel.id} has connected`)

    channel.onDisconnect(() => {
      console.log(`${channel.id} has disconnected`)
    })

    channel.emit('message', 'welcome...')
  })
})
