let w = window.innerWidth;
let h = window.innerHeight;
let canvas;
let textfield;
let output;
let button;
let buttonHome;
let masyvas = [];
let visasMasyvas = [];
let vienas;
let du;
let trys;
let keturi;
let penki;
let sesi;
let septyni;
let astuoni;
let devyni;
let myFont;
let arr;
let angle = 0;
let radius = 500;
let sound1;
let sound2;
let sound3;
let sound4;
let sound5;
let sound6;
let sound7;
let sound8;
let sound9;
let garsai = [];
let play = false;
let b_one;
let b_two;
let b_three;
let b_four;
let b_five;
let b_six;
let b_seven;
let b_eight;
let b_nine;
const particles = [];
let pasiskirstymas = [vienas, du, trys, keturi, penki, sesi, septyni, astuoni, devyni];
let pirmasSkaicius = [];
const pY = h - 100;
const pX = -850;
let fonas = true;
let garsas;
let numRows;
let percentage;
let numbers;
let data;
let pavadinimas;

function preload() {
    // myFont = loadFont('font/Canaro-LightDEMO.otf')
    sound0 = loadSound('sounds/silence.mp3');
    sound1 = loadSound('sounds/1.mp3');
    sound2 = loadSound('sounds/2.mp3');
    sound3 = loadSound('sounds/3.mp3');
    sound4 = loadSound('sounds/4.mp3');
    sound5 = loadSound('sounds/5.mp3');
    sound6 = loadSound('sounds/6.mp3');
    sound7 = loadSound('sounds/7.mp3');
    sound8 = loadSound('sounds/8.mp3');
    sound9 = loadSound('sounds/9.mp3');
    garsai = [sound0, sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9]
    font = loadFont('font/K_WL.otf')
    font2 = loadFont('font/K_WB.otf')
    data = loadTable('benford distribution.csv', 'csv', 'header');
}


function setup() {
    background(0);
    canvas = createCanvas(w, h, WEBGL);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');

    fft = new p5.FFT();



    //   PASISKIRSTYMO SKAICIAI
    numRows = data.getRowCount();
    percentage = data.getColumn('percentage');
    numbers = data.getColumn('number')



    textfield = createInput('  enter digits 1-9');
    textfield.addClass("input");
    textfield.mouseClicked(istrink);
    translate(0, 0, 0);


    button3 = createButton('play');
    button3.addClass("playbutton3");
    button3.mouseClicked(spauskSubmit);

    textfield.changed(ivestiSkaiciai);

    button4 = createButton('stop');
    button4.addClass("playbutton3");
    button4.hide();
    button4.mouseClicked(function() {
        play = false
        if (button4.hide()) {
            button3.show();
        }
    });

    button = createButton('save');
    button.addClass("playbutton");
    button.mouseClicked(function() {
        save('Your digits');
    });

    setInterval(function() {
        if (play == false) {
            return
        }

        taimeris += 100
        if (taimeris > 700) {
            taimeris = 0
            groti()
        }
    }, 100)

    const patriclesLenght = Math.floor(window.innerWidth / 5);

    for (let i = 0; i < patriclesLenght; i++) {
        particles.push(new Particle());
    }

    skiltis = createElement('h2', 'CREATE')
    skiltis.style('color', 'rgba(255,255,255')
    translate(0, 0, 0);

    // PAAISKINIMAS
    textFont(font);
    fill(255)
    textSize(16);
    stroke(255)

}

function istrink() {
    textfield.value('');
    button4.hide();
    button3.show();
    play = false
}

