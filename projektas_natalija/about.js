const particles = [];
let w = window.innerWidth;
let h = window.innerHeight;
let logo;
let angle = 0;
let navigation;
let canvas;
let font;
let font2;
let font3;
let font4;
let skiltis;
let data;
let x;
let y;
let ilgis;
let plotis;
let numRows;
let percentage;
let numbers;
let linija;
let skaicius1;
let skaicius2;
let skaicius3;
let skaicius4;
let skaicius5;
let skaicius6;
let skaicius7;
let skaicius8;
let skaicius9;
let vienas, du, trys, keturi, penki, sesi, septyni, astuoni, devyni;
let one, two, three, four, five, six, seven, eight, nine;
let sound1;
let sound2;
let sound3;
let sound4;
let sound5;
let sound6;
let sound7;
let sound8;
let sound9;
let digits;
let digits2;
let d;
let d2;
let d3;
let d4;
let d5;
let d6;
let d7;
let d8;
let d9;

function preload() {

    font = loadFont('font/Agrandir-GrandHeavy.otf');
    font2 = loadFont('font/Agrandir-GrandLight.otf');
    font3 = loadFont('font/Agrandir-WideLight.otf');
    font4 = loadFont('font/K_WL.otf')
    font5 = loadFont('font/K_WB.otf')
    font5 = loadFont('font/K_WBL.otf')

    data = loadTable('benford distribution.csv', 'csv', 'header');

    one = loadImage('images/one.png');
    two = loadImage('images/two.png');
    three = loadImage('images/three.png');
    four = loadImage('images/four.png');
    five = loadImage('images/five.png');
    six = loadImage('images/six.png');
    seven = loadImage('images/seven.png');
    eight = loadImage('images/eight.png');
    nine = loadImage('images/nine.png');

    sound1 = createAudio('sounds/1.mp3');
    sound2 = createAudio('sounds/2.mp3');
    sound3 = createAudio('sounds/3.mp3');
    sound4 = createAudio('sounds/4.mp3');
    sound5 = createAudio('sounds/5.mp3');
    sound6 = createAudio('sounds/6.mp3');
    sound7 = createAudio('sounds/7.mp3');
    sound8 = createAudio('sounds/8.mp3');
    sound9 = createAudio('sounds/9.mp3');
}

function setup() {
    canvas = createCanvas(windowWidth, 2300, WEBGL);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    // canvas.mouseWheel(appearText);

    // canvas.parent('pasirinkimas');

    background(0);

    // SKAICIAI PO VIENA
    textFont(font4);
    fill(100, 30, 255)
    textSize(130);

    const patriclesLenght = w / 5;

    for (let i = 0; i < patriclesLenght; i++) {
        particles.push(new Particle());
    }

    skiltis = createElement('h2', 'ABOUT')
    skiltis.style('color', 'rgba(255,255,255')
    translate(-width / 2, -height / 2, 0);


    //   PASISKIRSTYMO SKAICIAI
    numRows = data.getRowCount();
    percentage = data.getColumn('percentage');
    numbers = data.getColumn('number')

    vienas = createElement('h3', numbers[0]);
    vienas.style('color', 'white');
    vienas.style('font-size', '12px');
    vienas.style('cursor', 'pointer');
    vienas.addClass("num1");
    vienas.mouseOver(overpara1);
    vienas.mouseOut(outpara1);

    du = createElement('h3', numbers[1]);
    du.style('color', 'white');
    du.style('font-size', '12px');
    du.style('cursor', 'pointer')
    du.addClass("num2");
    du.mouseOver(overpara2);
    du.mouseOut(outpara2);

    trys = createElement('h3', numbers[2]);
    trys.style('color', 'white');
    trys.style('font-size', '12px');
    trys.style('cursor', 'pointer');
    trys.addClass("num3");
    trys.mouseOver(overpara3);
    trys.mouseOut(outpara3);

    keturi = createElement('h3', numbers[3]);
    keturi.style('color', 'white');
    keturi.style('font-size', '12px');
    keturi.style('cursor', 'pointer');
    keturi.addClass("num4");
    keturi.mouseOver(overpara4);
    keturi.mouseOut(outpara4);

    penki = createElement('h3', numbers[4]);
    penki.style('color', 'white');
    penki.style('font-size', '12px');
    penki.style('cursor', 'pointer');
    penki.addClass("num5");
    penki.mouseOver(overpara5);
    penki.mouseOut(outpara5);

    sesi = createElement('h3', numbers[5]);
    sesi.style('color', 'white');
    sesi.style('font-size', '12px');
    sesi.style('cursor', 'pointer');
    sesi.addClass("num6");
    sesi.mouseOver(overpara6);
    sesi.mouseOut(outpara6);

    septyni = createElement('h3', numbers[6]);
    septyni.style('color', 'white');
    septyni.style('font-size', '12px');
    septyni.style('cursor', 'pointer');
    septyni.addClass("num7");
    septyni.mouseOver(overpara7);
    septyni.mouseOut(outpara7);

    astuoni = createElement('h3', numbers[7]);
    astuoni.style('color', 'white');
    astuoni.style('font-size', '12px');
    astuoni.style('cursor', 'pointer');
    astuoni.addClass("num8");
    astuoni.mouseOver(overpara8);
    astuoni.mouseOut(outpara8);

    devyni = createElement('h3', numbers[8]);
    devyni.style('color', 'white');
    devyni.style('font-size', '12px');
    devyni.style('cursor', 'pointer');
    devyni.addClass("num9");
    devyni.mouseOver(overpara9);
    devyni.mouseOut(outpara9);
}


