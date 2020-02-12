class Player {
  constructor(X, Y, Speed) {
    this.X = X;
    this.Y = Y;
    this.Speed = 6;
    this.bullets = [];
    this.shotCountA = 0;
    this.shotCountB = 0;
    this.shotInterval = 100;
    this.Energy = 1000;
    this.MaxEnergy = 1000;
    this.EnergyRegene = 4;
    this.shooting = false;
    this.Life = 6;
    this.InvincibleCount = 60;
    this.Power = 10;
    this.ShiftMode = false;
    this.Size = 10;
  }
  draw() {
    if (this.InvincibleCount > 0) {
      fill(0, 100, 200, this.InvincibleCount * 2);
      stroke(255);
      ellipse(this.X, this.Y, 100, 100);
    }
    stroke(1);
    fill(255);
    triangle(
      this.X - 20,
      this.Y + 20,
      this.X + 20,
      this.Y + 20,
      this.X,
      this.Y - 40
    );
    ellipse(this.X, this.Y, 18, 24);
    quad(
      this.X - 15,
      this.Y + 15,
      this.X - 10,
      this.Y + 10,
      this.X - 5,
      this.Y + 15,
      this.X - 10,
      this.Y + 30
    );
    quad(
      this.X + 15,
      this.Y + 15,
      this.X + 10,
      this.Y + 10,
      this.X + 5,
      this.Y + 15,
      this.X + 10,
      this.Y + 30
    );
    noStroke();
    fill(0, 100, 200);
    if (this.ShiftMode == true) {
      ellipse(this.X, this.Y, 10, 10);
    }
    stroke(1);
  }
  move() {
    if (this.InvincibleCount > 0) {
      this.InvincibleCount -= 1;
    }
    this.shotCountA += 12;
    this.shotCountB += 2;
    if (this.shooting == false) {
      if (this.Energy < this.MaxEnergy) {
        this.Energy += this.EnergyRegene;
      } else {
        this.Energy = this.MaxEnergy;
      }
    } else {
      this.Energy += this.EnergyRegene / 4;
    }
    this.Speed = 6;
    this.ShiftMode = false;
    if (keyIsDown(16)) {
      this.Speed = 2;
      this.Energy += this.EnergyRegene / 2;
      this.ShiftMode = true;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.X -= this.Speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.X += this.Speed;
    }
    if (keyIsDown(UP_ARROW)) {
      if (this.ShiftMode == false) {
        this.Speed += 4;
      }
      this.Y -= this.Speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.Y += this.Speed;
    }
    this.shooting = false;
  }
  shot() {
    if (keyIsDown(90)) {
      if (this.ShiftMode == true) {
        this.shooting = true;
        if (this.shotCountB >= this.shotInterval) {
          if (this.Energy >= 240) {
            this.bullets.push(
              new BulletB(
                new Vector(this.X + 10, this.Y - 6),
                new Vector(0, 20)
              )
            );
            this.bullets.push(
              new BulletB(
                new Vector(this.X - 10, this.Y - 6),
                new Vector(0, 20)
              )
            );
            this.shotCountB = 0;
            this.Energy -= 240;
            score -= 100;
            this.X += random(-6, 6);
            this.Y += 20;
          }
        }
      } else {
        this.shooting = true;
        if (this.shotCountA >= this.shotInterval) {
          if (this.Energy >= 30) {
            this.bullets.push(
              new BulletA(new Vector(this.X, this.Y - 32), new Vector(0, 11))
            );
            this.bullets.push(
              new BulletA(new Vector(this.X + 3, this.Y - 30), new Vector(2, 9))
            );
            this.bullets.push(
              new BulletA(
                new Vector(this.X - 3, this.Y - 30),
                new Vector(-2, 9)
              )
            );
            this.shotCountA = 0;
            this.Energy -= 30;
            score -= 10;
          }
        }
      }
    }
  }
  damaged() {
    if (this.InvincibleCount <= 0) {
      this.Life -= 1;
      if (score >= 0) {
        score -= floor(score / 2);
      }
      combo = 0;
      this.InvincibleCount += 90;
      if (this.Life <= 0) {
        GAMEOVER = true;
      }
    }
  }
}
class BulletA {
  constructor(Position, Velocity) {
    this.Position = Position;
    this.Velocity = Velocity;
    this.Size = 10;
    this.Reverse = 0;
    this.Power = 1;
    this.Killed = false;
  }
  draw() {
    fill(0, 100, 200);
    noStroke();
    ellipse(this.Position.X, this.Position.Y, this.Size, this.Size);
    stroke(1);
    fill(255);
  }
  move() {
    this.Position.X += this.Velocity.X;
    this.Position.Y -= this.Velocity.Y;
    if (this.Position.Y <= 0) {
      this.Killed = true;
    }
  }
  hit() {
    if (player.InvincibleCount <= 0) {
      combo += 1;
      comboContinuity = 120;
      score += combo * 10;
    }
    this.Killed = true;
  }
}
class BulletB {
  constructor(Position, Velocity) {
    this.Position = Position;
    this.Velocity = Velocity;
    this.Size = 16;
    this.Reverse = 0;
    this.Power = 5;
    this.Life = 7;
    this.Killed = false;
  }
  draw() {
    fill(0, 100, 200);
    quad(
      this.Position.X + 4,
      this.Position.Y,
      this.Position.X,
      this.Position.Y - 20,
      this.Position.X - 4,
      this.Position.Y,
      this.Position.X,
      this.Position.Y + 8
    );
    quad(
      this.Position.X + 6,
      this.Position.Y,
      this.Position.X,
      this.Position.Y - 10,
      this.Position.X - 6,
      this.Position.Y,
      this.Position.X,
      this.Position.Y - 4
    );
    fill(255);
  }
  move() {
    this.Position.Y -= this.Velocity.Y;
    if (this.Position.Y <= 0) {
      this.Killed = true;
    }
  }
  hit() {
    if (player.InvincibleCount <= 0) {
      combo += 1;
      comboContinuity = 120;
      score += sq(combo) * 20;
    }
    this.Life -= 1;
    if (this.Life == 0) {
      this.Killed = true;
    }
  }
}
class Enemies {
  constructor() {
    this.enemies = [];
    this.bullets = [];
    this.randomA = [3, -3];
    this.randomB = [6, -6];
  }
  createA() {
    this.enemies.push(
      new EnemyA(
        new Vector(random(40, 420), 0),
        new Vector(random(this.randomA), 1)
      )
    );
  }
  createB() {
    this.enemies.push(
      new EnemyB(
        new Vector(random(60, 400), 0),
        new Vector(random(this.randomB), 1)
      )
    );
  }
  createBoss() {
    this.enemies.push(new Boss(new Vector(230, -20), new Vector(0, 1)));
  }
  createRED() {
    this.enemies.push(
      new RED(new Vector(random(40, 420), 0), new Vector(random(-3, 3), 5))
    );
  }
  createBossBullets() {
    this.enemies.push(new RED(new Vector(290, 160), new Vector(-3, 5)));
    this.enemies.push(new RED(new Vector(290, 160), new Vector(3, 5)));
    this.enemies.push(new RED(new Vector(170, 160), new Vector(-3, 5)));
    this.enemies.push(new RED(new Vector(170, 160), new Vector(3, 5)));
  }
}
class EnemyA {
  constructor(Position, Velocity) {
    this.Position = Position;
    this.Velocity = Velocity;
    this.Size = 80;
    this.Reverse = 0;
    this.Life = 3;
    this.Killed = false;
    this.ShotCount = 0;
  }
  draw() {
    fill(255, 200, 200);
    ellipse(this.Position.X, this.Position.Y, this.Size, this.Size);
  }
  move() {
    this.ShotCount += 1;
    if (this.Reverse >= 120) {
      this.Velocity.X = this.Velocity.X * -1;
      this.Reverse = 0;
    }
    this.Position.X += this.Velocity.X;
    this.Position.Y += this.Velocity.Y;
    this.Reverse += random(0, 6);
    if (this.Position.Y >= 650) {
      this.Killed = true;
    }
  }
  damaged(damage) {
    this.Life -= damage;
    if (this.Life <= 0) {
      this.Killed = true;
      if (player.InvincibleCount <= 0) {
        killCount += 1;
        score += 1000;
      }
    }
  }
  shot() {
    if (this.ShotCount > 60) {
      enemy.bullets.push(
        new EneBulletA(
          new Vector(this.Position.X, this.Position.Y),
          new Vector(2, 4),
          10
        )
      );
      enemy.bullets.push(
        new EneBulletA(
          new Vector(this.Position.X, this.Position.Y),
          new Vector(-2, 4),
          10
        )
      );
      this.ShotCount = 0;
    }
  }
}
class EnemyB {
  constructor(Position, Velocity) {
    this.Position = Position;
    this.Velocity = Velocity;
    this.ShotCount = 0;
    this.Size = 80;
    this.Reverse = 0;
    this.Life = 8;
    this.Killed = false;
  }
  draw() {
    fill(255, 100, 100);
    ellipse(this.Position.X, this.Position.Y, this.Size, this.Size);
  }
  move() {
    this.ShotCount += 1;
    if (this.Reverse >= 120) {
      this.Velocity.X = this.Velocity.X * -1;
      this.Reverse = 0;
    }
    this.Position.X += this.Velocity.X;
    this.Position.Y += this.Velocity.Y;
    this.Reverse += random(0, 8);
    if (this.Position.Y >= 650) {
      this.Killed = true;
    }
  }
  damaged(damage) {
    this.Life -= damage;
    if (this.Life <= 0) {
      this.Killed = true;
      if (player.InvincibleCount <= 0) {
        killCount += 1;
        score += 7500;
      }
    }
  }
  shot() {
    if (this.ShotCount > 45) {
      enemy.bullets.push(
        new EneBulletA(
          new Vector(this.Position.X, this.Position.Y),
          new Vector(2, 2),
          8
        )
      );
      enemy.bullets.push(
        new EneBulletA(
          new Vector(this.Position.X, this.Position.Y),
          new Vector(-2, 2),
          8
        )
      );
      enemy.bullets.push(
        new EneBulletA(
          new Vector(this.Position.X, this.Position.Y),
          new Vector(2, -2),
          8
        )
      );
      enemy.bullets.push(
        new EneBulletA(
          new Vector(this.Position.X, this.Position.Y),
          new Vector(-2, -2),
          8
        )
      );
      this.ShotCount = 0;
    }
  }
}
class Boss {
  constructor(Position, Velocity) {
    this.Position = Position;
    this.Velocity = Velocity;
    this.shotCount = 0;
    this.shotInterval = 100;
    this.Size = 100;
    this.Life = 400;
    this.Killed = false;
  }
  draw() {
    fill(255, 10, 10);
    ellipse(this.Position.X, this.Position.Y, this.Size, this.Size);
    fill(100);
    quad(
      this.Position.X + 30,
      this.Position.Y - 10,
      this.Position.X + 60,
      this.Position.Y - 30,
      this.Position.X + 70,
      this.Position.Y - 10,
      this.Position.X + 60,
      this.Position.Y + 40
    );
    quad(
      this.Position.X - 30,
      this.Position.Y - 10,
      this.Position.X - 60,
      this.Position.Y - 30,
      this.Position.X - 70,
      this.Position.Y - 10,
      this.Position.X - 60,
      this.Position.Y + 40
    );
  }
  move() {
    this.shotCount += 10;
    if (this.Position.Y < 120) {
      this.Position.Y += this.Velocity.Y;
    }
  }
  damaged(damage) {
    this.Life -= damage;
    bossLife -= damage;
    if (this.Life <= 0) {
      this.Killed = true;
      if (player.InvincibleCount <= 0) {
        killCount += 1;
        score += 5000000;
      }
      GAMEOVER = true;
    }
  }
  shot() {}
}
class RED {
  constructor(Position, Velocity) {
    this.Position = Position;
    this.Velocity = Velocity;
    this.Size = 30;
    this.Life = 8;
    this.Killed = false;
  }
  draw() {
    fill(255, 0, 0);
    ellipse(this.Position.X, this.Position.Y, this.Size, this.Size);
  }
  move() {
    this.Position.X += this.Velocity.X;
    this.Position.Y += this.Velocity.Y;
    if (this.Position.Y >= 650) {
      this.Killed = true;
    }
  }
  damaged(damage) {
    this.Life -= damage;
    if (this.Life <= 0) {
      this.Killed = true;
      if (player.InvincibleCount <= 0) {
        killCount += 1;
        score += 150000;
      }
    }
  }
  shot() {}
}
class EneBulletA {
  constructor(Position, Velocity, Size) {
    this.Position = Position;
    this.Velocity = Velocity;
    this.Size = Size;
    this.Killed = false;
  }
  draw() {
    fill(255, 100, 100);
    noStroke();
    ellipse(this.Position.X, this.Position.Y, this.Size, this.Size);
    stroke(1);
    fill(255);
  }
  move() {
    this.Position.X += this.Velocity.X;
    this.Position.Y += this.Velocity.Y;
    if (this.Position.Y >= 600) {
      this.Killed = true;
    }
    if (this.Position.Y <= 0) {
      this.Killed = true;
    }
  }
  hit() {
    this.Killed = true;
  }
}
class Vector {
  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
  }
}
var player = new Player(230, 500);
var enemy = new Enemies();
var generateCount = 0;
var geneInterval = 90;
var bossExist = false;
var bossLife = 400;
var killCount = 0;
var score = 0;
var combo = 0;
var comboContinuity = 0;
var GAMEOVER = false;
var x = 0;
var survivalSeconds = 0;
var secondCount = 0;
var gamemode = 0;
var extra = false;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("screen");
  background(0, 0, 0);
  frameRate(60);
}
function draw() {
  if (gamemode == 1) {
    if (keyIsDown(84)) {
      title();
    }
    if (keyIsDown(82)) {
      retry();
    }
    if (keyIsDown(81)) {
      GAMEOVER = true;
    }
    if (GAMEOVER == false) {
      updateGame();
    }
    drawGame();
    if (GAMEOVER == true) {
      gameover();
    }
  } else {
    updateTitle();
    drawTitle();
  }
}
function updateGame() {
  if (generateCount >= geneInterval) {
    if (killCount >= 10) {
      if (bossExist == false) {
        geneInterval = 60;
      }
      enemy.createB();
      enemy.createRED();
      if (bossExist == true) {
        enemy.createBossBullets();
      }
    } else {
      enemy.createA();
    }
    generateCount = 0;
  } else {
    generateCount += 1;
  }
  if (bossExist == false) {
    if (killCount >= 100) {
      enemy.createBoss();
      bossExist = true;
      geneInterval = 45;
    }
  }
  updatePlayer();
  updateEnemies();
  secondCount += 1;
  if (secondCount == 60) {
    survivalSeconds += 1;
    secondCount = 0;
  }
  if (comboContinuity > 0) {
    comboContinuity -= 1;
  }
  if (comboContinuity == 0) {
    combo = 0;
  }
  for (var e of enemy.enemies) {
    for (var b of player.bullets) {
      if (
        sqrt(
          sq(b.Position.X - e.Position.X) + sq(b.Position.Y - e.Position.Y)
        ) <=
        b.Size / 2 + e.Size / 2
      ) {
        b.hit();
        e.damaged(b.Power);
      }
    }
    if (
      sqrt(sq(player.X - e.Position.X) + sq(player.Y - e.Position.Y)) <=
      player.Size / 2 + e.Size / 2
    ) {
      if (player.InvincibleCount == 0) {
        player.damaged();
        e.damaged(player.Power);
      }
    }
  }
  for (var eb of enemy.bullets) {
    if (
      sqrt(sq(eb.Position.X - player.X) + sq(eb.Position.Y - player.Y)) <=
      eb.Size / 2 + player.Size / 2
    ) {
      eb.hit();
      player.damaged();
    }
  }
  player.bullets = player.bullets.filter(function(b) {
    return !b.Killed;
  });
  enemy.enemies = enemy.enemies.filter(function(e) {
    return !e.Killed;
  });
  enemy.bullets = enemy.bullets.filter(function(eb) {
    return !eb.Killed;
  });
  if (player.Energy < player.MaxEnergy / 5) {
    score -= 100;
  }
}
function drawGame() {
  fill(255);
  rect(30, 30, 400, 540);
  for (var b of player.bullets) {
    b.draw();
  }
  drawPlayer();
  for (var e of enemy.enemies) {
    e.draw();
  }
  for (var eb of enemy.bullets) {
    eb.draw();
  }
  setCanvas();
  // fill(0);
  // textSize(32);
  // text(player.bullets.length, 80, 80);
}
function drawPlayer() {
  player.draw();
}
function updatePlayer() {
  player.move();
  player.shot();
  player.X = constrain(player.X, 52, 408);
  player.Y = constrain(player.Y, 72, 542);
  for (var b of player.bullets) {
    b.move();
  }
}
function updateEnemies() {
  for (var e of enemy.enemies) {
    e.move();
    if (extra == true) {
      e.shot();
    }
    e.X = constrain(e.X, 20, 440);
    e.Y = constrain(e.Y, -100, 700);
  }
  for (var eb of enemy.bullets) {
    eb.move();
  }
}
function setCanvas() {
  fill(0);
  rect(0, 0, 800, 30);
  rect(0, 30, 30, 540);
  rect(430, 30, 370, 540);
  rect(0, 570, 800, 30);
  fill(255);
  textSize(40);
  text("Simple Shooter", 440, 62);
  textSize(32);
  if (score >= 0) {
    text("Score:" + score, 440, 100);
  } else {
    text("Score:0-", 440, 100);
  }
  text(combo, 440, 142);
  textSize(22);
  text("Combo", 530, 142);
  rect(530, 110, comboContinuity * 2, 6);
  for (var i = 9; i > 0; i -= 1) {
    rect(402 + i * 38, 160, 26, 10);
    rect(402 + i * 38, 220, 26, 10);
  }
  textSize(40);
  if (bossExist == false) {
    text("KILL : " + killCount, 440, 210);
  } else {
    fill(255, secondCount * 4, secondCount * 4);
    text("!DANGER!", 505, 210);
    fill(255);
  }
  if (player.shotCountA > 100) {
    rect(490, 530, 170, 16);
  } else {
    rect(490, 530, player.shotCountA * 1.7, 16);
  }
  if (player.shotCountB > 100) {
    rect(490, 554, 170, 16);
  } else {
    rect(490, 554, player.shotCountB * 1.7, 16);
  }
  for (var i = player.Life; i > 0; i -= 1) {
    rect(770 - i * 16, 530, 10, 40);
  }
  rect(440, 570 - player.Energy / 4, 40, player.Energy / 4);
  if (player.Energy < player.MaxEnergy / 5) {
    fill(255, 0, 0, 255 - player.Energy);
    textSize(48);
    text("ENERGY", 148, 300);
    text("CAUTION!!", 124, 354);
  }
  if (bossExist == true) {
    if (bossLife <= 0) {
      bossLife = 0;
    }
    fill(255, 0, 0);
    rect(31, 31, bossLife, 4);
    fill(255);
  }
}
function drawTitle() {
  fill(255);
  rect(30, 30, 740, 540);
  fill(0);
  textSize(100);
  text("Simple", 40, 120);
  text("Shooter", 140, 224);
  textSize(60);
  text("PRESS Z KEY", 60, 320);
  if (extra == true) {
    text("Mode:ExTrA", 50, 550);
  }
}
function updateTitle() {
  if (keyIsDown(90)) {
    gamemode = 1;
  }
  if (keyIsDown(88)) {
    if (extra == false) {
      extra = true;
    } else {
      extra = false;
    }
  }
}
function title() {
  retry();
  extra = false;
  gamemode = 0;
}
function retry() {
  //Clear All Enemies and Bullets
  player.bullets = player.bullets.filter(function(b) {
    return b.Killed;
  });
  enemy.enemies = enemy.enemies.filter(function(e) {
    return e.Killed;
  });
  enemy.bullets = enemy.bullets.filter(function(eb) {
    return eb.Killed;
  });
  //Set
  player.InvincibleCount = 60;
  player.X = 230;
  player.Y = 500;
  killCount = 0;
  bossLife = 400;
  combo = 0;
  bossExist = false;
  GAMEOVER = false;
  player.Life = 6;
  generateCount = 0;
  geneInterval = 90;
  bossExist = false;
  score = 0;
  x = 0;
  survivalSeconds = 0;
  secondCount = 0;
  fill(255);
  rect(0, 0, 800, 600);
}
function gameover() {
  fill(0, 0, 0, 100);
  rect(0, 0, 800, 600);
  fill(0);
  strokeWeight(4);
  stroke(255);
  textSize(82);
  text("Results", x - 70, 200);
  if (x < 180) {
    x += 4;
  }
  textSize(40);
  text("Battle Score", x - 70, 300);
  text(score, x + 270, 300);
  text("Time", x - 70, 350);
  text(survivalSeconds + " sec", x + 270, 350);
  text("Remain Life", x - 70, 400);
  text(player.Life, x + 270, 400);
  textSize(50);
  text("Score : ", x - 70, 480);
  text(score * (player.Life + 1) - survivalSeconds * 1000, x + 140, 480);
  textSize(100);
  if (score * (player.Life + 1) - survivalSeconds * 1000 < 0) {
    text("E", x + 300, 200);
  }
  if (score * (player.Life + 1) - survivalSeconds * 1000 >= 0) {
    if (score * (player.Life + 1) - survivalSeconds * 1000 < 500000) {
      text("D", x + 300, 200);
    }
  }
  if (score * (player.Life + 1) - survivalSeconds * 1000 >= 500000) {
    if (score * (player.Life + 1) - survivalSeconds * 1000 < 10000000) {
      fill(40, 50, 40);
      text("C", x + 300, 200);
    }
  }
  if (score * (player.Life + 1) - survivalSeconds * 1000 >= 10000000) {
    if (score * (player.Life + 1) - survivalSeconds * 1000 < 50000000) {
      fill(50, 70, 140);
      text("B", x + 300, 200);
    }
  }
  if (score * (player.Life + 1) - survivalSeconds * 1000 >= 50000000) {
    if (score * (player.Life + 1) - survivalSeconds * 1000 < 100000000) {
      fill(230, 0, 30);
      text("A", x + 300, 200);
    }
  }
  if (score * (player.Life + 1) - survivalSeconds * 1000 >= 100000000) {
    if (score * (player.Life + 1) - survivalSeconds * 1000 < 500000000) {
      fill(250, 235, 125);
      text("S", x + 300, 200);
    }
  }
  if (score * (player.Life + 1) - survivalSeconds * 1000 >= 500000000) {
    if (score * (player.Life + 1) - survivalSeconds * 1000 < 2500000000) {
      fill(250, 235, 125);
      text("SS", x + 300, 200);
    }
  }
  if (score * (player.Life + 1) - survivalSeconds * 1000 >= 2500000000) {
    if (score * (player.Life + 1) - survivalSeconds * 1000 < 10000000000) {
      fill(250, 235, 125);
      text("SSS", x + 300, 200);
    }
  }
  if (score * (player.Life + 1) - survivalSeconds * 1000 >= 10000000000) {
    fill(250, 130, 245);
    textSize(80);
    text("Legend", x + 300, 200);
  }
  strokeWeight(1);
}
