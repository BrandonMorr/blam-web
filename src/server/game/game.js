import geckos from '@geckos.io/server'

export default class Game {

  constructor(server) {
    this.server = server

    this.io = geckos()
    this.io.addServer(server)

    this.io.onConnection(channel => {
      console.log(`${channel.id} connected`)

      channel.onDisconnect(() => {
        console.log(`${channel.id} disconnected`)
      })

      this.io.emit('welcome')
    })

    this.update()
  }

  update() {
    setImmediate(() => { this.update() }, 1000 / 60)
  }
}