function spauskSubmit() {

    //ARR TAI SKAICIU MASYVAS
    play = true
    if (button3.hide()) {
        button4.show();
    }
    masyvas = textfield.value();
    arr = masyvas.replace(/ /g, '').split('');
    console.log(arr);

    //VISAS MASYVAS - MUZIKAI
    visasMasyvas = int(arr);
    console.log(visasMasyvas);

    v = visasMasyvas.filter(x => (x == 1))
    vienas = v.length
    d = visasMasyvas.filter(x => (x == 2))
    du = d.length
    t = visasMasyvas.filter(x => (x == 3))
    trys = t.length
    k = visasMasyvas.filter(x => (x == 4))
    keturi = k.length
    p = visasMasyvas.filter(x => (x == 5))
    penki = p.length
    s = visasMasyvas.filter(x => (x == 6))
    sesi = s.length
    sep = visasMasyvas.filter(x => (x == 7))
    septyni = sep.length
    a = visasMasyvas.filter(x => (x == 8))
    astuoni = a.length
    dev = visasMasyvas.filter(x => (x == 9))
    devyni = dev.length

    // PASISKIRSTYMAS PROCENTAIS
    pasiskirstymas = [vienas, du, trys, keturi, penki, sesi, septyni, astuoni, devyni];
    console.log(pasiskirstymas);

    b_one = round(pasiskirstymas[0] * 100 / visasMasyvas.length, 1)
    b_two = round(pasiskirstymas[1] * 100 / visasMasyvas.length, 1)
    b_three = round(pasiskirstymas[2] * 100 / visasMasyvas.length, 1)
    b_four = round(pasiskirstymas[3] * 100 / visasMasyvas.length, 1)
    b_five = round(pasiskirstymas[4] * 100 / visasMasyvas.length, 1)
    b_six = round(pasiskirstymas[5] * 100 / visasMasyvas.length, 1)
    b_seven = round(pasiskirstymas[6] * 100 / visasMasyvas.length, 1)
    b_eight = round(pasiskirstymas[7] * 100 / visasMasyvas.length, 1)
    b_nine = round(pasiskirstymas[8] * 100 / visasMasyvas.length, 1)
    console.log(b_one, b_two, b_three, b_four, b_five, b_six, b_seven, b_eight, b_nine);

}

function ivestiSkaiciai() {

}



var taimeris = 0

function groti() {
    let i = visasMasyvas.shift()
    garsas = garsai[i]
    console.log("Grojam garsa " + i)

    garsas.play()

}

function keyPressed() {

    if (keyCode == 13) {
        spauskSubmit();
    }
    if (keyCode == 32) {
        spauskSubmit();
    }
}

