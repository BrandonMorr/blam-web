import { Vector3 } from 'three'

export default class MovementManager {

  constructor(camera) {
    this.camera = camera

    this.pressedJump = false
    this.jumping = false

    // Amount of force applied when jumping.
    this.jumpForce = 30
    // Amount of force working against y velocity.
    this.mass = 80
    // Acceleration factor for player movement.
    this.moveAcceleration = 2
    // The max speed a player can reach.
    this.maxSpeed = 20
    // Amout of force working against movement on the X/Z axis.
    this.drag = this.moveAcceleration / this.maxSpeed

    this.movementVector = new Vector3()
    this.velocity = new Vector3()
    this.vector = new Vector3()

    this.frozen = false
  }

  /**
   * Set the current movement vector (direction of movement).
   *
   * @param { THREE.Vector3 } movementVector - The current movement vector.
   */
  setMovementVector(movementVector) {
    // Use normalized here to round out the values.
    this.movementVector = movementVector.normalize()
  }

  /**
   * Freeze the player movement.
   */
  freeze() {
    this.frozen = true
  }

  /**
   * Unfreeze the player movement.
   */
  unfreeze() {
    this.frozen = false
  }

  /**
   * Move the camera by a certain distance on the Z axis.
   *
   * @param { Float } distance - The distance to transform the camera by.
   */
  moveForward(distance) {
    this.vector.setFromMatrixColumn(this.camera.matrix, 0)
    // Use cross here to always be pointing the camera forward.
    this.vector.crossVectors(this.camera.up, this.vector)

    this.camera.position.addScaledVector(this.vector, distance)
  }

  /**
   * Move the camera by a certain distance on the X axis.
   *
   * @param { Float } distance - The distance to transform the camera by.
   */
  moveRight(distance) {
    this.vector.setFromMatrixColumn(this.camera.matrix, 0)

    this.camera.position.addScaledVector(this.vector, distance)
  }

  /**
   * Signal that the player has jumped.
   */
  jump() {
    this.pressedJump = true
  }

  /**
   * Check if the player is grounded (Y position: 0).
   */
  isGrounded() {
    return this.camera.position.y < 2
  }

  /**
   * Process player movement.
   *
   * @param { Float } delta - The current time delta (time since last frame).
   */
  update(delta) {
    if (this.frozen) return

    // Apply accelerated movement vector to velocity X/Z axis.
    this.velocity.x -= this.movementVector.x * this.moveAcceleration
    this.velocity.z -= this.movementVector.z * this.moveAcceleration

    // Apply forces to all axis on velocity.
    this.velocity.x -= this.velocity.x * this.drag
    this.velocity.z -= this.velocity.z * this.drag
    this.velocity.y -= this.mass * 0.01

    // If grounded, reset y velocity.
    if (this.isGrounded()) {
      this.velocity.y = -0.01
      this.camera.position.y = 2

      this.jumping = false
    }

    // If pressed jump, apply jump force to y velocity.
    if (this.pressedJump) {
      if (!this.jumping) {
        this.velocity.y = this.jumpForce

        this.jumping = true
      }
    }

    // Move the camera on the X/Z axis.
    this.moveRight(this.velocity.x * delta)
    this.moveForward(-this.velocity.z * delta)
    // Move the camera on the Y axis.
    this.camera.position.y += this.velocity.y * delta

    this.pressedJump = false
  }
}
