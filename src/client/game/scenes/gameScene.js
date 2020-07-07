import { Scene3D } from '@enable3d/phaser-extension'
import PlayerController from '../components/playerController'

export default class GameScene extends Scene3D {
  constructor() {
    super({ key: 'GameScene' })
  }

  init() {

  }

  preload() {

  }

  create() {
    this.accessThirdDimension()

    this.third.physics.debug.enable()

    // Quickly setup some lights in the room.
    this.third.warpSpeed()

    // Player controller.
    this.player = new PlayerController(this)

    this.cube = this.third.add.box({ y: 5, x: -5 }, { normal: {} })

    this.sun = this.third.physics.add.sphere({ x: 2, y: 5, z: 1, radius: 1 }, { basic: { color: 0xffff00 } })
    this.sun.body.setCollisionFlags(2)
  }

  update(time, delta) {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.sun.position.y -= 0.01
    this.sun.body.needUpdate = true
  }
}
