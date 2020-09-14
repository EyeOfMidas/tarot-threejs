import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.120/build/three.module.js';
export class Card {

    constructor(id, imageFileName, position, rotation) {
        this.id = id;
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
                this.mesh.targetRotation = new THREE.Vector3(this.rotation.x, this.rotation.y, this.rotation.z);
                this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
                this.mesh.targetPosition = new THREE.Vector3(this.position.x, this.position.y, this.position.z);
                this.mesh.cardId = this.id;


                resolve(this);
            });
        })
    }

    getMesh() {
        return this.mesh;
    }
}
