let cam;
let poseNet;
let pose, prev_pose;
let font;
let cnv;
window.addEventListener('wheel', { passive: false })

function preload() {
	prev_time = millis();
	prepare_words();
	generate_colors();
	font = loadFont('assets/SyneMono-Regular.ttf');

	let constraints = {
		video: {
			mandatory: {
				minWidth: windowWidth / 2
			},
			optional: [{ maxFrameRate: 30 }]
		},
		audio: false
	}

	cam = createCapture(constraints, (stream) => {
		console.log('camera loaded');
	});
}

function setup() {
	cnv = createCanvas(windowWidth, windowHeight);
	textAlign(CENTER, CENTER);
	textFont(font);
	
	cam.size(width, height);

	poseNet = ml5.poseNet(cam, () => {});

	poseNet.on('pose', (result) => {
		if (result[0] != undefined) {
			pose = result[0].pose;
			if (prev_pose == undefined) {
				prev_pose = pose;
			}
			// console.log(result[0].pose);
		}
	})

	cam.hide();

	bubbles_init();
}

function draw() {
	// the function that works before the user enters the first keyword
	listenSearch();

	if (searched && words != undefined) {
		push();
		translate(cam.width, 0);
		scale(-1, 1);
		image(cam, 0, 0, width, height);
		drawKeypoints();
		take_gestures();
		pop();

		// if the number of bubbles on the screen is ever smaller than 20
		// get new ones
		generate_bubbles();
		// the function that makes the bubble move
		show_bubbles();
		// detect bubble collision
		detect_collision();
	}

    var a = mouseConstraint.constraint.pointA;
    var bodyB = mouseConstraint.constraint.bodyB;
    if (bodyB) {
        cursor('grab');
        strokeWeight(2);
        stroke(255, 20);
        line(a.x, a.y, bodyB.position.x, bodyB.position.y);
        bodyB.active = true
    } else {
        cursor('');
    }
}
