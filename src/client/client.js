import * as THREE from 'three';
import TestScene from './scenes/test/TestScene';
import FPSController from './input/PlayerController';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);

const testScene = new TestScene();
scene.add(testScene);

const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 1);
light.position.set(0, 1, 1);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.antialias = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controller = new FPSController(camera);

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

function animate() {
	requestAnimationFrame(animate);

	controller.update();
	testScene.update();

	renderer.render(scene, camera);
}

animate();
