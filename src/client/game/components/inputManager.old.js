/**
 * @class - Input Manager to handle player input.
 */
export default class InputManager {

  constructor() {
    this.cursorLocked = false

    // The target domElement to lock the cursor to, default to body for now.
    this.lockTarget = document.body

    this.mouseMoveX = 0
    this.mouseMoveY = 0

    this.moveForward = false
		this.moveBackward = false
		this.moveLeft = false
		this.moveRight = false

    this.jump = false

    this.onMouseMove = (event) => {
      this.mouseMoveX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
      this.mouseMoveY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
    }

    this.onKeyDown = (event) => {
      switch (event.keyCode) {
        // 'W' or forward key.
        case 38:
        case 87:
          this.moveForward = true
          break

        // 'A' or left key.
        case 37:
        case 65:
          this.moveLeft = true
          break

        // 'S' or back key.
        case 40:
        case 83:
          this.moveBackward = true
          break

        // 'D' or right key.
        case 39:
        case 68:
          this.moveRight = true
          break

        // Space bar.
        case 32:
          this.jump = true
          break
      }
    }

    this.onKeyUp = (event) => {
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

        case 32:
          this.jump = false
          break
      }
    }

    this.onPointerDown = () => {
      this.isFiring = true
    }

    this.onPointerUp = () => {
      this.isFiring = false
    }

    this.requestPointerLock = () => {
      this.lockTarget.requestPointerLock()
    }

    this.onPointerlockChange = () => {
      if (document.pointerLockElement === document.body) {
        this.cursorLocked = true

        this.addInputListeners()
      }
      else {
        this.cursorLocked = false

        this.removeInputListeners()
      }
    }

    this.onPointerlockError = () => {
      console.error('[InputManager]: Unable to access Pointer Lock API :-(')
    }

    document.addEventListener('click', this.requestPointerLock, false)
    document.addEventListener('pointerlockchange', this.onPointerlockChange, false)
    document.addEventListener('pointerlockerror', this.onPointerlockError, false)
  }

  /**
   * Add mouse/key related input listeners.
   */
  addInputListeners() {
    document.addEventListener('mousemove', this.onMouseMove, false)

    document.addEventListener('keydown', this.onKeyDown, false)
		document.addEventListener('keyup', this.onKeyUp, false)

    document.addEventListener('pointerdown', this.onPointerDown, false)
    document.addEventListener('pointerup', this.onPointerUp, false)

    // Disable the cursor lock requestor.
    document.removeEventListener('click', this.requestPointerLock, false)
  }

  /**
   * Remove mouse/key related input listeners.
   */
  removeInputListeners() {
    document.removeEventListener('mousemove', this.onMouseMove, false)

    document.removeEventListener('keydown', this.onKeyDown, false)
		document.removeEventListener('keyup', this.onKeyUp, false)

    document.removeEventListener('pointerdown', this.onPointerDown, false)
    document.removeEventListener('pointerup', this.onPointerUp, false)

    // Enable the cursor lock requestor.
    document.addEventListener('click', this.requestPointerLock, false)
  }
}