//   SKAICIU PROCENTAI
function overpara1() {
    skaicius1 = createDiv(percentage[0] + '%');
    skaicius1.addClass("skaicius");
    skaicius1.style('color', 'rgba(100, 30, 255,0.8)');
    vienas.style('color', 'rgba(100, 30, 255,0.8)');
    vienas.style('font-family', 'K_WB');


}

function outpara1() {
    skaicius1.style('font-size', '0px');
    vienas.style('color', 'white');
    vienas.style('font-family', 'K_WL');

}

function overpara2() {

    skaicius2 = createDiv(percentage[1] + '%');
    skaicius2.addClass("skaicius");
    skaicius2.style('color', 'rgba(255, 30, 255,0.8)');
    du.style('color', 'rgba(255, 30, 255,0.8)');
    du.style('font-family', 'K_WB');
}

function outpara2() {
    skaicius2.style('font-size', '0px');
    du.style('color', 'white');
    du.style('font-family', 'K_WL');
}

function overpara3() {

    skaicius3 = createDiv(percentage[2] + '%');
    skaicius3.addClass("skaicius");
    skaicius3.style('color', 'rgba(10, 255, 255,0.8)');
    trys.style('color', 'rgba(10, 255, 255,0.8)');
    trys.style('font-family', 'K_WB');
}

function outpara3() {

    skaicius3.style('font-size', '0px');
    trys.style('color', 'white');
    trys.style('font-family', 'K_WL');
}

function overpara4() {

    skaicius4 = createDiv(percentage[3] + '%');
    skaicius4.addClass("skaicius");
    skaicius4.style('color', 'rgba(50, 30, 255,0.8)');
    keturi.style('color', 'rgba(50, 30, 255,0.8)');
    keturi.style('font-family', 'K_WB');
}

function outpara4() {

    skaicius4.style('font-size', '0px');
    keturi.style('color', 'white');
    keturi.style('font-family', 'K_WL');
}

function overpara5() {

    skaicius5 = createDiv(percentage[4] + '%');
    skaicius5.addClass("skaicius");
    skaicius5.style('color', 'rgba(140, 50, 255,0.8)');
    penki.style('color', 'rgba(140, 50, 255,0.8)');
    penki.style('font-family', 'K_WB');
}

function outpara5() {

    skaicius5.style('font-size', '0px');
    penki.style('color', 'white');
    penki.style('font-family', 'K_WL');
}

function overpara6() {

    skaicius6 = createDiv(percentage[5] + '%');
    skaicius6.addClass("skaicius");
    skaicius6.style('color', 'rgba(245, 145, 230,0.8)');
    sesi.style('color', 'rgba(245, 145, 230,0.8)');
    sesi.style('font-family', 'K_WB');
}

function outpara6() {
    skaicius6.style('font-size', '0px');
    sesi.style('color', 'white');
    sesi.style('font-family', 'K_WL');
}

