import { Group, Clock, PlaneGeometry, MeshBasicMaterial, Mesh } from 'three'
import Duck from './duck/Duck'

/**
 * @class - Test Scene which once upon a time displayed a bunch of ducks.
 */
export default class TestScene extends Group {

  constructor() {
    super()

    this.clock = new Clock()

    const floorGeometry = new PlaneGeometry(50, 50)
    const floorMaterial = new MeshBasicMaterial({ color: 0xffff00 })
    this.floorMesh = new Mesh(floorGeometry, floorMaterial)
    this.floorMesh.rotateX(-Math.PI / 2)
    this.floorMesh.position.set(0, -1, 0)

    this.duck = new Duck()

    this.add(this.floorMesh, this.duck)
  }

  update() {
    const delta = this.clock.getDelta()

    this.duck.rotation.y += 1 * delta;
    this.duck.position.y = Math.sin(performance.now() * 0.001) * Math.PI * 0.1;
  }
}
