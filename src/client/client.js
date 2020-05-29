import * as THREE from 'three'

import Geckos from '@geckos.io/client'
import TestScene from './scenes/test/TestScene'
import FPSController from './input/PlayerController'

const channel = new Geckos()

channel.onConnect(error => {
	console.log('connected')

	if (error) {
    console.error(error.message)
    return
  }

	channel.on('message', (message) => {
		console.log(message)
	})

  channel.onDisconnect(() => {
		console.log('someone disconnected')
	})
})

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const testScene = new TestScene()
scene.add(testScene)

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x777788, 1)
hemisphereLight.position.set(0, 1, 1)
scene.add(hemisphereLight)

const renderer = new THREE.WebGLRenderer()
renderer.antialias = true
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)

const controller = new FPSController(camera)

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight)

	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
})

function animate() {
	requestAnimationFrame(animate)

	controller.update()
	testScene.update()

	renderer.render(scene, camera)
}

animate()
