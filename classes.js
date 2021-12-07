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
    // this.c.arc(100, 75, 50, 0, 2 * Math.PI);
    // this.c.stroke();
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






// document.addEventListener('DOMContentLoaded', () => {
//   const canvas1 = document.querySelector('#canvas1');
//   const button = document.querySelector('#restart');

//   canvas1.width = 9 * innerWidth / 10;
//   // canvas1.width = innerWidth;
//   canvas1.height = innerHeight;
//   let c1 = canvas1.getContext('2d');
//   // canvas2.width = (innerWidth / 2) - innerWidth / 20;
//   let x1 = canvas1.width / 2;
//   let y1 = canvas1.height / 2;
//   let player1 = new Player(x1, y1, 10, 'white', '#canvas1');
//   player1.draw();

//   let projectiles = [];
//   let enemies1 = [];
//   let particles1 = [[]];
//   let timer = 1000;
//   let myrequest = false;
//   let enemyrequest = false;
//   // const socket = io();
//   // let me = 'left'

//   function init() {
//     myrequest = false;
//     enemyrequest = false;
//     c1 = canvas1.getContext('2d');
//     player1.draw();
//     projectiles = [];
//     enemies1 = [];
//     particles1 = [];
//     timer = 1000;
//   }

//   let animationaID1;
//   function animate1() {
//     animationaID1 = requestAnimationFrame(animate1)
//     if(timer < 500) {
//       timer = 10000;
//       clearInterval(spawnEnemyID1);
//       spawnEnemyID1 = setInterval(() => {
//         enemySpanw()
//       }, 500)
//     }
//     c1.fillStyle = 'rgba(0, 0, 0, 0.1)'
//     c1.fillRect(0, 0, canvas1.width, canvas1.height)
//     player1.draw();

//     particles1.forEach((particle, index) => {
//       if(particle.alpha <= 0) {
//         particles1.slice(index, 1)
//       } else {
//         particle.update();
//       }
//     })

//     projectiles.forEach((projectile, index) => {
//       projectile.update();

//       // remove projectiles from the edges of the screen
//       if(projectile.x + projectile.radius < 0 ||
//         projectile.x - projectile.radius > canvas1.width || 
//         projectile.y + projectile.radius < 0 ||
//         projectile.y - projectile.radius > canvas1.height) {
//           setTimeout(() => {
//             projectiles.splice(index, 1)
//           }, 0)
//       }
//     })

//     enemies1.forEach((enemy, index) => {
//       enemy.update()

//       // check if enemy hits the player
//       const dist = Math.hypot(player1.x - enemy.x, 
//         player1.y - enemy.y)

//       // end game
//       if(dist - enemy.radius - player1.radius < 1) {
//         cancelAnimationFrame(animationaID1)
//         clearInterval(spawnEnemyID1)
//       }
      
      
//       // when projectile hits the enemy
//       projectiles.forEach((projectile, prjctIndex) => {
//         const dist = Math.hypot(projectile.x - enemy.x, 
//           projectile.y - enemy.y)


//         if(dist - enemy.radius - projectile.radius < 1) {
//           // explosion of particles
//           for(let i = 0; i < enemy.radius; i++) {
//             particles1.push(
//               new Particle(
//                 projectile.x, 
//                 projectile.y, 
//                 Math.random() * 2, 
//                 enemy.color, '#canvas1', {
//                   x: (Math.random() - 0.5) * (Math.random() * 6),
//                   y: (Math.random() - 0.5) * (Math.random() * 6)
//                 }))
//           }

//           // reduce the size of enemy and 
//           // remove projectile and particle
//           if(enemy.radius - 10 > 10) {
//             enemy.radius -= 10
//             setTimeout(() => {
//               projectiles.splice(prjctIndex, 1)
//             }, 0)
//           } else  {
//             setTimeout(() => {
//               enemies1.splice(index, 1)
//               projectiles.splice(prjctIndex, 1)
//             }, 0)
//           }
//       }
//       })
//     })
//   }

//   let spawnEnemyID1;
//   let makeQuickID1;
//    function spawnEnemies() {
//     //  if(me=== 'left') {
//       spawnEnemyID1 = setInterval(() => {
//         enemySpanw()
//       }, 1000)
//     // }
//   }

//   function enemySpanw() {
//     const radius = Math.random() * (30 - 4) + 4;

//     let x 
//     let y 

//     if(Math.random() < 0.5) {
//       x = Math.random() < 0.5 ? 0 - radius : canvas1.width + radius
//       y = Math.random() * canvas1.height
//     }else {
//       x = Math.random() * canvas1.width
//       y = Math.random() < 0.5 ? 0 - radius : canvas1.height + radius
//     }

//     const color = `hsl(${Math.random() * 360}, 50%, 50%)`

//     const angle = Math.atan2(canvas1.height / 2 - y, 
//       canvas1.width / 2 - x )

//     const velocity = {
//       x: Math.cos(angle) * 2,
//       y: Math.sin(angle) * 2
//     }

//     enemies1.push(new Enemy(x, y, radius,
//           color, '#canvas1', velocity));

//     timer -= 50;
//   }

//   canvas1.addEventListener('click', (e) => {
//     // if(me === 'left') {
//       const angle = Math.atan2(
//         e.clientY - canvas1.height / 2,
//         e.clientX - canvas1.width / 2,
//       )

//       const velocity = {
//         x: Math.cos(angle) * 5,
//         y: Math.sin(angle) * 5
//       }

//       projectiles.push(new Projectile(canvas1.width / 2, canvas1.height / 2,
//         5, 'white', '#canvas1', velocity));
//       // socket.emit('projectile1', velocity);
//     // }
//   });

//   button.addEventListener('click', ()=> {
//     // if(me != 'none') {
//       // button.classList.add("request");
//       // myrequest = 1;
//       // socket.emit('request');
//       // if(myrequest && enemyrequest) {
//         init();
//         animate1();
//         spawnEnemies();
//         // button.classList.remove("request");
//       // }
//     // }
//   })

//   // socket.on('request', ()=> {
//   //   enemyrequest = true;
//   //   button.classList.add("request");
//   //   if(myrequest && enemyrequest) {
//   //     init();
//   //     animate1();
//   //     spawnEnemies();
//   //     button.classList.remove("request");
//   //   }
//   // })

//   function playerConnectedOrDisconnected(num) {
//     let player = `.p${parseInt(num) + 1}`
//     document.querySelector(`${player} .p_connection`).
//       classList.toggle('green')
//     // restartGame();
//     // gameOver = false;
//     // currPlayer = 'pink';
//     // $('#player').text(capitalizeFirstLetter(currPlayer));
//   }
