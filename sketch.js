let zombie = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i<8; i++){
    zombie.push(new Mover());
  }
}

function draw() {
  background(210, 215, 220);
  for (let i=0; i<zombie.length; i++){
    zombie[i].gerakCuy();
    zombie[i].tampil();
    zombie[i].cekBatas();
  }
} //ini fungsi draw


class Mover {
  constructor(){
    this.location = createVector(random(width), random(height));
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0.01,-0.01);
    this.panjangLebar = random(2,16);
  }
  
  tampil(){
    noStroke();
    fill(random(0, 235), random(3, 29), random(8, 201));
    rect(this.location.x, 
             this.location.y,
            this.panjangLebar,
            this.panjangLebar);
  }
  
  gerakCuy(){
    var mouse = createVector(mouseX, mouseY);
    
    var arahMouse = p5.Vector.sub(mouse, this.location);
    var topSpeed = random(1,50);
    
    arahMouse.normalize();
    arahMouse.mult(0.5); 
  
    
    this.velocity.add(this.acceleration);
    this.velocity.add(arahMouse);
    /*
    kesalahan di kelas terjadi karena hal berikut:
    this.velocity.add(this.arahMouse);
    padahal seharusnya arahMouse tidak membutuhkan referensi
    karena variabel tersebut adalah variabel lokal.
    */
    this.velocity.limit(topSpeed);
    this.location.add(this.velocity);
    
  }
  
  cekUjung(){
    if ( this.location.x > windowWidth ) {
      this.location.x = 0;
    }
    else if (this.location.x < 0){
      this.location.x = windowWidth;
    }
  
    if ( this.location.y > windowHeight ) {
      this.location.y = 0;
    }
    else if (this.location.y < 0){
      this.location.y = windowHeight;
    }
  }
  
  cekBatas(){
    if (this.location.x < 0 || this.location.x > width){
      this.velocity.x = -1*this.velocity.x
    }
    else if (this.location.y < 0 || this.location.y > height){
      this.velocity.y = -1*this.velocity.y
    }
  }
}