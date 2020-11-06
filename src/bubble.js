var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Events = Matter.Events;

var engine;
var world;
var bubbles = [];
var entering_bubbles = [];

var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var mouseConstraint;

function bubbles_init() {

    engine = Engine.create();
    world = engine.world;
    engine.world.gravity.y = 0;

    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
        }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    World.add(world, mouseConstraint);

    Engine.run(engine);
}

function generate_bubbles() {
    if (bubbles.length < 15) {
        if (words.length >= 1) {
            var word = words.pop();
            let b = make_bubble(word.length * 12);
            World.add(world, b);
            words_in_bubble.push(word);
            bubbles.push(b);
        }
    }

    backup_words();
}

function make_bubble(d) {
    var params = {
        restitution: 0.5,
        friction: 0.3
    };
    const start_options = [
        [-50, random(height), 4, 0],
        [random(width), height + 50, 0, -4],
        [width + 50, random(height), -4, 0]
    ];
    let bubble;
    // let bubble = Bodies.circle(random(width), height + 50, d, params);
    var starting = Math.floor(Math.random() * 3);
    bubble = Bodies.circle(start_options[starting][0], start_options[starting][1], d, params);
    bubble.starting = starting;
    Matter.Body.setVelocity(bubble, { x: start_options[starting][2], y:  start_options[starting][3]})

    bubble.r = 0;
    bubble.g = 0;
    bubble.b = 0;
    bubble.a = 150;
    bubble.color_choice = Math.floor(Math.random() * colors.length);
    bubble.color_init = false;

    return bubble;
}

function show_bubbles() {
    for (var i = 0; i < bubbles.length; i++) {
        var circle = bubbles[i];
        var pos = circle.position;
        var r = circle.circleRadius;

        push();
        translate(pos.x, pos.y);
        noStroke();

        fill(color(circle.r, circle.g, circle.b, circle.a));
        ellipse(0, 0, r * 2);

        push();
        textSize(30);
        fill(54);
        text(words_in_bubble[i], 2, 2)
        fill(255);
        text(words_in_bubble[i], 0, 0);
        pop();

        pop();
        circle.active = false;

        if (pos.x > width + 50 || pos.x < -50 || pos.y > height + 50 || pos.y < 0) {
            World.remove(world, circle);
            bubbles.splice(i, 1);
            words_in_bubble.splice(i, 1);
        }
    }
}

function detect_collision() {
    Events.on(engine, 'collisionStart', function (event) {
        var pairs = event.pairs;

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            [pair.bodyA, pair.bodyB].forEach(b => {
                if (!b.color_init) {
                    b.r = colors[b.color_choice][0];
                    b.g = colors[b.color_choice][1];
                    b.b = colors[b.color_choice][2];
                    b.color_init = true;
                }
            });
            pair.bodyA.a = 200;
            pair.bodyB.a = 200;
        }
    });

    Events.on(engine, 'collisionActive', function (event) {
        var pairs = event.pairs;

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            pair.bodyA.a = 200;
            pair.bodyB.a = 200;

        }
    });

    Events.on(engine, 'collisionEnd', function (event) {
        var pairs = event.pairs;

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            pair.bodyA.a = 150;
            pair.bodyA.a = 150;
        }
    });
}