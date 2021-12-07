document.addEventListener('DOMContentLoaded', () => {
  const canvas1 = document.querySelector('#canvas1');
  const button = document.querySelector('#restart');
  const scoreEl = document.querySelector('#scoreEl');

  canvas1.width = 9 * innerWidth / 10
  canvas1.height = innerHeight;
  let c1 = canvas1.getContext('2d');
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
    }, 800)
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
  });

  button.addEventListener('click', ()=> {
    clearInterval(spawnEnemyID);
    init();
    animate1();
    spawnEnemies();
  })
})
