import * as THREE from 'three'
import TestScene from './scenes/test/testScene'
import { FPSController } from './components/input/playerController'

import geckos from '@geckos.io/client'

export default class Game {

  constructor() {
    this.channel = geckos({ port: 3000 })

    this.channel.onConnect(error => {
      if (error) console.error(error.message)

      this.channel.on('welcome', () => { console.log('welcome!') })
    })

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x777788, 1)
    this.hemisphereLight.position.set(0, 1, 0)
    this.scene.add(this.hemisphereLight)

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 5)

    this.controller = new FPSController(this.camera)

    this.renderer = new THREE.WebGLRenderer({ antialiasing: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    document.body.appendChild(this.renderer.domElement)

    window.addEventListener('resize', () => { this.onWindowResize()}, false)

    this.testScene = new TestScene()
    this.scene.add(this.testScene)

    this.clock = new THREE.Clock()

    this.update()
  }

  update() {
    requestAnimationFrame(() => { this.update() })

    this.controller.update(this.clock.getDelta())
    this.testScene.update(this.clock.getDelta())

    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }
}
