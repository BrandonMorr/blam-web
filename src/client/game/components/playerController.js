import { ExtendedObject3D, PhysicsBody, FirstPersonControls, THREE } from '@enable3d/phaser-extension'
import InputManager from './inputManager'
import MovementManager from './movementManager'

/**
 * @class - WIP Player Controller.
 */
export default class PlayerController extends ExtendedObject3D {

  constructor(scene, position = false) {
    super()

    this.scene = scene

    this.sensitivity = new THREE.Vector2(0.2, 0.2)
    this.movementVector = new THREE.Vector3()

    this.FORWARD = new THREE.Vector3(0, 0, 1)
    this.BACK = new THREE.Vector3(0, 0, -1)
    this.LEFT = new THREE.Vector3(1, 0, 0)
    this.RIGHT = new THREE.Vector3(-1, 0, 0)

    if (!position) this.position.setY(10)

    scene.third.physics.add.existing(this, { shape: 'box' })
    this.body.setCollisionFlags(0)

    scene.add.existing(this)

    this.lookControls = new FirstPersonControls(scene.third.camera, this, { sensitivity: this.sensitivity })
    this.controls = new InputManager(scene.input)
    this.movement = new MovementManager(this)

    scene.input.on('pointermove', pointer => {
      if (scene.input.mouse.locked) this.lookControls.update(pointer.movementX, pointer.movementY)
    })

    scene.events.on('update', (time, delta) => {
      this.lookControls.update(0, 0)
      this.update(time, delta)
    })
  }

  update(time, delta) {
    if (this.controls.keys.restart.isDown) {
      const { scene } = this.scene

      scene.restart()
    }

    this.movementVector.set(0, 0, 0)

    if (this.controls.keys.forward.isDown) {
      this.movementVector.add(this.FORWARD)
    }
    if (this.controls.keys.back.isDown) {
      this.movementVector.add(this.BACK)
    }
    if (this.controls.keys.left.isDown) {
      this.movementVector.add(this.LEFT)
    }
    if (this.controls.keys.right.isDown) {
      this.movementVector.add(this.RIGHT)
    }
    if (this.controls.keys.jump.isDown) {
      this.movement.jump()
    }

    this.movement.setMovementVector(this.movementVector)

    this.movement.update(time, delta)
  }
}
