class Player {
  constructor(x, y, radius, color, canvas) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.canvas = document.querySelector(canvas);
    this.c = this.canvas.getContext('2d');
  }

  draw() {
    this.c.beginPath()
    this.c.arc(this.x, this.y, this.radius,
       0, 2 * Math.PI, false)
    this.c.fillStyle = this.color
    this.c.fill()
  }
}

class Projectile {
  constructor(x, y, radius, color, canvas, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity
    this.canvas = document.querySelector(canvas);
    this.c = this.canvas.getContext('2d');
  }

  draw() {
    this.c.beginPath()
    this.c.arc(this.x, this.y, this.radius,
       0, 2 * Math.PI, false)
    this.c.fillStyle = this.color
    this.c.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

class Enemy {
  constructor(x, y, radius, color, canvas, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity
    this.canvas = document.querySelector(canvas);
    this.c = this.canvas.getContext('2d');
  }

  draw() {
    this.c.beginPath()
    this.c.arc(this.x, this.y, this.radius,
       0, 2 * Math.PI, false)
    this.c.fillStyle = this.color
    this.c.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

const frinction = 0.99;
class Particle {
  constructor(x, y, radius, color, canvas, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity
    this.canvas = document.querySelector(canvas);
    this.c = this.canvas.getContext('2d');
    this.alpha = 1
  }

  draw() {
    this.c.save()
    this.c.globalAlpha = this.alpha
    this.c.beginPath()
    this.c.arc(this.x, this.y, this.radius,
       0, 2 * Math.PI, false)
    this.c.fillStyle = this.color
    this.c.fill()
    this.c.restore()
  }

  update() {
    this.draw()
    this.velocity.x *= frinction
    this.velocity.y *= frinction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    this.alpha -= 0.01
  }
}
