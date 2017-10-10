var canvas = document.querySelector('canvas');

canvas.width = 1000;//window.innerWidth;
canvas.height = 750; //window.innerHeight;

console.log(canvas);

var c = canvas.getContext('2d');

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
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
    this.x += this.dx;
    this.y -= this.dy;
    this.draw();
  } 
}

function animate () {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  one.life++;
  if (one.life === 100) {
    for (let i = 0; i < 7; i++) {
      particles.push(new Circle(one.x, one.y, 5, 5 * Math.tan(i / 7 * Math.PI), 5));
    }
    one.radius = 101;
  }
  one.dy = one.dy*0.982;
  // this.radius -= this.life * this.dy * 0.01;

  one.update();
  if (particles.length > 0) {
    particles.forEach(particle.update());
  }

}

var particles = [];
var one = new Circle(canvas.width/2, canvas.height*0.75, 0, 5, 20);
// var particle = new Circle(-100, -100, 10, 0, 5);

animate();

// if (one.radius === 100) {
//   var particle = new Circle(one.x, one.y, one.dx, one.dy, one.radius);
// }
