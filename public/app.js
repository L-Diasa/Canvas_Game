document.addEventListener('DOMContentLoaded', () => {
  const canvas1 = document.querySelector('#canvas1');
  const button = document.querySelector('#restart');
  const scoreEl = document.querySelector('#scoreEl');

  canvas1.width = 9 * innerWidth / 10
  // canvas1.width = innerWidth;
  canvas1.height = innerHeight;
  let c1 = canvas1.getContext('2d');
  // canvas2.width = (innerWidth / 2) - innerWidth / 20;
  let x1 = canvas1.width / 2;
  let y1 = canvas1.height / 2;
  let player1 = new Player(x1, y1, 10, 'white', '#canvas1');
  player1.draw();

  let gameOver = true;
  let projectiles = [];
  let enemies = [];
  let particles = [];
  let score = 0;

  function init() {
    player1 = new Player(x1, y1, 10, 'white', '#canvas1');
    c1 = canvas1.getContext('2d');
    player1.draw();
    projectiles = [];
    enemies = [];
    particles = [];
    gameOver = false;
    score = 0;
    scoreEl.innerHTML = score;
  }

  let animationaID1;
  function animate1() {
    animationaID1 = requestAnimationFrame(animate1)
    c1.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c1.fillRect(0, 0, canvas1.width, canvas1.height)
    player1.draw();

    particles.forEach((particle, index) => {
      if(particle.alpha <= 0) {
        particles.slice(index, 1)
      } else {
        particle.update();
      }
    })

    projectiles.forEach((projectile, index) => {
      projectile.update();

      // remove projectiles from the edges of the screen
      if(projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas1.width || 
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas1.height) {
          setTimeout(() => {
            projectiles.splice(index, 1)
          }, 0)
      }
    })

    enemies.forEach((enemy, index) => {
      enemy.update()

      // check if enemy hits the player
      const dist = Math.hypot(player1.x - enemy.x, 
        player1.y - enemy.y)

      // end game
      if(dist - enemy.radius - player1.radius < 1) {
        cancelAnimationFrame(animationaID1)
        clearInterval(spawnEnemyID)
      }
      
      
      // when projectile hits the enemy
      projectiles.forEach((projectile, prjctIndex) => {
        const dist = Math.hypot(projectile.x - enemy.x, 
          projectile.y - enemy.y)
          

        if(dist - enemy.radius - projectile.radius < 1) {
          score += 100;
          scoreEl.innerHTML = score;
          // explosion of particles
          for(let i = 0; i < enemy.radius; i++) {
            particles.push(
              new Particle(
                projectile.x, 
                projectile.y, 
                Math.random() * 2, 
                enemy.color, '#canvas1', {
                  x: (Math.random() - 0.5) * (Math.random() * 6),
                  y: (Math.random() - 0.5) * (Math.random() * 6)
                }))
          }

          // reduce the size of enemy and 
          // remove projectile and particle
          if(enemy.radius - 10 > 10) {
            enemy.radius -= 10
            setTimeout(() => {
              projectiles.splice(prjctIndex, 1)
            }, 0)
          } else  {
            setTimeout(() => {
              enemies.splice(index, 1)
              projectiles.splice(prjctIndex, 1)
            }, 0)
          }
      }
      })
    })
  }

  let timer = 1000;
  let spawnEnemyID;
   function spawnEnemies() {
    spawnEnemyID = setInterval(() => {
      const radius = Math.random() * (30 - 4) + 4;

      let x 
      let y 

      if(Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas1.width + radius
        y = Math.random() * canvas1.height
      }else {
        x = Math.random() * canvas1.width
        y = Math.random() < 0.5 ? 0 - radius : canvas1.height + radius
      }

      const color = `hsl(${Math.random() * 360}, 50%, 50%)`

      const angle = Math.atan2(canvas1.height / 2 - y, 
        canvas1.width / 2 - x )

      const velocity = {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2
      }

      enemies.push(new Enemy(x, y, radius,
            color, '#canvas1', velocity));
      // }
      // timer -= 100;
      // console.log(enemies.length)
    }, 700)
  }

  canvas1.addEventListener('click', (e) => {
    const angle = Math.atan2(
      e.clientY - canvas1.height / 2,
      e.clientX - canvas1.width / 2,
    )

    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5
    }

    projectiles.push(new Projectile(canvas1.width / 2, canvas1.height / 2,
      5, 'white', '#canvas1', velocity));
    // socket.emit('projectile1', velocity);
  });

  button.addEventListener('click', ()=> {
    clearInterval(spawnEnemyID);
    init();
    animate1();
    // console.log(enemies)
    spawnEnemies();
    // animate1();
  })

    // enemies.forEach((enemy, index) => {
    //   enemy.update()

      // const dist = Math.hypot(player1.x - enemy.x, player1.y - enemy.y)

      // if(dist - enemy.radius - player1.radius < 1) {
      //   cancelAnimationFrame(animationId1)
      //   while(projectiles.length > 0) {
      //     projectiles.pop();
      //   }
      //   while(enemies.length > 0) {
      //     enemies.pop();
      //   }
      //   gameOver = true;
      //   // socket.emit('gameOver');
      //   console.log("your point is " + point);
      // }

      // projectiles.forEach((projectile, projectileIndex) => {
      //   const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
      //   if(dist - enemy.radius - projectile.radius < 1) {
      //     point += 100;
      //     enemies.splice(index, 1)
      //     projectiles.splice(projectileIndex, 1)
      //   }
      // })
    // })
  // }
 






  // const infoDisplay = document.querySelector('#info');
  // const socket = io();
  // const button = document.querySelector('#restart');
  // const canvas1 = document.querySelector('#canvas1');
  // const canvas2 = document.querySelector('#canvas2');
  // canvas1.width = (innerWidth / 2) - innerWidth / 20;
  // canvas2.width = (innerWidth / 2) - innerWidth / 20;

  // canvas2.height = innerHeight;
  // // ctx.font = "30px Arial";
  // // ctx.fillText("Hello World", 10, 50);
  // let me = 'left'
  // let bothConnected = 0;
  // let gameOver = false;
  // let myrequest = 0;
  // let enemyrequest = 0;

  // // console.log(canvas1);
  // let x1 = canvas1.width / 2;
  // let y1 = canvas1.height / 2;
  // const player1 = new Player(x1, y1, 10, 'white', '#canvas1');
  // console.log(player1)
  // player1.draw();
  // let x2 = innerWidth - (canvas2.width / 2);
  // let y2 = innerHeight - (canvas2.height / 2);
  // const player2 = new Player(x1, y1, 10, 'blue', '#canvas2');
  // player2.draw();
  // c1 = canvas1.getContext('2d');
  // point = 0;

  // // c1.font = "30px Arial";
  // // c1.fillText("Hello World", 10, 50);
  // // c2 = canvas2.getContext('2d');

  //   // const projectile = new Projectile(
  //   // canvas1.width / 2, canvas1.height / 2, 
  //   // 2, 'red', '#canvas1', 
  //   // {
  //   //   x: 1,
  //   //   y: 2
  //   // })

  // const projectiles = [];
  // const enemies = [];

  // function spawnEnemies() {
  //   setInterval(() => {
  //     if(!gameOver) {
  //     const radius = Math.random() * (30 - 4) + 4;

  //     let x 
  //     let y 

  //     if(Math.random() < 0.5) {
  //       x = Math.random() < 0.5 ? 0 - radius : canvas2.width + radius
  //       y = Math.random() * canvas1.height
  //     }else {
  //       x = Math.random() * canvas1.width
  //       y = Math.random() < 0.5 ? 0 - radius : canvas1.height + radius
  //     }

  //     const color = 'green'

  //     const angle = Math.atan2(canvas1.height / 2 - y, 
  //       canvas1.width / 2 - x )

  //     const velocity = {
  //       x: Math.cos(angle),
  //       y: Math.sin(angle)
  //     }

  //     enemies.push(new Enemy(x, y, radius,
  //           color, '#canvas1', velocity));
  //     // if(me ==='left'){
  //     //   socket.emit('enemy', {xc: x, yc: y, rad: radius,
  //     //     cl: color, cn: '#canvas1', vl: velocity});
  //     //   enemies.push(new Enemy(x, y, radius,
  //     //     color, '#canvas1', velocity));
  //     //   }
  //     // if(me ==='right'){
  //     //   socket.emit('enemy', {xc: x, yc: y, rad: radius,
  //     //     cl: color, cn: '#canvas2', vl: velocity});
  //     //   enemies.push(new Enemy(x, y, radius,
  //     //     color, '#canvas2', velocity));
  //     //   }
  //     }
  //   }, 250)
    
  // }

  // let animationId1
  // function animate1() {
  //   c1.clearRect(0, 0, canvas1.width, canvas1.height)
  //   animationId1 = requestAnimationFrame(animate1)
  //   player1.draw();
  //   projectiles.forEach(projectile => {
  //     projectile.update()
  //   })

  //   enemies.forEach((enemy, index) => {
  //     enemy.update()

  //     const dist = Math.hypot(player1.x - enemy.x, player1.y - enemy.y)

  //     if(dist - enemy.radius - player1.radius < 1) {
  //       cancelAnimationFrame(animationId1)
  //       while(projectiles.length > 0) {
  //         projectiles.pop();
  //       }
  //       while(enemies.length > 0) {
  //         enemies.pop();
  //       }
  //       gameOver = true;
  //       // socket.emit('gameOver');
  //       console.log("your point is " + point);
  //     }

  //     projectiles.forEach((projectile, projectileIndex) => {
  //       const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
  //       if(dist - enemy.radius - projectile.radius < 1){
  //         point += 100;
  //         enemies.splice(index, 1)
  //         projectiles.splice(projectileIndex, 1)
  //       }
  //     })
  //   })
  // }
  // console.log(innerWidth - canvas2.width)
  // console.log(canvas2.width)

  // let animationId2
  // function animate2() {
  //   c2.clearRect(0, 0, canvas2.width, canvas2.height)
  //   animationId2 = requestAnimationFrame(animate2)
  //   player2.draw();
  //   projectiles.forEach(projectile => {
  //     projectile.update()
  //   })
  //   enemies.forEach((enemy) => {
  //     enemy.update()

  //     const dist = Math.hypot(player2.x - enemy.x, player2.y - enemy.y)

  //     if(dist - enemy.radius - player2.radius < 1) {
  //       cancelAnimationFrame(animationId2)
  //       while(projectiles.length > 0) {
  //         projectiles.pop();
  //       }
  //       while(enemies.length > 0) {
  //         enemies.pop();
  //       }
  //       gameOver = true;
  //       socket.emit('gameOver');
  //     }

  //     projectiles.forEach((projectile, projectileIndex) => {
  //       const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
  //       if(dist - enemy.radius - projectile.radius < 1){
  //         enemies.splice(index, 1)
  //         projectiles.splice(projectileIndex, 1)
  //       }
  //     })
  //   })
  // }


  // canvas1.addEventListener('click', (e) => {
  // if(!gameOver) {
  //   console.log(e.clientX);
  //   console.log(e.clientX - canvas1.width / 2)
  //     const angle = Math.atan2(
  //       e.clientY - canvas1.height / 2,
  //       e.clientX - canvas1.width / 2,
  //     )
  

  //     const velocity = {
  //       x: Math.cos(angle),
  //       y: Math.sin(angle)
  //     }

  //     projectiles.push(new Projectile(canvas1.width / 2, canvas1.height / 2,
  //       5, 'white', '#canvas1', velocity));
  //     socket.emit('projectile1', velocity);
  //   }
  // })

  // canvas2.addEventListener('click', (e) => {
  //   if(me === 'right' && !gameOver && bothConnected) {
  //       const angle = Math.atan2(
  //         e.clientY - canvas1.height / 2,
  //         e.clientX - (innerWidth - (canvas1.width / 2)),
  //       )
  
  //       const velocity = {
  //         x: Math.cos(angle),
  //         y: Math.sin(angle)
  //       }
  
  //       projectiles.push(new Projectile(canvas1.width / 2, canvas1.height / 2,
  //         5, 'blue', '#canvas2', velocity));
  //         socket.emit('projectile2', velocity);
  //     }
  //   })

  // animate1();
  // spawnEnemies();
  // animate2();
  // spawnEnemies();

  // socket.on('gameOver', ()=> {
  //   gameOver = true
  // })


  // socket.on('projectile1', velocity => {
  //   projectiles.push(new Projectile(canvas1.width / 2, canvas1.height / 2,
  //     5, 'blue', '#canvas1', velocity));
  // })

  // socket.on('projectile2', velocity => {
  //   projectiles.push(new Projectile(canvas1.width / 2, canvas1.height / 2,
  //     5, 'blue', '#canvas2', velocity));
  // })

  // socket.on('enemy', function(data) {
  //   enemies.push(new Enemy(data.xc, data.yc, 
  //     data.rad, data.cl, data.cn, data.vl));
  //   // enemies.push(newEnemy);
  // })


  // function playerConnectedOrDisconnected(num) {
  //   let player = `.p${parseInt(num) + 1}`
  //   document.querySelector(`${player} .p_connection`).
  //     classList.toggle('green')
  //   // restartGame();
  //   // gameOver = false;
  //   // currPlayer = 'pink';
  //   // $('#player').text(capitalizeFirstLetter(currPlayer));
  // }

  // socket.on('player-number', num => {
  //   if(num === -1) {
  //       // infoDisplay.innerHTML = `Sorry, 
  //       // the server is full`
  //   }
  //   else {
  //       let playerNum = parseInt(num);
  //       if(playerNum === 1) me = 'right'
  //   }
  // })

  // socket.on('player-connection', function(data) {
  //     var index = data.i;
  //     var players = data.cn;
  //     console.log(`Player number ${index} has
  //     connected or disconnected`)
  //     playerConnectedOrDisconnected(index);
  //     let numConnected = 0;
  //     players.forEach((p, i) => {
  //       if(p === 1) {
  //         numConnected++;
  //       }
  //     })
  //     bothConnected = (numConnected === 2) ? true : false;
  // })

  // socket.on('check-players', players => {
  //   let numConnected = 0;
  //     players.forEach((p, i) => {
  //       if(p === 1) {
  //         playerConnectedOrDisconnected(i)
  //         numConnected++;
  //       }
  //     })
  //   bothConnected = (numConnected === 2) ? true : false;
  // })

  // $('#restart').click(function() {
  //   console.log("restart");
  //   myrequest = 1;
  //   sum = enemyrequest + myrequest;
  //   console.log("my sum " + sum);
  //   if(sum === 1) {
  //     button.classList.add('temYellow');
  //     socket.emit('restart');
  //   }
  //   if(sum === 2){
  //     button.classList.remove('temYellow');
  //     socket.emit('restart');
  //     gameOver = false;
  //     myrequest = 0;
  //     enemyrequest = 0;
  //     requestAnimationFrame(animate1);
  //     requestAnimationFrame(animate2);
  //   }
  //   // }
  //   // if(restart && myrequest  ) {
  //   //   button.style.backgroundColor = 'yellow';
  //     // requestAnimationFrame(animate1)
  //     // requestAnimationFrame(animate2)
  //     // gameOver = 0;
  //     // restart = 0;
  //   // }
  //   // restartGame();
  //   // socket.emit('restart')
  // })

  // socket.on('restart', () => {
  //   enemyrequest = 1;
  //   let sum = enemyrequest + myrequest;
  //   console.log("sum " + sum);
  //   if(sum === 1) {
  //     button.classList.add('temYellow');
      
  //   }
  //   if(sum === 2){
  //     button.classList.remove('temYellow');
  //     gameOver = false;
  //     myrequest = 0;
  //     enemyrequest = 0;
  //     requestAnimationFrame(animate1);
  //     requestAnimationFrame(animate2);
  //   }
  // })

  // function restartGame() {
  //   gameOver = false;
  //   for (var i = 0; i < allCells.length; i++) {
  //     if(allCells[i].classList.contains('pink')) {
  //       allCells[i].classList.remove('pink')
  //     }
  //     else if(allCells[i].classList.contains('blue')) {
  //       allCells[i].classList.remove('blue')
  //     }
  //     if(allCells[i].classList.contains('next-pink')) {
  //       allCells[i].classList.remove('next-pink')
  //     }
  //     else if(allCells[i].classList.contains('next-blue')) {
  //       allCells[i].classList.remove('next-blue')
  //     }
  //     allCells[i].classList.add('empty')
  //   }
  // }

  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

//   socket.on('gameOver', () => {
//     gameOver = true;
//     alert(`Game Over! Player ${currPlayer} has won!`);
//   })

//   socket.on('changeTurn', () => {
//     currPlayer = (currPlayer === 'pink') 
//       ? 'blue' : 'pink';
//     $('#player').text(capitalizeFirstLetter(currPlayer));
//   })

//   socket.on('clicked', function(data) {
//     var rowNum = data.rn;
//     var colNum = data.cn;
//     let cell = document.querySelector(`
//       div[data-col='${colNum}'][data-row='${rowNum}']`);
//     cell.classList.remove("empty");
//     cell.classList.add(currPlayer);
//   })
})
