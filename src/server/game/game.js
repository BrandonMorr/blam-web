import geckos from '@geckos.io/server'

import Player from './components/player'

export default class Game {

  constructor(server) {
    this.server = server

    this.io = geckos()
    this.io.addServer(server)

    this.players = []

    this.io.onConnection(channel => {
      channel.onDisconnect(() => {
        console.log(`${channel.id} disconnected`)

        channel.emit('remove player', channel.id)
      })

      this.players.push({
        id: channel.id
      })

      channel.on('add player', () => {
        this.players.push(new Player(channel.id))

        channel.broadcast.emit('add player')
      })
    })

    this.update()
  }

  update() {
    setImmediate(() => { this.update() }, 1000 / 60)
  }
}
