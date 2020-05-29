import { Vector3, Clock } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

/**
 * @class - PlayerController class handles player input.
 */
export default class PlayerController {

  constructor(camera) {
    this.clock = new Clock()
    this.controls = new PointerLockControls(camera, document.body)

    this.camera = camera

    this.mass = 20
    this.jumpForce = 75
    this.movementSpeed = 100

    this.moveForward = false
		this.moveBackward = false
		this.moveLeft = false
		this.moveRight = false
		this.jump = false

    this.isFiring = false

    this.velocity = new Vector3()
    this.direction = new Vector3()

    this.addInputListeners()
  }

  addInputListeners() {
    const onKeyDown = (event) => {
      switch (event.keyCode) {
        case 38:
        case 87:
          this.moveForward = true
          break

        case 37:
        case 65:
          this.moveLeft = true
          break

        case 40:
        case 83:
          this.moveBackward = true
          break

        case 39:
        case 68:
          this.moveRight = true
          break

        case 32:
          if (!this.isJumping) this.velocity.y += this.jumpForce
          this.isJumping = true
          break
      }
    }

    const onKeyUp = (event) => {
      switch (event.keyCode) {

        case 38:
        case 87:
          this.moveForward = false
          break

        case 37:
        case 65:
          this.moveLeft = false
          break

        case 40:
        case 83:
          this.moveBackward = false
          break

        case 39:
        case 68:
          this.moveRight = false
          break
      }
    }

    const onPointerDown = () => {
      this.isFiring = true
    }

    const onPointerUp = () => {
      this.isFiring = false
    }

    document.addEventListener('keydown', onKeyDown, false)
		document.addEventListener('keyup', onKeyUp, false)

    document.addEventListener('pointerdown', onPointerDown, false)
    document.addEventListener('pointerup', onPointerUp, false)

    document.body.addEventListener('click', () => { this.controls.lock() })
  }

  update() {
    if (this.controls.isLocked === true) {
      const delta = this.clock.getDelta()

      this.velocity.x -= this.velocity.x * 10 * delta
      this.velocity.z -= this.velocity.z * 10 * delta
      this.velocity.y -= 9.81 * this.mass * delta

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward)
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft)
      this.direction.normalize()

      if (this.moveForward || this.moveBackward) {
        this.velocity.z -= this.direction.z * this.movementSpeed * delta
      }

      if (this.moveLeft || this.moveRight) {
        this.velocity.x -= this.direction.x * this.movementSpeed * delta
      }

      this.controls.moveRight(-this.velocity.x * delta)
      this.controls.moveForward(-this.velocity.z * delta)

      this.camera.position.y += (this.velocity.y * delta)

      if (this.camera.position.y < 0) {
        this.velocity.y = 0
        this.camera.position.y = 0

        this.isJumping = false
      }

      if (this.isFiring) {
        // Primary click action...
      }
    }
  }
}
