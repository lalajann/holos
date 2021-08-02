const particles = [];
let w = window.innerWidth;
let h = window.innerHeight;
let logo;
let navigation;
let canvas;
let font;
let vehicles = [];
let composition = true;
var skaiciai = [];
let points;
let bounds;
let posx;
let posy;

function preload() {
    font = loadFont('font/K_WL.otf')
    font2 = loadFont('font/Agrandir-GrandLight.otf');
    font5 = loadFont('font/K_WB.otf')
}

function setup() {
    canvas = createCanvas(w, h, WEBGL);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');

    // NUSTATO FONTO TASKUS

    let bounds = font2.textBounds("holos", 0, 0, 235);
    let posx = innerWidth / 2 - bounds.w / 2;
    let posy = innerHeight / 2 + bounds.h / 2 - 50;


    points = font2.textToPoints('holos', posx, posy, 235, {
        sampleFactor: 0.2,

    })
    textAlign(CENTER, CENTER)
    for (let i = 0; i < points.length; i++) {

        let pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);

    }


    const patriclesLenght = Math.floor(window.innerWidth / 5);
    for (let i = 0; i < patriclesLenght; i++) {
        particles.push(new Particle());
    }

    let tekstas1 = createElement('h1', 'everything around you is numbers')
    tekstas1.style('color', 'rgba(100, 20, 255,0.8)')
    tekstas1.position(width / 2, height / 2 + 150, 0)
}


function draw() {
    background(0);
    translate(-width / 2, -height / 2, 0);
    push();
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
    pop();

    // LOGO

    for (let i = 0; i < vehicles.length; i++) {

        let v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }

}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}