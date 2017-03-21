function screen2WorldPoint (cameraObject, screenPoint) {
    var worldPoint = new THREE.Vector3();
    worldPoint.set(
        (screenPoint.x / window.innerWidth) * 2 - 1,
        -(screenPoint.y / window.innerHeight) * 2 + 1,
        1
    );
    worldPoint.unproject(cameraObject);
    var dir = worldPoint.sub(cameraObject.position).normalize();

    return cameraObject.position.clone().add(dir.multiplyScalar(- cameraObject.position.z / dir.z));
};