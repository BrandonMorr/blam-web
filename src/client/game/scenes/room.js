import { Group, PlaneGeometry, MeshBasicMaterial, Mesh } from 'three'

/**
 * @class - Test Scene which once upon a time displayed a bunch of ducks.
 */
export default class Room extends Group {

  constructor() {
    super()

    const floorGeometry = new PlaneGeometry(50, 50)
    const floorMaterial = new MeshBasicMaterial({ color: 0xffffff })

    this.floorMesh = new Mesh(floorGeometry, floorMaterial)
    this.floorMesh.rotateX(-Math.PI / 2)
    this.floorMesh.position.set(0, -1, 0)

    this.add(this.floorMesh)
  }

  update(delta) {
    this.floorMesh.rotation.z += 0.1 * delta;
  }
}
