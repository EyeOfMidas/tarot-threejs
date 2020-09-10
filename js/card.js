import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.120/build/three.module.js';
export class Card {

    constructor(imageFileName, position, rotation) {
        this.imageFileName = imageFileName;
        this.mesh = null;
        this.position = position;
        this.rotation = rotation;
    }

    load(textureLoader) {
        return new Promise((resolve, reject) => {
            textureLoader.load(`./cards/${this.imageFileName}`, (texture) => {
                let imageWidth = texture.image.width;
                let imageHeight = texture.image.height;
                let aspectRatio = imageWidth / imageHeight;
                let cardMaterial = new THREE.MeshBasicMaterial({ map: texture });
                let cardGeometry = new THREE.PlaneGeometry(3 * aspectRatio, 3);

                this.mesh = new THREE.Mesh(cardGeometry, cardMaterial);
                this.mesh.rotation.z = this.rotation.z;
                this.mesh.position.x = this.position.x;
                this.mesh.position.y = this.position.y;


                resolve(this.mesh);
            });
        })
    }

    getMesh() {
        return this.mesh;
    }

}
