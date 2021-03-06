import { THREE } from '@enable3d/phaser-extension'

export default class MovementManager {

  constructor(player) {
    this.player = player
    this.body = player.body

    this.pressedJump = false
    this.jumping = false

    // Amount of force applied when jumping.
    this.jumpForce = 20
    // Amount of force working against y velocity.
    this.mass = 60
    // Acceleration factor for player movement.
    this.moveAcceleration = 2
    // The max speed a player can reach.
    this.maxSpeed = 10
    // Amout of force working against movement on the X/Z axis.
    this.drag = this.moveAcceleration / this.maxSpeed

    this.movementVector = new THREE.Vector3()
    this.velocity = new THREE.Vector3()
    this.vector = new THREE.Vector3()

    this.body.on.collision((object, event) => {
      if (event === 'start') {
        this.grounded = true
      }
      if (event === 'end') {
        this.grounded = false
      }
    })

    console.log(this.body)
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
   * Move the body by a certain distance on the Z axis.
   *
   * @param { Float } distance - The distance to transform the body by.
   */
  moveForward(distance) {
    this.vector.setFromMatrixColumn(this.player.matrix, 0)
    // Use cross here to always be pointing the body forward.
    this.vector.crossVectors(this.player.up, this.vector)

    this.player.position.addScaledVector(this.vector, distance)
  }

  /**
   * Move the body by a certain distance on the X axis.
   *
   * @param { Float } distance - The distance to transform the body by.
   */
  moveRight(distance) {
    this.vector.setFromMatrixColumn(this.player.matrix, 0)

    this.player.position.addScaledVector(this.vector, distance)
  }

  /**
   * Signal that the player has jumped.
   */
  jump() {
    this.pressedJump = true
  }

  /**
   * Process player movement.
   *
   * @param { Float } delta - The current time delta (time since last frame).
   */
  update(time, delta) {
    delta = delta * 0.01

    if (this.frozen) return

    // Apply accelerated movement vector to velocity X/Z axis.
    this.velocity.x -= this.movementVector.x * this.moveAcceleration
    this.velocity.z -= this.movementVector.z * this.moveAcceleration

    // Apply forces to all axis on velocity.
    this.velocity.x -= this.velocity.x * this.drag
    this.velocity.z -= this.velocity.z * this.drag
    this.velocity.y -= this.mass * 0.01


    console.log(this.grounded)

    // If grounded, reset y velocity.
    if (this.grounded) {
      this.velocity.y = -0.01
    }
    if (this.grounded && this.pressedJump) {
      this.velocity.y += this.jumpForce
    }

    // Move the body on the X/Z axis.
    // this.moveRight(-this.velocity.x * delta)
    // this.moveForward(this.velocity.z * delta)

    // Move the body on the Y axis.
    this.body.applyForce(-this.velocity.x * delta, this.velocity.y * delta, -this.velocity.z * delta)

    this.pressedJump = false
  }
}
