import path from 'path'
import http from 'http'
import express from 'express'

import Game from './game/game'

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 3000

app.use('/', express.static(path.join(__dirname, '../public')))

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../public/index.html'))
})

server.listen(port, () => {
  console.log('\n🌏 server init complete, listening for connections on port ' + port + ' 🌏\n')
})

new Game(server)
