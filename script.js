let canvas = document.getElementById('scene');
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

let ctx = canvas.getContext("2d");

//image coloré
let tintedImage = null; 

const triangleImage = new Image();
triangleImage.src = './Image/barcode.png'; 

triangleImage.onload = () => {
  let offScreenCanvas = document.createElement('canvas');
  offScreenCanvas.width = triangleImage.width;
  offScreenCanvas.height = triangleImage.height;
  let offCtx = offScreenCanvas.getContext('2d');

  offCtx.drawImage(triangleImage, 0, 0);
  offCtx.globalCompositeOperation = 'source-in';
  offCtx.fillStyle = "#00d5ffce";
  offCtx.fillRect(0, 0, offScreenCanvas.width, offScreenCanvas.height);

  tintedImage = offScreenCanvas;
  console.log("Image colorée youhouuuu !");
  
  window.requestAnimationFrame(monAnimationKawaii);
};

//class principal
class Point {
  constructor() {
    this.pos = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    };
    this.vitesse = {
      x: 5,
      y: 5
    }; 
  }
  
  bouger(){
    this.pos.x += this.vitesse.x;
    this.pos.y += this.vitesse.y;
  }
}

// Les classes secondaires
class Triangle extends Point {
  constructor(){
    super();
    this.arrete = 45 + Math.random() * 175;
    this.couleur = "#00d5ffce";

    this.vitesse.x = 2 + Math.random() * 2; 
    this.vitesse.y = 0; 
    
    this.pos.x = -this.arrete;
  }

  bouger(){
    super.bouger();
    
    if (this.pos.x > canvas.width + this.arrete) {
      this.pos.x = -this.arrete;
      this.pos.y = Math.random() * canvas.height;
    }
    
    this.dessiner();
  }
  
  dessiner() {
    if (tintedImage) {
      ctx.drawImage(
        tintedImage, 
        this.pos.x - this.arrete / 2, 
        this.pos.y - this.arrete / 2, 
        this.arrete, 
        this.arrete
      );
    }
  }
}

class Carre extends Point {
  constructor(){
    super();
    this.cote = 8 + Math.random() * 8;
    this.couleur = "rgba(255, 255, 0, 0.85)";
    
    this.vitesse.x = 0; 
    this.vitesse.y = 2 + Math.random() * 2;
    
    this.pos.y = -this.cote;
  }
  
  bouger(){
    super.bouger();
    
    if (this.pos.y > canvas.height + this.cote) {
      this.pos.y = -this.cote;
      this.pos.x = Math.random() * canvas.width;
    }
    
    this.dessiner();
  }

  dessiner(){
    ctx.fillStyle = this.couleur;
    ctx.fillRect(
      this.pos.x - this.cote / 2, 
      this.pos.y - this.cote / 2, 
      this.cote, 
      this.cote
    );
  }
}

class Rond extends Point {
  constructor(){
    super();
    this.rayon = 6 + Math.random() * 25;
    this.couleur = "rgba(219, 0, 0, 0.85)";
    
    this.vitesse.x = -2 + Math.random() * 4;
    this.vitesse.y = -2 + Math.random() * 4;
  }
  
  // Plus besoin de passer le tableau ni de vérifier les voisins !
  bouger(){
    if (this.pos.x - this.rayon < 0 || this.pos.x + this.rayon > canvas.width) {
      this.vitesse.x *= -1;
    }
    if (this.pos.y - this.rayon < 0 || this.pos.y + this.rayon > canvas.height) {
      this.vitesse.y *= -1;
    }
    
    super.bouger();
    this.dessiner();
  }
  
  dessiner(){
    ctx.fillStyle = this.couleur;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.rayon, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

let mespoints = [];

for (let j = 0; j < 40; j++) {
  mespoints.push(new Triangle());
}

for (let j = 0; j < 120; j++) {
  mespoints.push(new Carre());
}

for (let j = 0; j < 30; j++) {
  mespoints.push(new Rond());
}

console.log('mespoints', mespoints);

function monAnimationKawaii(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < mespoints.length; i++) {  
    mespoints[i].bouger();
  }

  window.requestAnimationFrame(monAnimationKawaii);
}