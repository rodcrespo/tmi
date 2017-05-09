var CollisionDetector = function(holder, entity){
  this.holder = holder;
  this.entity = entity;
  this.isColliding = false;
}


CollisionDetector.prototype.onTriggerEnter = function () {
    this.isColliding = true;
    console.log("Enter!");
    this.entity.onTriggerEnter(this.holder);
    // this.hitPoint.start();
}

CollisionDetector.prototype.onTriggerStay = function () {
    console.log("Stay!");
    this.entity.onTriggerStay(this.holder);
}

CollisionDetector.prototype.onTriggerExit = function () {
    this.isColliding = false;
    console.log("Exit!");
    this.entity.onTriggerExit(this.holder);
}


CollisionDetector.prototype.detectCollision = function (lapsedMillis) {
  var distanceRightTrigger = getNearestCollisionFrom([this.holder.getHitboxTop(), this.holder.getHitboxBottom()], new THREE.Vector3(1,  0, 0), [this.entity.plane]);
  var distanceLeftTrigger	= getNearestCollisionFrom([this.holder.getHitboxTop(), this.holder.getHitboxBottom()], new THREE.Vector3(-1,  0, 0), [this.entity.plane]);
  var distanceTopTrigger = getNearestCollisionFrom([this.holder.getHitboxLeft(), this.holder.getHitboxRight()], new THREE.Vector3(0,  1, 0), [this.entity.plane]);
  var distanceBottomTrigger	= getNearestCollisionFrom([this.holder.getHitboxLeft(), this.holder.getHitboxRight()], new THREE.Vector3(0, -1, 0), [this.entity.plane]);
  if (this.collidesWith(distanceTopTrigger, distanceRightTrigger, distanceBottomTrigger, distanceLeftTrigger, lapsedMillis)) {
    if (!this.isColliding){
      this.onTriggerEnter();
    } else {
      this.onTriggerStay();
    }
  } else {
    if (this.isColliding) {
      this.onTriggerExit()
    }
  }
}

CollisionDetector.prototype.collidesWith = function (top, right, bottom, left, lapsedMillis) {
  return triggerCollision(lapsedMillis, this.holder.getHorizontalVelocity(), left, right, this.holder.width()/2) ||
    triggerCollision(lapsedMillis, this.holder.getVerticalVelocity(), bottom, top, this.holder.height()/2)
}