function overpara7() {

    skaicius7 = createDiv(percentage[6] + '%');
    skaicius7.addClass("skaicius");
    skaicius7.style('color', 'rgba(103, 145, 255,0.8)');
    septyni.style('color', 'rgba(103, 145, 255,0.8)');
    septyni.style('font-family', 'K_WB');

}

function outpara7() {
    skaicius7.style('font-size', '0px');
    septyni.style('color', 'white');
    septyni.style('font-family', 'K_WL');

}

function overpara8() {

    skaicius8 = createDiv(percentage[7] + '%');
    skaicius8.addClass("skaicius");
    skaicius8.style('color', 'rgba(170, 245, 245,0.8)');
    astuoni.style('color', 'rgba(170, 245, 245,0.8)');
    astuoni.style('font-family', 'K_WB');
}

function outpara8() {
    skaicius8.style('font-size', '0px');
    astuoni.style('color', 'white');
    astuoni.style('font-family', 'K_WL');
}

function overpara9() {

    skaicius9 = createDiv(percentage[8] + '%');
    skaicius9.addClass("skaicius");
    skaicius9.style('color', 'rgba(169, 139, 252,0.8)');
    devyni.style('color', 'rgba(169, 139, 252,0.8)');
    devyni.style('font-family', 'K_WB');
}

function outpara9() {
    skaicius9.style('font-size', '0px');
    devyni.style('color', 'white');
    devyni.style('font-family', 'K_WL');
}

