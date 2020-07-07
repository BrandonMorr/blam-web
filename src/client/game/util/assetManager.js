import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/**
 * @class - Asset Manager class stores all loaded GLTF models.
 */
export default class AssetManager {

  constructor(loadingManager) {
    this.loadingManager = loadingManager
    this.loader = new GLTFLoader(this.loadingManager)

    this.models = new Map()
  }

  /**
   * Loads a GLTF model and is stored in the manager's model Map.
   *
   * @param { String } name - The model's name identifier.
   * @param { String } url - The model's URL on the public file system.
   */
  loadModel(name, url) {
    this.loader.load(url, gltf => {
      gltf.scene.traverse(child => {
        if (child.isMesh) {
          child.receiveShadow = false
          child.castShadow = false
        }
      })

      this.models.set(name, gltf)
    })
  }

  /**
   * Retrieve model from the manager's model Map.
   *
   * @param { String } name - The model to retrieve's name identifier.
   *
   * @return { THREE.Object3D } - The retrieved GLTF model.
   */
  getModel(name) {
    return this.models.get(name).scene.clone()
  }
}
