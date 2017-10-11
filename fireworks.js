var canvas = document.querySelector('canvas');

canvas.width = 1000;//window.innerWidth;
canvas.height = 750; //window.innerHeight;

var c = canvas.getContext('2d');
var gravity = 1;

const colors = [
  '#00E8D1',
  '#61FF00',
  '#E000FF',
  '#FF5A00',
  '#F8FF00'
]

class Rocket {
  constructor(x, y, speed, angle, angleZ, radius, opacity, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.angleZ = angleZ;
    this.radius = radius;
    this.life = 0;
    this.color = color;
    this.opacity = opacity;
  }

  draw(LastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.globalAlpha = this.opacity;
    // console.log(this.radius + ': ' + c.globalAlpha);
    c.lineWidth = this.radius;
    c.moveTo(LastPoint.x, LastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }

  update() {
    const LastPoint = {x: this.x, y: this.y};
    this.x += speedToXY(this.speed, this.angle, this.angleZ).dx;
    this.y += speedToXY(this.speed, this.angle, this.angleZ).dy;
    this.draw(LastPoint);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.globalAlpha = 1;
  c.fillStyle = 'rgba(0,0,0,0.3)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  one.life++;
  if (one.life === 100) {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        particles.push(new Rocket(one.x, one.y, 30, Math.random() * (i / 20 * 360) + ((i + 1) / 20 * 360), Math.random() * (j / 20 * 360) + ((j + 1) / 20 * 360), 1, 1, one.color));
        console.log('angle ' + i / 20 * 360 + '; color:' + particles[i].color);
      }
    }
    
  }
  one.speed *= 0.963;
  // this.radius -= this.life * this.dy * 0.01;

  one.update();
  if (particles.length > 0) {
    particles.forEach(function(particle) {
      particle.opacity > 0.01 ? particle.opacity -= 0.01 : particle.opacity > 0.005 ? particle.opacity -= 0.005 : particle.opacity = 0;
      particle.speed *= 0.92;
      gravity > 0 ? gravity -= 0.000034 :  gravity -= 0;
      particle.speed = fuse(particle.speed, particle.angle, gravity, 90).speed;
      particle.angle = fuse(particle.speed, particle.angle, gravity, 90).angle;
      particle.update();
    });
  }
}

function speedToXY(speed, angle, angleZ = 0) {
  let obj = {};
  obj.dx = speed * Math.cos(angle / 180 * Math.PI) * Math.cos(angleZ / 180 * Math.PI);
  obj.dy = speed * Math.sin(angle / 180 * Math.PI);
  return obj;
}

function fuse(speed1, angle1, speed2, angle2) {
  let obj = {}
  obj.dx = speedToXY(speed1, angle1).dx + speedToXY(speed2, angle2).dx;
  obj.dy = speedToXY(speed1, angle1).dy + speedToXY(speed2, angle2).dy;
  obj.speed = Math.sqrt(Math.pow(obj.dx, 2) + Math.pow(obj.dy, 2));
  obj.angle = Math.atan2(obj.dy, obj.dx) / Math.PI * 180;
  if (Math.abs(obj.dx) < 0.00001 && Math.abs(obj.dy) < 0.00001) {
    obj.angle = angle1;
  }
  // }
  return obj;
}

// console.log(Math.sqrt(0));
console.log(speedToXY(1, -90).dx);
console.log(Math.sqrt(Math.pow(0,2) + Math.pow(0,2)));
// console.log(Math.atan2(-2,0) / Math.PI * 180);
// console.log(speedToXY(5.38, Math.atan2(-5,2) / Math.PI * 180));

// var angg = -160;

// console.log('@ fuse speed: ' + fuse(1, angg, 1, 90).speed);
// console.log('@ fuse angle: ' + fuse(1, angg, 1, 90).angle);
// console.log('@ 1fuse dx: ' + fuse(1, angg, 1, 90).dx);
// console.log('@ 1fuse dy: ' + fuse(1, angg, 1, 90).dy);

var particles = [];
var one = new Rocket(canvas.width/2, canvas.height*0.75, 10, -90, 0, 1, 1, colors[Math.floor(Math.random() * colors.length)]);
// var papardicle = new Circle(-10000, -10000, 10, angg, 5);
// var particle = new Circle(-100, -100, 10, 0, 5);

animate();

// if (one.radius === 100) {
//   var particle = new Circle(one.x, one.y, one.dx, one.dy, one.radius);
// }