function draw() {

    background(0);
    if (fonas) {
        push();
        translate(-width / 2, -height / 2, 0);
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            p.checkParticles(particles.slice(index));
        });
        pop();
    }

    if (data) {
        numRows = data.getRowCount();
        percentage = data.getColumn('percentage');
        numbers = data.getColumn('number');


        for (let i = 0; i < numRows; i++) {

            push();
            translate(-width / 2, -height / 2, 0);
            x = 120;
            y = innerHeight - 100 + (i * 7);
            ilgis = percentage[i] * 2;
            strokeWeight(1)
            noFill()
            stroke(255, 255, 255, 10);
            line(x, y, -ilgis + x, y);
            pop();

        }
    }


    // PAAISKINIMAS
    push();

    let atstumas = dist(mouseX, mouseY, 150, height - 70)
    if (atstumas < 80) {
        push();
        translate(-width / 2, -height / 2, 0);
        textFont(font),
            fill(255, 255, 255),
            textSize(14)
        pavadinimas = text('YOUR DATA DISTRIBUTION', 50, innerHeight - 480)
        textSize(14)
        realtime = text('digits from 1 to 9', 50, innerHeight - 460)

        let metai = year();
        let menuo = month();
        let diena = day();
        textFont(font);
        fill(255, 255, 255)
        textSize(14);
        text((metai + '-' + menuo + '-' + diena), 50, innerHeight - 440);
        // 1

        if (b_one <= 31.60 && b_one >= 28.59) {
            textFont(font)
            fill(255, 255, 255)
            textSize(24)
            text('1.', 50, innerHeight - 380)
        } else {
            textFont(font)
            fill(255, 255, 255)
            textSize(24)
            text('1.', 50, innerHeight - 380)
        }

        fill(100, 30, 255),
            textSize(30)
        textFont(font2)
        proc1 = text(b_one + '%', 90, innerHeight - 380);
        // proc1.addClass("proc1")

        // 2
        if (b_two <= 18.48 && b_two >= 16.72) {
            textFont(font)
            fill(255, 255, 255)
            textSize(24)
            text('2.', 50, innerHeight - 350)
        } else {
            textFont(font),
                fill(255, 255, 255)
            textSize(24)
            text('2.', 50, innerHeight - 350)
        }

        fill(255, 30, 255),
            textSize(30)
        textFont(font2)
        proc2 = text(b_two + '%', 90, innerHeight - 350);

        // 3
        if (b_three <= 13.13 && b_three >= 11.87) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('3.', 50, innerHeight - 320)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('3.', 50, innerHeight - 320)
        }

        fill(10, 255, 255),
            textSize(30)
        textFont(font2)
        proc3 = text(b_three + '%', 90, innerHeight - 320);

        // 4
        if (b_four <= 10.18 && b_four >= 9.21) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('4.', 50, innerHeight - 290)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('4.', 50, innerHeight - 290)
        }

        fill(50, 30, 255),
            textSize(30)
        textFont(font2)
        proc4 = text(b_four + '%', 90, innerHeight - 290);

        // 5
        if (b_five <= 8.29 && b_five >= 7.50) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('5.', 50, innerHeight - 260)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('5.', 50, innerHeight - 260)
        }

        fill(140, 50, 255),
            textSize(30)
        textFont(font2)
        proc5 = text(b_five + '%', 90, innerHeight - 260);

        // 6
        if (b_six <= 7.03 && b_six >= 6.36) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('6.', 50, innerHeight - 230)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('6.', 50, innerHeight - 230)
        }

        fill(245, 145, 230),
            textSize(30)
        textFont(font2)
        proc6 = text(b_six + '%', 90, innerHeight - 230);

        // 7
        if (b_seven <= 6.09 && b_seven >= 5.51) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('7.', 50, hinnerHeight - 200)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('7.', 50, innerHeight - 200)
        }

        fill(103, 145, 255),
            textSize(30)
        textFont(font2)
        proc7 = text(b_seven + '%', 90, innerHeight - 200);

        // 8
        if (b_eight <= 5.36 && b_eight >= 4.84) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('8.', 50, innerHeight - 170)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('8.', 50, innerHeight - 170)
        }

        fill(170, 245, 245),
            textSize(30)
        textFont(font2)
        proc8 = text(b_eight + '%', 90, innerHeight - 170);

        // 9
        if (b_nine <= 4.83 && b_nine >= 4.37) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('9.', 50, innerHeight - 140)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('9.', 50, innerHeight - 140)
        }

        fill(169, 139, 252),
            textSize(30)
        textFont(font2)
        proc9 = text(b_nine + '%', 90, innerHeight - 140);
    }
    pop();

    //  GRAFIKAS
    for (let i = 0; i < pasiskirstymas.length / 9; i++) {
        push();
        noFill();
        strokeWeight(1);
        translate(-width / 2, -height / 2, 0);
        if (pasiskirstymas[0]) {
            stroke(100, 30, 255);
            line(125, (i * 5) + innerHeight - 100, pasiskirstymas[0] * 2 + 125, (i * 5) + innerHeight - 100);
        }
        if (pasiskirstymas[1]) {
            stroke(255, 30, 255, 900);
            line(125, (i * 5) + 7 + innerHeight - 100, pasiskirstymas[1] * 2 + 125, (i * 5) + 7 + innerHeight - 100);
        }
        if (pasiskirstymas[2]) {
            stroke(10, 255, 255, 300);
            line(125, (i * 5) + 14 + innerHeight - 100, pasiskirstymas[2] * 2 + 125, (i * 5) + 14 + innerHeight - 100);
        }
        if (pasiskirstymas[3]) {
            stroke(50, 30, 255, 200);
            line(125, (i * 5) + 21 + innerHeight - 100, pasiskirstymas[3] * 2 + 125, (i * 5) + 21 + innerHeight - 100);
        }
        if (pasiskirstymas[4]) {
            stroke(140, 50, 255, 300);
            line(125, (i * 5) + 28 + innerHeight - 100, pasiskirstymas[4] * 2 + 125, (i * 5) + 28 + innerHeight - 100);
        }
        if (pasiskirstymas[5]) {
            stroke(245, 145, 230, 300);
            line(125, (i * 5) + 35 + innerHeight - 100, pasiskirstymas[5] * 2 + 125, (i * 5) + 35 + innerHeight - 100);
        }
        if (pasiskirstymas[6]) {
            stroke(103, 145, 255, 200);
            line(125, (i * 5) + 42 + innerHeight - 100, pasiskirstymas[6] * 2 + 125, (i * 5) + 42 + innerHeight - 100);
        }
        if (pasiskirstymas[7]) {
            stroke(170, 245, 245, 300);
            line(125, (i * 5) + 49 + innerHeight - 100, pasiskirstymas[7] * 2 + 125, (i * 5) + 49 + innerHeight - 100);
        }
        if (pasiskirstymas[8]) {
            stroke(169, 139, 252, 900);
            line(125, (i * 5) + 56 + innerHeight - 100, pasiskirstymas[8] * 2 + 125, (i * 5) + 56 + innerHeight - 100);
        }
        pop();
    }




    if (!masyvas) {
        return;
    }

    let offset = 200;
    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");
    let mapMid = map(mid, 0, 255, -radius, radius);
    let mapTreble = map(offset, 0, 255, -radius, radius);
    let scaleTreble = map(treble, 0, 255, 1, 1.5);
    let mapbass = map(bass, 0, 255, -100, 800);
    let scalebass = map(bass, 0, 255, 0.5, 2);
    scale(scalebass);

    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    directionalLight(250, 250, 250, -dirX, -dirY, -1);
    push();
    // VIENAS
    for (var j = 0; j < pasiskirstymas[0]; j++) {

        translate(0, 0, 0);
        noStroke();
        fill(100, 30, 255, 300);
        rotateY(frameCount / 2 * 0.001);
        torus(j * 15 + 50, 5, 100, 100);
    }

    // DU
    for (var a = 0; a < pasiskirstymas[1]; a++) {

        noFill();
        strokeWeight(1);
        stroke(255, 30, 255);
        rotate(mapTreble / 3);
        rotateZ(mouseX / 1000)
        translate(0, 0, 0);
        line(a * 2 + 20, radius / 2, a + 20 + random(-1, 1), radius / 2 + 20);
    }

    // TRYS
    for (var b = 0; b < pasiskirstymas[2]; b++) {
        strokeWeight(2);
        noFill();
        stroke(10, 255, 255, 300);
        rotate(mapTreble / 4);
        translate(0, 0, 0);
        rotateX(mouseX / 1000);
        circle((b * 2 + 20), radius / 100, 3)
    }

    // KETURI
    for (var c = 0; c < pasiskirstymas[3]; c++) {
        strokeWeight(2);
        noFill();
        stroke(50, 30, 255, 200);
        rotate(mapTreble / 2);
        // rotateZ(100)
        // translate(10, 50, 50)
        // rotateX(millis() / 10000);
        rotateZ(mouseY / 1000);
        circle((c * 2 + 20), radius / 50, 4)

    }
    // PENKI
    for (var d = 0; d < pasiskirstymas[4]; d++) {
        strokeWeight(2);
        noFill();
        stroke(140, 50, 255, 300);
        rotate(mapTreble / 4);
        rotateZ(mouseY / 1000);
        circle((d * 2 + 20), radius / 10, 5)
    }
    // SESI
    for (var e = 0; e < pasiskirstymas[5]; e++) {
        strokeWeight(2);
        noFill();
        stroke(245, 145, 230, 300);
        rotate(mapTreble / 4);
        rotateZ(mouseY / 1000);
        circle((e * 2 + 20), radius / 5, 5)
    }
    // SEPTYNI
    for (var f = 0; f < pasiskirstymas[6]; f++) {
        strokeWeight(2);
        noFill();
        stroke(103, 145, 255, 200);
        rotate(mapTreble / 4);
        rotateZ(mouseY / 1000);
        circle((f * 2 + 20), radius / 3, 5)
    }
    // ASTUONI
    for (var g = 0; g < pasiskirstymas[7]; g++) {
        strokeWeight(2);
        noFill();
        stroke(170, 245, 245, 300);
        rotate(mapTreble / 4);
        rotateZ(mouseY / 1000)
        circle((g * 2 + 20), radius / 2, 5, 30)

    }
    // DEVYNI
    push()
    for (var n = 0; n < pasiskirstymas[8]; n++) {

        fill(169, 139, 252, 900);
        noStroke();
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 65));
        translate(n * 5 + 200, 300, n * 100);
        rotate(120);
        rotateY(mapTreble / 2);
        sphere(n + 10);

    }

    pop()
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}