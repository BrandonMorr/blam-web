import * as Phaser from 'phaser'
import { enable3d, Canvas } from '@enable3d/phaser-extension'
import GameScene from './scenes/gameScene'

export default class Game {

  constructor() {
    const config = {
      title: 'Blam',
      version: '0.1',
      type: Phaser.WEBGL,
      backgroundColor: '#000000',
      input: {
        keyboard: true,
        mouse:    true,
        touch:    true,
        gamepad:  true,
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
      },
      scene: [ GameScene ],
      ...Canvas()
    }

    window.addEventListener('load', () => {
      enable3d(() => new Phaser.Game(config)).withPhysics('/lib')
    })
  }
}
