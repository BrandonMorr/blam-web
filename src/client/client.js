import * as THREE from 'three';
import TestScene from './scenes/test/TestScene';
import FPSController from './input/PlayerController';
import Geckos from '@geckos.io/client';

const channel = new Geckos({ port: 3000 });

// once the channel is connected to the server
channel.onConnect(error => {
	if (error) {
    console.error(error.message);
    return;
  }

	channel.on('player connected', () => {
		console.log('yo');
	});

  channel.onDisconnect(() => {
		console.log('someone disconnected');
	});
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const testScene = new TestScene();
scene.add(testScene);

const light = new THREE.HemisphereLight(0xffffbb, 0x777788, 1);
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
