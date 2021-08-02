class Particle {

    constructor() {
        //pozicija
        this.pos = createVector(random(window.innerWidth), random(window.innerHeight), 50, 100);
        //dydis
        this.size = 2;
        // velocity
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    }

    //ATNAUJINA JUDEJIMA PGL VELOCITY

    update() {
            this.pos.add(this.vel);
            this.edges();
        }
        //NUSTATO BG KRASTUS
    edges() {
        if (this.pos.x < 0 || this.pos.x > window.innerWidth) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > window.innerHeight) {
            this.vel.y *= -1;
        }
    }

    //VIENAS ATOMAS
    draw() {
            // rotateX(mouseX+200, mouseY +200);
            rotateX(mouseX / 10000);
            rotateY(frameCount / 200 * 0.01);
            noStroke();
            fill(100, 20, 255);
            circle(this.pos.x, this.pos.y, this.size);
        }
        // ATOMU SUJUNGIMAS
    checkParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            if (d < 0) {
                strokeWeight(1);
                stroke(100, 20, 255, 300);

                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            }
        })
    }
}