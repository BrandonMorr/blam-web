import { Group, Vector3, Euler } from 'three'
import InputManager from './inputManager'
import MovementManager from './movementManager'

/**
 * @class - WIP Player Controller.
 */
export default class PlayerController extends Group {

  constructor(camera = false) {
    super()

    this.camera = camera

    // if (camera) this.add(this.camera)

    this.inputManager = new InputManager()
    this.movementManager = new MovementManager(this.camera)

    this.movementVector = new Vector3()

    this.FORWARD_VECTOR = new Vector3(0, 0, 1)
    this.BACK_VECTOR = new Vector3(0, 0, -1)
    this.LEFT_VECTOR = new Vector3(1, 0, 0)
    this.RIGHT_VECTOR = new Vector3(-1, 0, 0)

    this.mouseSenitivity = 0.2
    this.euler = new Euler(0, 0, 0, 'YXZ')

    this.onMouseMove = () => {
      if (this.inputManager.cursorLocked) {
        this.euler.setFromQuaternion(this.camera.quaternion)

        this.euler.x -= this.inputManager.mouseMoveY * this.mouseSenitivity * 0.01
        this.euler.y -= this.inputManager.mouseMoveX * this.mouseSenitivity * 0.01

        // Clamp rotation on the x axis
        this.euler.x = Math.max(-(Math.PI / 2), Math.min((Math.PI / 2), this.euler.x));

        this.camera.quaternion.setFromEuler(this.euler)
      }
    }

    document.addEventListener('mousemove', this.onMouseMove, false)
  }

  update(delta) {
    this.movementVector.set(0, 0, 0)

    if (this.inputManager.moveForward) {
      this.movementVector.add(this.FORWARD_VECTOR)
    }
    if (this.inputManager.moveBackward) {
      this.movementVector.add(this.BACK_VECTOR)
    }
    if (this.inputManager.moveLeft) {
      this.movementVector.add(this.LEFT_VECTOR)
    }
    if (this.inputManager.moveRight) {
      this.movementVector.add(this.RIGHT_VECTOR)
    }

    this.movementManager.setMovementVector(this.movementVector)

    if (this.inputManager.jump) {
      this.movementManager.jump()
    }

    if (this.inputManager.isFiring) {
      // this.weaponManager.attack()
    }

    this.movementManager.update(delta)
  }
}
