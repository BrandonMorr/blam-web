import { Group, Clock } from 'three';
import Duck from './duck/Duck';

/**
 * @class - Test Scene which displays a ton of randomly placed rubber duckies.
 */
export default class TestScene extends Group {

  constructor() {
    super();

    this.clock = new Clock();

    this.ducks = [];

    for (let i = 0; i <= 250; i++) {
      const duck = new Duck();
      duck.position.set(
        this.getRandomFloatRange(-25, 25),
        this.getRandomFloatRange(-25, 25),
        this.getRandomFloatRange(-25, 25)
      );

      this.add(duck);
      this.ducks.push(duck);
    }
  }

  update() {
    const delta = this.clock.getDelta();

    for (let duck of this.ducks) {
      duck.rotation.x += 1 * delta;
      duck.rotation.z += 1 * delta;
    }
  }

  getRandomFloatRange(min, max) {
    return Math.random() * (max - min) + min;
  }
}
