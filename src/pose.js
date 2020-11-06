let prev_time;
let control_value;
let ltrace = [];
let rtrace = [];
let sampler = 0;

function drawKeypoints() {
    let lwrist = pose.leftWrist;
    let rwrist = pose.rightWrist;

    if (sampler % 5 == 0) {
        new CursorParticles(lwrist.x, lwrist.y, ltrace);
        new CursorParticles(rwrist.x, rwrist.y, rtrace);   
    }
    sampler += 1;

    ltrace.forEach(particle => particle.show());
    rtrace.forEach(particle => particle.show());

    // for (let j = 0; j < pose.keypoints.length; j++) {
    //     // A keypoint is an object describing a body part (like rightArm or leftShoulder)
    //     let keypoint = pose.keypoints[j];
    //     // Only draw an ellipse is the pose probability is bigger than 0.2
    //     if (keypoint.score > 0.2) {
    //         fill(255, 0, 0);
    //         noStroke();
    //         ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
    //     }
    // }
}

function take_gestures() {
    if (millis() - prev_time > 500) {
        prev_time = millis();

        move_bubble();
    }
}

class CursorParticles {
    constructor(x, y, arr) {
        this.color = 100;
        this.a = 150;
        this.x = x;
        this.y = y;
        this.arr = arr;
        this.arr.push(this);
    }

    show() {
        // push();
        // stroke(255, 0, 0, this.a)
        // strokeWeight(10);
        // point(this.xx, this.yy)
        // this.die();
        // pop();
        if (this.arr.indexOf(this) >= 4) {
            push();
            noFill();
            stroke(255, 0, 0, this.a)
            strokeWeight(5);
            beginShape();
            curveVertex(this.arr[this.arr.indexOf(this) - 3].x, this.arr[this.arr.indexOf(this) - 3].y);
            curveVertex(this.arr[this.arr.indexOf(this) - 2].x, this.arr[this.arr.indexOf(this) - 2].y);
            curveVertex(this.arr[this.arr.indexOf(this) - 1].x, this.arr[this.arr.indexOf(this) - 1].y);
            curveVertex(this.arr[this.arr.indexOf(this)].x, this.arr[this.arr.indexOf(this)].y);
            endShape();
            this.die();
            pop();
        }
    }

    die() {
        if (this.a > 0) {
            this.a -= 4;
        } else {
            this.arr.splice(0, this.arr.indexOf(this) + 1)
        }
    }
}