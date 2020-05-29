import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/**
 * @class - Duck class which loads GLTF model and add's it to a group.
 */
export default class Duck extends Group {

  constructor() {
    super();

    this.name = 'duck';

    new GLTFLoader().load('assets/models/duck/duck.gltf', (gltf) => {
      this.add(gltf.scene);
    });
  }
}
