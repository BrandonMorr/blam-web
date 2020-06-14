import { Group, PlaneGeometry, MeshBasicMaterial, Mesh } from 'three'
import Duck from './duck/duck'

/**
 * @class - Test Scene which once upon a time displayed a bunch of ducks.
 */
export default class TestScene extends Group {

  constructor() {
    super()

    const floorGeometry = new PlaneGeometry(50, 50)
    const floorMaterial = new MeshBasicMaterial({ color: 0xffffff })

    this.floorMesh = new Mesh(floorGeometry, floorMaterial)
    this.floorMesh.rotateX(-Math.PI / 2)
    this.floorMesh.position.set(0, -1, 0)

    this.duck = new Duck()

    this.add(this.floorMesh, this.duck)
  }

  update(delta) {
    this.duck.rotation.y += 1 * delta;
    this.duck.position.y = Math.sin(performance.now() * 0.001) * Math.PI * 0.1;
  }
}
