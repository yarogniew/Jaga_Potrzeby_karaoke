// Yarogniew Milewski
// Thanks to Daniel Shiffman
// http://codingtra.in
// music & text of song Katarzyna Dworaczyk

var songB;
var amp;
var button;
var shpSize;
var volhistory = [];
var j, k, n, t;
var xoff = 0.05;
var result;
var timeOfSong;
var karaokeTime = [6, 12, 19, 25, 37, 44, 50, 56, 62, 68, 74, 80];
var millisecond;
var startmillis;


function preload() {
  myFont = loadFont('Sansation_Regular.ttf');
  result = loadStrings('tekstpiosenki.txt');
  songB = loadSound('Potrzeby.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shpSize = min(windowWidth, windowHeight)* 0.8; //choose the smaller side of the screen
  angleMode(DEGREES);
  background(50);
  textFont(myFont);

  reSetup();
}

function draw() {

  n = noise(xoff)*2;
  var vol = amp.getLevel();
  volhistory.push(vol);
  var s = map(vol, 0, 0.5, 0, 255);
  j = random(0,40);
  fill(s+50*n, j, 100,  s+100);
  strokeWeight(1);
  stroke(s+50, 100, j,  s+100, s-100);
  push();
  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i < 380; i+=11) {
      var r = map(volhistory[i], 0, 1, 0, shpSize*vol*6);
      var x = r * cos(i);
      var y = r * sin(i);
      curveVertex(x, y);
  }

  endShape(CLOSE);

  if (volhistory.length > 380) {
    volhistory.splice(0, 2);
  }

  pop();
  if (songB.isPlaying())
  {
  timeOfSong = round((millis()-startmillis)/1000);
  karaoke();
  }
console.log(timeOfSong, songB.isPlaying());

}

function reSetup(){
  background(50);
  button = createButton('zatrzymaj');
  button.mousePressed(toggleSong);
  button.position(20, shpSize/20*2);
  button.size(100);

  songB.play();
  startmillis = millis();
  amp = new p5.Amplitude();
  amp.setInput(songB);
  t = 0;
  textAlign(CENTER);
  textSize(shpSize/23);
  fill(180);
  noStroke();
  fill(50);
  rect(0, 0, windowWidth, shpSize/20*2 )
}

function toggleSong() {
  if (songB.isPlaying()) {
      songB.stop();
      button = createButton('graj');
      button.mousePressed(toggleSong);
      button.position(20, shpSize/20*2);
      button.size(100);
  } else {
    reSetup();
  }
}

function karaoke(){
  if (timeOfSong == karaokeTime[t]){
  noStroke();
  fill(50);
  rect(0, 0, windowWidth, shpSize/20*2 )
  textAlign(CENTER);
  textSize(shpSize/23);
  fill(180);
  text(result[t], width / 2, shpSize/20+5);
  t++;}
}
