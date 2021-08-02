let pasiskirstymas = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let dydis = [];
let taskai = [];
let pirmasSkaicius = [];
let covid = [];
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
let sel;
const pY = h - 100;
const pX = 125;

let api = 'https://corona.lmao.ninja/v2/countries?today=true&';
let critical = 'critical';
let cases = 'cases';
let deaths = 'deaths';
let active = 'active';
let item;

function preload() {
    one = loadImage('images/one.png');
    two = loadImage('images/two.png');
    three = loadImage('images/three.png');
    four = loadImage('images/four.png');
    five = loadImage('images/five.png');
    six = loadImage('images/six.png');
    seven = loadImage('images/seven.png');
    eight = loadImage('images/eight.png');
    nine = loadImage('images/nine.png');

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

    button4 = createButton('stop');
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
    button.mouseClicked(function() {
        save('covid-19/Critical cases');
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

    skiltis = createElement('h2', 'COVID-19')
    skiltis.style('color', 'rgba(255,255,255')
    translate(0, 0, 0);

    // PAAISKINIMAS
    textFont(font);
    fill(255)
    textSize(16);
    stroke(255)

}

function atnaujinkData() {

    loadJSON(api + critical, 'json', gotData);

}



function gotData(data) {
    covid = data;

    for (var i = 0; i < covid.length; i++) {
        dydis = covid[i].critical;
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


// visos natos sugroja kai paspaudi mygtuka
// dabartinio gaso indeksas masyve
var taimeris = 0

function groti() {
    var i = visasMasyvas.shift()
    var garsas = garsai[i]
    console.log("Grojam garsa " + i)

    garsas.play()
}

//  RODYTI STATISTIKA 
function showStatistika() {
    parent = createDiv('country' + ' / ' + 'critical cases' + '  ' + '(people)')
    parent.addClass('parent')

    let metai = year();
    let menuo = month();
    let diena = day();
    let siandien = createDiv(metai + '-' + menuo + '-' + diena);
    siandien.parent(parent)

    for (let i = 0; i < covid.length; i++) {
        dydis = covid[i].critical;
        place = covid[i].country;


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
            y = innerHeight - 100 + (i * 7);
            let ilgis = percentage[i] * 2;
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
        translate(-width / 2, -height / 2, 0);
        textFont(font),
            fill(255, 255, 255),
            textSize(14)
        pavadinimas = text('DATA DISTRIBUTION', 50, innerHeight - 460)
        textSize(14)
        realtime = text('real time data', 50, innerHeight - 440)

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
            text('7.', 50, innerHeight - 200)
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

    //    GRAFIKAS

    push();
    for (let i = 0; i < pasiskirstymas.length / 9; i++) {

        noFill();
        strokeWeight(1);
        translate(-width / 2, -height / 2, 0);

        if (pasiskirstymas[0]) {
            stroke(100, 30, 255);
            line(pX + pasiskirstymas[0] * 3, (i * 5) + (innerHeight - 100), pX, (i * 5) + (innerHeight - 100));
        }
        if (pasiskirstymas[1]) {
            stroke(255, 30, 255);
            line(pX + pasiskirstymas[1] * 3, (i * 5) + 7 + (innerHeight - 100), pX, (i * 5) + 7 + (innerHeight - 100));
        }
        if (pasiskirstymas[2]) {
            stroke(10, 255, 255);
            line(pX + pasiskirstymas[2] * 3, (i * 5) + 14 + (innerHeight - 100), pX, (i * 5) + 14 + (innerHeight - 100));
        }
        if (pasiskirstymas[3]) {
            stroke(50, 30, 255);
            line(pX + pasiskirstymas[3] * 3, (i * 5) + 21 + (innerHeight - 100), pX, (i * 5) + 21 + (innerHeight - 100));
        }
        if (pasiskirstymas[4]) {
            stroke(140, 50, 255);
            line(pX + pasiskirstymas[4] * 3, (i * 5) + 28 + (innerHeight - 100), pX, (i * 5) + 28 + (innerHeight - 100));
        }
        if (pasiskirstymas[5]) {
            stroke(245, 145, 230);
            line(pX + pasiskirstymas[5] * 3, (i * 5) + 35 + (innerHeight - 100), pX, (i * 5) + 35 + (innerHeight - 100));
        }
        if (pasiskirstymas[6]) {
            stroke(103, 145, 255, 200);
            line(pX + pasiskirstymas[6] * 3, (i * 5) + 42 + (innerHeight - 100), pX, (i * 5) + 42 + (innerHeight - 100));
        }
        if (pasiskirstymas[7]) {
            stroke(170, 245, 245, 300);
            line(pX + pasiskirstymas[7] * 3, (i * 5) + 49 + (innerHeight - 100), pX, (i * 5) + 49 + (innerHeight - 100));
        }
        if (pasiskirstymas[8]) {
            stroke(169, 139, 252, 900);
            line(pX + pasiskirstymas[8] * 3, (i * 5) + 56 + (innerHeight - 100), pX, (i * 5) + 56 + (innerHeight - 100));
        }

    }
    pop()

    if (!covid) {
        return;
    }

    let offset = 20;
    // drebejimas pagal garsa
    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");
    let mapMid = map(mid, 0, 255, -radius, radius);
    let mapTreble = map(offset, 0, 255, -radius, radius);
    let scaleTreble = map(treble, 0, 255, 1, 1.5);
    let mapbass = map(bass, 0, 255, -100, 800);
    let scalebass = map(bass, 0, 255, 0.5, 2);
    rotateZ(mouseX / 1000 + mouseY / 1000);





    noFill();
    stroke(10, 255, 255, 200);
    strokeWeight(2);
    scale(scalebass);
    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    directionalLight(250, 250, 250, -dirX, -dirY, -1);


    // VIENAS
    push()
    for (var j = 0; j < pasiskirstymas[0]; j++) {
        let a = 1

        fill(100, 30, 255);
        noStroke();
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 0));
        translate(j * 3 + 100, 200, 5);
        // rotate(cos(a) * 3);
        rotateX(millis(a) / 5000)
        rotate(mapTreble / 2);


        sphere(j / 6 + 10);
    }
    pop()

    //       // DU
    push()
    for (var j = 0; j < pasiskirstymas[1]; j++) {
        let angle = 100
        let a = 1
        strokeWeight(1)
        stroke(255, 30, 255);
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 0));
        translate(j * 3 + 100, 200, 5);
        rotateX(millis() / 5000)
        rotate(mapTreble / 2);
        circle((j * 10 + 100), 250, 9)
    }
    pop()

    //     // TRYS
    push()
    for (var j = 0; j < pasiskirstymas[3]; j++) {
        let angle = 100
        let a = 1
        strokeWeight(1)
        stroke(10, 255, 255);
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 0));
        translate(j * 3 + 100, 200, 5);
        rotateX(millis() / 5000);
        // rotateZ(60);
        rotate(mapTreble / 2);
        circle((j * 10 + 100), 300, 9);
    }
    pop()


    // // KETURI
    push()
    for (var j = 0; j < pasiskirstymas[3]; j++) {
        push()
        strokeWeight(2);
        noFill();
        stroke(50, 30, 255);
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 0));
        translate(j * 3 + 100, 200, 5);
        rotateX(millis() / 5000);
        rotate(mapTreble / 2);
        line(j * offset, 360, j * offset, 350);
    }
    pop()

    // // PENKI
    push()
    for (var j = 0; j < pasiskirstymas[4]; j++) {
        strokeWeight(2);
        stroke(140, 50, 255);
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 0));
        translate(j * 3 + 100, 200, 5);
        rotateX(millis() / 5000);
        rotate(mapTreble / 2);
        circle((j * 5 + 20), 400, 15);
    }
    pop()

    // // SESI
    push()
    for (var j = 0; j < pasiskirstymas[5]; j++) {
        strokeWeight(1.5);
        stroke(245, 145, 230);
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 0));
        translate(j * 3 + 100, 200, 5);
        rotateX(millis() / 5000);
        rotate(mapTreble / 2);
        circle((j * 5 + 20), 450, 10);
    }
    pop()

    // // SEPTYNI
    push()
    for (var j = 0; j < pasiskirstymas[6]; j++) {
        strokeWeight(1.5);
        stroke(103, 145, 255);
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 0));
        translate(j * 3 + 100, 200, 5);
        rotateX(millis() / 5000);

        rotate(mapTreble / 2);
        circle((j * 5 + 20), 500, 15);

    }
    pop()

    // // ASTUONI
    push()
    for (var j = 0; j < pasiskirstymas[7]; j++) {
        strokeWeight(1);
        noFill();
        stroke(170, 245, 245);
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 0));
        translate(j * 3 + 100, 200, 5);
        rotateX(millis() / 5000);
        rotate(mapTreble / 2);
        circle((j * 5 + 20), 550, 20);
    }
    pop()

    // // DEVYNI
    push()
    for (var j = 0; j < pasiskirstymas[8]; j++) {
        strokeWeight(1);
        noFill();
        strokeWeight(2);
        stroke(169, 139, 252);
        translate(0, -200, 0)
        translate(p5.Vector.fromAngle(millis() / 5000, 0));
        translate(j * 3 + 100, 200, 5);
        rotateX(millis() / 5000);
        rotate(mapTreble / 2);
        line(j * offset, 600, j * offset, 620);
    }
    pop()


}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}