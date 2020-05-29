import { Group, SpotLight, PointLight, AmbientLight, HemisphereLight } from 'three';

/**
 * @class - Lights class which contains some light usage examples.
 */
export default class Lights extends Group {
  constructor() {
    super();

    const pointLight = new PointLight(0xFFFFFF, 1, 10, 1);
    const directionalLight = new SpotLight(0xFFFFFF, 0.8, 7, 0.8, 1, 1);
    const ambientLight = new AmbientLight(0x404040 , 0.66);
    const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1.15);

    pointLight.position.set(0, 1, 5);

    directionalLight.position.set(0, 0, 0);
    directionalLight.target.position.set(0, 0, 0);

    this.add(pointLight, directionalLight, ambientLight, hemisphereLight);
  }
}