function draw() {


    background(0);


    // BENFORD distribution
    if (data) {

        numRows = data.getRowCount();
        percentage = data.getColumn('percentage');
        numbers = data.getColumn('number');


        for (let i = 0; i < numRows; i++) {

            push();
            translate(-width / 2, -height / 2, 0);
            // x = 270;
            x = width / 6.2
            y = 200 + (i * 30);
            ilgis = percentage[i] * width / 150;
            plotis = 3;

            if (numbers[i] == 1) {
                fill(100, 30, 255, 900);

            } else if (numbers[i] == 2) {
                fill(255, 30, 255, 900);

            } else if (numbers[i] == 3) {
                fill(10, 255, 255, 300);

            } else if (numbers[i] == 4) {
                fill(50, 30, 255, 200);

            } else if (numbers[i] == 5) {
                fill(140, 50, 255, 300);

            } else if (numbers[i] == 6) {
                fill(245, 145, 230, 300);

            } else if (numbers[i] == 7) {
                fill(103, 145, 255, 200);

            } else if (numbers[i] == 8) {
                fill(170, 245, 245);

            } else if (numbers[i] == 9) {
                fill(169, 139, 252);
            }
            rect(x, y, ilgis, plotis);
            pop();
        }
    }

    // FONAS
    push();
    translate(-width / 2, -height / 2, 0)
    translate(0, 0, 0)
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
    pop();

    // APSVIETIMAS
    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    directionalLight(250, 250, 250, -dirX, -dirY, -1);

    //   forma
    push();
    noStroke();
    fill(10, 255, 255);
    translate(-width / 2, -height / 2, 0);
    translate(width / 2 + 210, h / 2 + 80, 0)
    rotateX(120);
    rotateY(mouseX / 500)
    torus(120, 5, 100, 100)
    pop();
    //   forma2
    push();
    fill(255, 30, 255);
    noStroke();
    translate(-width / 2, -height / 2, 0);
    translate(width - 180, h / 2 - 290, 0)
    rotate(120)
    sphere(25, 100, 100);
    pop();

    // ONE
    push();
    translate(-width / 2, -height / 2, 0);
    translate(width / 2 - Math.min(500, width / 3), 1100, 0)
    rotateX(frameCount * 0.03);
    rotateY(frameCount * 0.03);
    rotateZ(frameCount * 0.01)
    texture(one);
    sphere(60, 100, 100);
    angle += 0.03;
    pop();
    d = dist(mouseX, mouseY, width / 2 - Math.min(500, width / 3), 1100);

    // TWO
    push();
    translate(-width / 2, -height / 2, 0);
    translate(width / 2, 1100, 0)
    rotateX(frameCount * 0.02);
    rotateY(frameCount * 0.02);
    rotateZ(frameCount * 0.02)
    fill(100, 30, 255)
    texture(two);
    sphere(60, 100, 100);
    angle += 0.03;
    pop();
    d2 = dist(mouseX, mouseY, width / 2, 1100);

    // THREE
    push();
    translate(-width / 2, -height / 2, 0);
    translate(width / 2 + Math.min(500, width / 3), 1100, 0)
    rotateX(frameCount * 0.04);
    rotateY(frameCount * 0.03);
    rotateZ(frameCount * 0.02)
    fill(100, 30, 255)
    texture(three);
    sphere(60, 100, 100);
    angle += 0.002;
    pop();
    d3 = dist(mouseX, mouseY, width / 2 + Math.min(500, width / 3), 1100);


    // FOUR
    push();
    translate(-width / 2, -height / 2, 0);
    translate(width / 2 - Math.min(500, width / 3), 1400, 0)
    rotateX(frameCount * 0.03);
    rotateY(frameCount * 0.01);
    rotateZ(frameCount * 0.02)
    fill(100, 30, 255)
    texture(four);
    sphere(60, 100, 100);
    angle += 0.002;
    pop();
    d4 = dist(mouseX, mouseY, width / 2 - Math.min(500, width / 3), 1400);


    // FIVE
    push();
    translate(-width / 2, -height / 2, 0);
    translate(width / 2, 1400, 0)
    rotateX(frameCount * 0.02);
    rotateY(frameCount * 0.01);
    rotateZ(frameCount * 0.02)
    fill(100, 30, 255)
    texture(five);
    sphere(60, 100, 100);
    angle += 0.002;
    pop();
    d5 = dist(mouseX, mouseY, width / 2, 1400);


    // six
    push();
    translate(-width / 2, -height / 2, 0);
    translate(width / 2 + Math.min(500, width / 3), 1400, 0)
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.02);
    rotateZ(frameCount * 0.02)
    fill(100, 30, 255)
    texture(six);
    sphere(60, 100, 100);
    angle += 0.002;
    pop();
    d6 = dist(mouseX, mouseY, width / 2 + Math.min(500, width / 3), 1400);


    // seven
    push();
    translate(-width / 2, -height / 2, 0);
    translate(width / 2 - Math.min(500, width / 3), 1700, 0)
    rotateX(frameCount * 0.02);
    rotateY(frameCount * 0.01);
    rotateZ(frameCount * 0.03)
    texture(seven);
    sphere(60, 100, 100);
    angle += 0.03;
    pop();
    d7 = dist(mouseX, mouseY, width / 2 - Math.min(500, width / 3), 1700);


    // eight
    push();
    translate(-width / 2, -height / 2, 0);
    translate(width / 2, 1700, 0)
    rotateX(frameCount * 0.03);
    rotateY(frameCount * 0.01);
    rotateZ(frameCount * 0.01)
    texture(eight);
    sphere(60, 100, 100);
    angle += 0.001;
    pop();
    d8 = dist(mouseX, mouseY, width / 2, 1700);

    // nine
    push();
    translate(-width / 2, -height / 2, 0);
    translate(width / 2 + Math.min(500, width / 3), 1700, 0)
    rotateX(frameCount * 0.03);
    rotateY(frameCount * 0.01);
    rotateZ(frameCount * 0.05)
    texture(nine);
    sphere(60, 100, 100);
    angle += 0.001;
    pop();
    d9 = dist(mouseX, mouseY, width / 2 + Math.min(500, width / 3), 1700);
}

function mouseClicked() {
    if (d < 60) {
        sound1.play();
    } else if (d > 60) {
        sound1.stop();
    }
    if (d2 < 60) {
        sound2.play();
    } else if (d2 > 60) {
        sound2.stop();
    }
    if (d3 < 60) {
        sound3.play();
    } else if (d3 > 60) {
        sound3.stop();
    }
    if (d4 < 60) {
        sound4.play();
    } else if (d4 > 60) {
        sound4.stop();
    }
    if (d5 < 60) {
        sound5.play();
    } else if (d5 > 60) {
        sound5.stop();
    }
    if (d6 < 60) {
        sound6.play();
    } else if (d6 > 60) {
        sound6.stop();
    }
    if (d7 < 60) {
        sound7.play();
    } else if (d7 > 60) {
        sound7.stop();
    }
    if (d8 < 60) {
        sound8.play();
    } else if (d8 > 60) {
        sound8.stop();
    }
    if (d9 < 60) {
        sound9.play();
    } else if (d9 > 60) {
        sound9.stop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight * 2.5);
}