import { TextureLoader } from 'three'

/**
 * @class - Texture Manager class stores all loaded textures.
 */
export default class TextureManager {

  constructor(loadingManager) {
    this.loadingManager = loadingManager
    this.loader = new TextureLoader(this.loadingManager)

    this.textures = new Map()
  }

  /**
   * Loads a texture and is stored in the manager's texture Map.
   *
   * @param { String } name - The texture's name identifier.
   * @param { String } url - The texture's URL on the public file system.
   */
  loadTexture(name, url) {
    this.loader.load(url, texture => {
      this.textures.set(name, texture)
    })
  }

  /**
   * Retrieve texture from the manager's texture Map.
   *
   * @param { String } name - The texture to retrieve's name identifier.
   *
   * @return { THREE.Texture } - The retrieved texture.
   */
  getTexture(name) {
    return this.textures.get(name)
  }
}
