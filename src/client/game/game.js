import * as THREE from 'three'
import Room from './scenes/room'
import PlayerController from './components/playerController'
import AssetManager from './util/assetManager'

import geckos from '@geckos.io/client'

export default class Game {

  constructor() {
    this.players = []

    this.channel = geckos({ port: 3000 })

    this.channel.onConnect(error => {
      if (error) {
        console.error(error.message)
        return
      }

      this.channel.emit('add player')
    })

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    const light = new THREE.HemisphereLight(0xffffff, 0x777788, 1)
    light.position.set(0, 2, 0)
    this.scene.add(light)

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.controller = new PlayerController(this.camera)

    this.renderer = new THREE.WebGLRenderer({ antialiasing: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    document.body.appendChild(this.renderer.domElement)

    window.addEventListener('resize', () => { this.onWindowResize() }, false)

    this.room = new Room()
    this.scene.add(this.room)

    const loadingManager = new THREE.LoadingManager()

    this.assetManager = new AssetManager(loadingManager)
    this.assetManager.loadModel('player', 'assets/models/duck/duck.gltf')

    this.clock = new THREE.Clock()

    this.update()
  }

  update() {
    const delta = this.clock.getDelta()

    this.controller.update(delta)
    this.room.update(delta)

    this.render()

    requestAnimationFrame(() => { this.update() })
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
