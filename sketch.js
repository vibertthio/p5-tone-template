let transport = Tone.Transport;
let playBtn = document.getElementById("play-btn");
console.log("made by Vibert (vibertthio.com)");
StartAudioContext(Tone.context, "#play-btn").then(() => {
  console.log("audio context started");
  playBtn.addEventListener("click", e => {
    playBtn.style.display = "none";
    transport.start();
    playing = true;
  });
});


/** Build your musical sketch **/

let playing = false;
let position;
let synth;
let windowSize;

function setup() {
  let canvas = createCanvas(640, 480);
  windowSize = { width: window.innerWidth, height: window.innerHeight };
  canvas.parent("p5-canvas");
  textFont('IBM Plex Mono');
  textAlign(CENTER, CENTER);
  textSize(21);
  
  background(185, 0, 255, 100);
  
  synth = new Tone.Synth().toMaster();
  transport.scheduleRepeat((time) => {
    synth.triggerAttackRelease('C2', '16n');
    alpha = 1;
  }, '2n')
}

function draw() {
  let w = min(width, windowSize.width);
  let h = min(height, windowSize.height);
  
  position = transport.position.substring(0, transport.position.indexOf('.'));
  alpha *= 0.9;
  
  if (playing) {
    background(255);
    fill(185, 0, 255);
    rect(-1, -1, width + 2, height + 2);
    
    
    push();
    translate(w * 0.5, h * 0.5);
    fill(255);
    text('p5 <canvas>', 0, 40);
    text(position, 0, 80);
    
    noStroke();
    fill(255, alpha * 255);
    ellipse(0, -40, 40, 40);
    pop();
  }
}


function windowResized() {
  windowSize = { width: windowWidth, height: windowHeight };
}
