function move_bubble() {
    var speed_x = 0,
        speed_y = 0;

    var c1 = width / 4;
    var c2 = height / 4;
    // normally range from 1 to 2
    // the larger the control value, the larger distance we require the user to move.
    control_value = (pose.leftShoulder.x - pose.rightShoulder.x) / (pose.leftEar.x - pose.rightEar.x) / 1.5;

    // left wrist moving in/out
    if ((pose.leftWrist.x - prev_pose.leftWrist.x) / control_value > pose.leftEar.x - pose.rightEar.x) {
        for (let bi = 0; bi < bubbles.length; bi++) {
            if (bubbles[bi].position.x < width - prev_pose.leftWrist.x) {
                var dist_control_x = Math.exp(Math.abs(bubbles[bi].position.x - (2 * width - pose.leftWrist.x - prev_pose.leftWrist.x) / 2) / c1);
                var dist_control_y = Math.exp(Math.abs(bubbles[bi].position.y - (pose.leftWrist.y + prev_pose.leftWrist.y) / 2) / c2);

                speed_x = -2 * (pose.leftWrist.x - prev_pose.leftWrist.x) / (pose.leftEar.x - pose.rightEar.x) * control_value / dist_control_x;
                speed_y = 2 * (pose.leftWrist.y - prev_pose.leftWrist.y) / (pose.leftEar.x - pose.rightEar.x) * control_value / dist_control_y;
                Matter.Body.setVelocity(bubbles[bi], { x: speed_x, y: speed_y });
            }
        }
    } else if ((prev_pose.leftWrist.x - pose.leftWrist.x) / control_value * 1.3 > pose.leftEar.x - pose.rightEar.x) {
        for (let bi = 0; bi < bubbles.length; bi++) {
            if (width - prev_pose.leftWrist.x - 200 < bubbles[bi].position.x && bubbles[bi].position.x < width / 2) {
                var dist_control_x = Math.exp(Math.abs(bubbles[bi].position.x - (2 * width - pose.leftWrist.x - prev_pose.leftWrist.x) / 2) / c1);
                var dist_control_y = Math.exp(Math.abs(bubbles[bi].position.y - (pose.leftWrist.y + prev_pose.leftWrist.y) / 2) / c2);

                speed_x = 2 * (prev_pose.leftWrist.x - pose.leftWrist.x) / (pose.leftEar.x - pose.rightEar.x) * control_value / dist_control_x;
                speed_y = -2 * (pose.leftWrist.y - prev_pose.leftWrist.y) / (pose.leftEar.x - pose.rightEar.x) * control_value / dist_control_y;
                Matter.Body.setVelocity(bubbles[bi], { x: speed_x, y: speed_y });
            }
        }
    }

    // right wrist moving in/out
    if ((prev_pose.rightWrist.x - pose.rightWrist.x) / control_value > pose.leftEar.x - pose.rightEar.x) {
        for (let bi = 0; bi < bubbles.length; bi++) {
            if (bubbles[bi].position.x > width - prev_pose.rightWrist.x) {
                var dist_control_x = Math.exp(Math.abs(bubbles[bi].position.x - (2 * width - pose.rightWrist.x - prev_pose.rightWrist.x) / 2) / c1);
                var dist_control_y = Math.exp(Math.abs(bubbles[bi].position.y - (pose.rightWrist.y + prev_pose.rightWrist.y) / 2) / c2);

                speed_x = -2 * (pose.rightWrist.x - prev_pose.rightWrist.x) / (pose.leftEar.x - pose.rightEar.x) * control_value / dist_control_x;
                speed_y = 2 * (pose.rightWrist.y - prev_pose.rightWrist.y) / (pose.leftEar.x - pose.rightEar.x) * control_value / dist_control_y;
                Matter.Body.setVelocity(bubbles[bi], { x: speed_x, y: speed_y });
            }
        }
    } else if ((pose.rightWrist.x - prev_pose.rightWrist.x) / control_value * 1.3 > pose.leftEar.x - pose.rightEar.x) {
        for (let bi = 0; bi < bubbles.length; bi++) {
            if (width / 2 < bubbles[bi].position.x && bubbles[bi].position.x < width - prev_pose.rightWrist.x + 200) {
                var dist_control_x = Math.exp(Math.abs(bubbles[bi].position.x - (2 * width - pose.rightWrist.x - prev_pose.rightWrist.x) / 2) / c1);
                var dist_control_y = Math.exp(Math.abs(bubbles[bi].position.y - (pose.rightWrist.y + prev_pose.rightWrist.y) / 2) / c2);
                4
                speed_x = -2 * (pose.rightWrist.x - prev_pose.rightWrist.x) / (pose.leftEar.x - pose.rightEar.x) * control_value / dist_control_x;
                speed_y = 2 * (pose.rightWrist.y - prev_pose.rightWrist.y) / (pose.leftEar.x - pose.rightEar.x) * control_value / dist_control_y;
                Matter.Body.setVelocity(bubbles[bi], { x: speed_x, y: speed_y });
            }
        }
    }


    prev_pose = pose;
}