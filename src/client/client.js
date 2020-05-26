import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

// The scene object.
const scene = new THREE.Scene();

// Used to track time deltas.
const clock = new THREE.Clock();

// Create a camera object.
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Create a renderer, append it to the document body.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);

document.body.appendChild(renderer.domElement)

// First person camera controller.
const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 5;
controls.lookSpeed = 0.5;

// Create a cube mesh with a geometry (shape) + material (color), add to scene.
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x87E0FF });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// Adjust renderer, aspect ratio on resize.
window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Core loop.
function animate() {
	requestAnimationFrame(animate);

	controls.update(clock.getDelta());
	renderer.render(scene, camera);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

animate();
