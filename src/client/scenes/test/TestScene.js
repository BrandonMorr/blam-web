import { Group, Clock, PlaneGeometry, MeshBasicMaterial, Mesh } from 'three';
import Duck from './duck/Duck';

/**
 * @class - Test Scene which once upon a time displayed a bunch of ducks.
 */
export default class TestScene extends Group {

  constructor() {
    super();

    this.clock = new Clock();

    const floorGeometry = new PlaneGeometry(50, 50);
    const floorMaterial = new MeshBasicMaterial({ color: 0xffff00 });
    const floorMesh = new Mesh(floorGeometry, floorMaterial);
    floorMesh.rotateX(-Math.PI / 2);
    floorMesh.position.set(0, -1, 0);

    const duck = new Duck();
    duck.position.set(0, 0, -5);

    this.add(floorMesh, duck);
  }

  update() {
    const delta = this.clock.getDelta();

    // Update...
  }
}
