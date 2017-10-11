var canvas = document.querySelector('canvas');

canvas.width = 1000;//window.innerWidth;
canvas.height = 750; //window.innerHeight;

var c = canvas.getContext('2d');

function Circle(x, y, speed, angle, radius) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.angle = angle;
  this.radius = radius;
  this.life = 0;


  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = 'blue';
    c.stroke();
    c.fill();
  }

  this.update = function () {
    this.x += speedToXY(this.speed, this.angle).dx;
    this.y += speedToXY(this.speed, this.angle).dy;
    this.draw();
  } 
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  one.life++;
  if (one.life === 100) {
    for (let i = 0; i < 7; i++) {
      particles.push(new Circle(one.x, one.y, 5, i / 7 * 360, 5));
    }
  }
  one.speed *= 0.982;
  // this.radius -= this.life * this.dy * 0.01;

  one.update();
  if (particles.length > 0) {
    particles.forEach(function(particle) {
      // console.log(particle.speed + ' ' + particle.angle)
      particle.speed = collide(particle.speed, particle.angle, 1, 90).speed;
      particle.angle = collide(particle.speed, particle.angle, 1, 90).angle;      
      // console.log(particle.dy);
      particle.update();
    })
  }

}

function speedToXY(speed, angle) {
  let obj = {};
  obj.dx = speed * Math.cos(angle / 180 * Math.PI);
  obj.dy = speed * Math.sin(angle / 180 * Math.PI);
  return obj;
}

function collide(speed1, angle1, speed2, angle2) {
  let obj = {}
  obj.dx = speedToXY(speed1, angle1).dx + speedToXY(speed2, angle2).dx;
  obj.dy = speedToXY(speed1, angle1).dy + speedToXY(speed2, angle2).dy;
  obj.speed = Math.sqrt(Math.pow(obj.dx,2) + Math.pow(obj.dy,2));
  obj.angle = Math.atan(obj.dy / obj.dx) / Math.PI * 180;
  return obj;
}

console.log(speedToXY)
// console.log(Math.atan(-5/2) / Math.PI * 180);
// console.log(speedToXY(5.38, Math.atan(-5/2) / Math.PI * 180));
console.log(collide(5.38, Math.atan(-5/2) / Math.PI * 180, 3.16, Math.atan(1/3) / Math.PI * 180).speed + ' __ ' + collide(5.38, Math.atan(-5/2) / Math.PI * 180, 3.16, Math.atan(1/3) / Math.PI * 180).angle);

var particles = [];
var one = new Circle(canvas.width/2, canvas.height*0.75, 5, -90, 20);
// var particle = new Circle(-100, -100, 10, 0, 5);

animate();

// if (one.radius === 100) {
//   var particle = new Circle(one.x, one.y, one.dx, one.dy, one.radius);
// }
