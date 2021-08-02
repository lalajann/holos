let pasiskirstymas = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let dydis = [];
let taskai = [];
let pirmasSkaicius = [];
let countries;
let radius = 500;
let visasMasyvas = [];
let w = window.innerWidth;
let h = window.innerHeight;
let angle = 0;
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
let button;
let play = false
let b_one;
let b_two;
let b_three;
let b_four;
let b_five;
let b_six;
let b_seven;
let b_eight;
let b_nine;
let proc;
let canvas;
const particles = [];
let fonas = true;
let font;
let numRows;
let percentage;
let numbers;
let pavadinimas;
let data1;
let c;

const pY = h - 100;
const pX = 125;
let url = 'https://github.com/samayo/country-json/blob/master/src/country-by-population.json'

function preload() {

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
    font = loadFont('font/K_WL.otf');
    font2 = loadFont('font/K_WB.otf');
    data1 = loadTable('benford distribution.csv', 'csv', 'header');

}

function setup() {

    canvas = createCanvas(w, h, WEBGL);
    // translate(w / 2, h / 2)
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    atnaujinkData();


    fft = new p5.FFT();

    //   PASISKIRSTYMO SKAICIAI
    numRows = data1.getRowCount();
    percentage = data1.getColumn('percentage');
    numbers = data1.getColumn('number')


    button1 = createButton('data');
    button1.addClass("playbutton3");
    translate(0, 0, 0)
    button1.mouseClicked(showStatistika);


    button2 = createButton('close');
    button2.addClass("playbutton3");
    translate(0, 0, 0)
    button2.mouseClicked(hideStatistika);
    button2.hide();


    button3 = createButton('play');
    button3.addClass("playbutton2");
    translate(0, 0, 0)
    button3.mouseClicked(function() {
        play = true
        if (button3.hide()) {
            button4.show();
        }
    });

    button4 = createButton('pause');
    button4.hide();
    button4.addClass("playbutton1");
    translate(0, 0, 0)
    button4.mouseClicked(function() {
        play = false
        if (button4.hide()) {
            button3.show();
        }
    });

    button = createButton('save');
    button.addClass("playbutton");
    translate(0, 0, 0)
        // button.position(w - 130, h - 75)
    button.mouseClicked(function() {
        save('population');
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

    skiltis = createElement('h2', 'POPULATION')
    skiltis.style('color', 'rgba(255,255,255')
    translate(0, 0, 0);

    // PAAISKINIMAS
    textFont(font);
    fill(255)
    textSize(16);
    stroke(255)
}

function atnaujinkData() {
    loadJSON(url, 'geojson', gotData);
}

function gotData(data) {

    c = data;

    for (var i = 0; i < c.length; i++) {
        dydis = c[i].population;

        console.log(dydis);
        pirmasSkaicius = round(abs(dydis) * 1000.0).toString()[0];
        visasMasyvas.push(parseInt(pirmasSkaicius));
        pasiskirstymas[pirmasSkaicius - 1] = pasiskirstymas[pirmasSkaicius - 1] + 1;
        console.log(pirmasSkaicius);
    }

    console.log(pasiskirstymas);
    console.log(visasMasyvas);

    // PROCENTAI
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

var taimeris = 0

function groti() {
    var i = visasMasyvas.shift()
    var garsas = garsai[i]
    console.log("Grojam garsa " + i)

    garsas.play()
}

//  RODYTI STATISTIKA 
function showStatistika() {
    parent = createDiv('country' + ' / ' + 'population')
    parent.style('width', '450px')
    parent.addClass('parent')

    let metai = year();
    let menuo = month();
    let diena = day();
    let siandien = createDiv(metai + '-' + menuo + '-' + diena);
    siandien.style('font-size', '16px')
    siandien.parent(parent)


    for (var i = 0; i < c.length; i++) {
        dydis = c[i].population;
        place = c[i].name;
        let duomenys = createP(place + ' - ' + dydis)
        duomenys.parent(parent)
        button1.hide();
        if (button1.hide()) {
            button2.show();
        }
    }
}

function hideStatistika() {
    parent.hide();
    if (button2.hide()) {
        button1.show();
    }
}

function draw() {
    // orbitControl();

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

    //    BENFORDO GRAFIKAS
    if (data1) {
        numRows = data1.getRowCount();
        percentage = data1.getColumn('percentage');
        numbers = data1.getColumn('number');


        for (let i = 0; i < numRows; i++) {

            push();
            translate(-width / 2, -height / 2, 0);
            x = 120;
            y = pY + (i * 7);
            let ilgis = percentage[i] * 2;
            strokeWeight(1)
            noFill()
            stroke(255, 255, 255, 10);
            line(x, y, -ilgis + x, y);
            pop();

        }
    }
    // PAAISKINIMAS
    let atstumas = dist(mouseX, mouseY, 50, 950)
    if (atstumas < 100) {
        push();
        translate(-width / 2, -height / 2, 0);
        textFont(font),
            fill(255, 255, 255),
            textSize(14)
        pavadinimas = text('BENFORD DISTRIBUTION', 50, 480)
        textSize(14)
        text('real time data', 50, 500)
            // let metai = year();
            // let menuo = month();
            // let diena = day();
            // textFont(font);
            // fill(255, 255, 255)
            // textSize(14);
            // text((metai + '-' + menuo + '-' + diena), 50, 530);

        // 1
        if (b_one <= 31.60 && b_one >= 28.59) {
            textFont(font)
            fill(255, 255, 255)
            textSize(24)
            text('1.', 50, 580)
        } else {
            textFont(font)
            fill(255, 255, 255)
            textSize(24)
            text('1.', 50, 580)
        }

        fill(100, 30, 255),
            textSize(30)
        textFont(font2)
        text(b_one + '%', 90, 582);

        // 2
        if (b_two <= 18.48 && b_two >= 16.72) {
            textFont(font)
            fill(255, 255, 255)
            textSize(24)
            text('2.', 50, 615)
        } else {
            textFont(font),
                fill(255, 255, 255)
            textSize(24)
            text('2.', 50, 615)
        }

        fill(255, 30, 255),
            textSize(30)
        textFont(font2)
        text(b_two + '%', 90, 617);

        // 3
        if (b_three <= 13.13 && b_three >= 11.87) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('3.', 50, 650)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('3.', 50, 650)
        }

        fill(10, 255, 255),
            textSize(30)
        textFont(font2)
        text(b_three + '%', 90, 652);

        // 4
        if (b_four <= 10.18 && b_four >= 9.21) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('4.', 50, 685)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('4.', 50, 685)
        }

        fill(50, 30, 255),
            textSize(30)
        textFont(font2)
        text(b_four + '%', 90, 687);

        // 5
        if (b_five <= 8.29 && b_five >= 7.50) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('5.', 50, 720)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('5.', 50, 720)
        }

        fill(140, 50, 255),
            textSize(30)
        textFont(font2)
        text(b_five + '%', 90, 722);

        // 6
        if (b_six <= 7.03 && b_six >= 6.36) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('6.', 50, 755)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('6.', 50, 755)
        }

        fill(245, 145, 230),
            textSize(30)
        textFont(font2)
        text(b_six + '%', 90, 757);

        // 7
        if (b_seven <= 6.09 && b_seven >= 5.51) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('7.', 50, 790)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('7.', 50, 790)
        }

        fill(103, 145, 255),
            textSize(30)
        textFont(font2)
        text(b_seven + '%', 90, 792);

        // 8
        if (b_eight <= 5.36 && b_eight >= 4.84) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('8.', 50, 825)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('8.', 50, 825)
        }

        fill(170, 245, 245),
            textSize(30)
        textFont(font2)
        text(b_eight + '%', 90, 827);

        // 9
        if (b_nine <= 4.83 && b_nine >= 4.37) {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('9.', 50, 860)
        } else {
            textFont(font),
                fill(255, 255, 255),
                textSize(24)
            text('9.', 50, 860)
        }

        fill(169, 139, 252),
            textSize(30)
        textFont(font2)
        text(b_nine + '%', 90, 862);

        pop();
    }



    //    GRAFIKAS


    for (let i = 0; i < pasiskirstymas.length / 9; i++) {
        push();
        noFill();
        strokeWeight(1);
        translate(-width / 2, -height / 2, 0);

        if (pasiskirstymas[0]) {
            stroke(100, 30, 255);
            line(pX + pasiskirstymas[0] * 3, (i * 5) + pY, pX, (i * 5) + pY);
        }
        if (pasiskirstymas[1]) {
            stroke(255, 30, 255);
            line(pX + pasiskirstymas[1] * 3, (i * 5) + 7 + pY, pX, (i * 5) + 7 + pY);
        }
        if (pasiskirstymas[2]) {
            stroke(10, 255, 255);
            line(pX + pasiskirstymas[2] * 3, (i * 5) + 14 + pY, pX, (i * 5) + 14 + pY);
        }
        if (pasiskirstymas[3]) {
            stroke(50, 30, 255);
            line(pX + pasiskirstymas[3] * 3, (i * 5) + 21 + pY, pX, (i * 5) + 21 + pY);
        }
        if (pasiskirstymas[4]) {
            stroke(140, 50, 255);
            line(pX + pasiskirstymas[4] * 3, (i * 5) + 28 + pY, pX, (i * 5) + 28 + pY);
        }
        if (pasiskirstymas[5]) {
            stroke(245, 145, 230);
            line(pX + pasiskirstymas[5] * 3, (i * 5) + 35 + pY, pX, (i * 5) + 35 + pY);
        }
        if (pasiskirstymas[6]) {
            stroke(103, 145, 255, 200);
            line(pX + pasiskirstymas[6] * 3, (i * 5) + 42 + pY, pX, (i * 5) + 42 + pY);
        }
        if (pasiskirstymas[7]) {
            stroke(170, 245, 245, 300);
            line(pX + pasiskirstymas[7] * 3, (i * 5) + 49 + pY, pX, (i * 5) + 49 + pY);
        }
        if (pasiskirstymas[8]) {
            stroke(169, 139, 252, 900);
            line(pX + pasiskirstymas[8] * 3, (i * 5) + 56 + pY, pX, (i * 5) + 56 + pY);
        }
        pop();
    }



    let offset = 20;
    // judejimas pagal garsa
    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");
    let mapMid = map(mid, 0, 255, -radius, radius);
    let mapTreble = map(offset, 0, 255, -radius, radius);
    let scaleTreble = map(treble, 0, 255, 1, 1.5);
    let mapbass = map(bass, 0, 255, -100, 800);
    let scalebass = map(bass, 0, 255, 0.5, 2);

    noFill();
    stroke(10, 255, 255, 200);
    strokeWeight(2);
    scale(scalebass);
    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    directionalLight(250, 250, 250, -dirX, -dirY, -1);
    push();


    push()
    for (var j = 0; j < pasiskirstymas[0]; j++) {

        fill(100, 30, 255, 900);
        noStroke();
        translate(p5.Vector.fromAngle(millis() / 1000, 20));
        translate(j * 9, 0, 0)
        rotateY(millis() / 5000)
        rotate(mapTreble / 3);
        box(150, 15);
    }
    pop()
    push()
    for (var j = 0; j < pasiskirstymas[1]; j++) {
        stroke(255, 30, 255);
        translate(p5.Vector.fromAngle(millis() / 1000, 20));
        translate(j * 9, 0, 0)
        rotateY(millis() / 5000)
        rotate(mapTreble / 2);
        circle((j * 2 + 20), radius / 4 + 250, 9);
    }
    pop()
    push()
    for (var j = 0; j < pasiskirstymas[1]; j++) {
        stroke(10, 255, 255);
        translate(p5.Vector.fromAngle(millis() / 1000, 20));
        translate(j * 9, 0, 0)
        rotateY(millis() / 5000)
        rotate(mapTreble / 4);
        circle((j * 2 + 20), radius / 4 + 250, 9);
    }
    pop()

    // KETURI
    push()
    for (var j = 0; j < pasiskirstymas[3]; j++) {
        strokeWeight(2);
        noFill();
        stroke(50, 30, 255);
        rotate(mapTreble / 2);
        rotateY(millis() / 5000)
        rotateZ(millis() / 100000)
        line(j * offset, radius / 4 + 420, j * offset, radius / 4 + 400);
    }
    pop()
        // PENKI
    for (var j = 0; j < pasiskirstymas[4]; j++) {
        strokeWeight(2);
        rotate(mapTreble / 2);
        stroke(140, 50, 255);
        rotateZ(millis() / 100000)
        circle((j * 5 + 20), radius / 4 + 480, 15);
    }
    // SESI
    for (var j = 0; j < pasiskirstymas[5]; j++) {
        strokeWeight(1.5);
        rotate(mapTreble / 2);

        stroke(245, 145, 230);
        circle((j * 5 + 20), radius / 2 + 530, 10);
    }
    // }
    // SEPTYNI
    for (var j = 0; j < pasiskirstymas[6]; j++) {
        strokeWeight(1.5);
        rotate(mapTreble / 2);
        stroke(103, 145, 255);
        circle((j * 5 + 20), radius / 2 + 600, 15);

    }
    // ASTUONI
    for (var j = 0; j < pasiskirstymas[7]; j++) {
        strokeWeight(1);
        noFill();
        stroke(170, 245, 245);
        rotate(mapTreble);
        circle((j * 5 + 20), radius / 2 + 660, 20);
    }
    // DEVYNI
    for (var j = 0; j < pasiskirstymas[8]; j++) {

        strokeWeight(1);
        noFill();
        strokeWeight(2);
        stroke(169, 139, 252);
        rotate(mapTreble / 2);
        line(j * offset, radius / 2 + 650, j * offset, radius / 2 + 700);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}