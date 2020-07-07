/**
 * @class - Input Manager to handle player input.
 */
export default class InputManager {

  constructor(input) {
    // Reference to the parent Scene3D's input plugin.
    this.input = input

    this.keys = {
      forward: input.keyboard.addKey('W'),
      back: input.keyboard.addKey('S'),
      left: input.keyboard.addKey('A'),
      right: input.keyboard.addKey('D'),
      jump: input.keyboard.addKey('SPACE'),
      restart: input.keyboard.addKey('R')
    }

    this.requestPointerLock = () => {
      input.mouse.requestPointerLock()
    }

    this.onPointerlockChange = () => {
      if (input.mouse.locked) {
        // this.enableControls()

        document.removeEventListener('click', this.requestPointerLock, false)
      }
      else {
        // this.disableControls()

        document.addEventListener('click', this.requestPointerLock, false)
      }
    }

    this.onPointerlockError = () => {
      console.error('[InputManager]: Unable to access Pointer Lock API :-(')
    }

    document.addEventListener('click', this.requestPointerLock, false)
    document.addEventListener('pointerlockchange', this.onPointerlockChange, false)
    document.addEventListener('pointerlockerror', this.onPointerlockError, false)
  }

  enableControls() {
    // for (const control in this.controls) {
    //   console.log(this.controls[control].keyCode)
    // }
  }

  disableControls() {

  }
}
