// This code is the true equivalent of a dumpster fire
// I'm sorry for whoever has to read this, I pray for your safety

var box = document.getElementsByClassName("clickable")[0];
var count = parseInt(box.id);

// setting the max num of circles
const max = 2500;

box.onclick = function () {
  var ok = true;
  
  // i dont want to add any more circles than the exact number of 2500
  // hence this code check while determining num of circles to add to the box
  if (ok === true && count <= max) {
    var num = count * 2 > max ? (max - count) : count * 2;
    for (var i = 0; i < num ; i++) { addCircle() }
    box.id = num;

    ok = false;
 }

  if (count >= max) {
    // doing this makes it a 50x50 grid with 2500 circles
    // now it makes sense to set max to 2500 amirite?
    box.style.gridTemplateColumns = "repeat(50, 1fr)";
    box.id="full";

    // next step is to use a spritesheet to make the rickroll animation

    // defining my spritesheet image object
    var img_obj = {
      'source': null,
      'current': 0,
      'total_frames': 52,
      'width': 50,
      'height': 50
    };

    const img = new Image();
    img.onload = function () { // Triggered when image has finished loading.
      img_obj.source = img;  // we set the image source for our object.
    }

    img.src = "./data/ricksprite.png";

    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;
    var context = canvas.getContext("2d");
    setInterval(function () { rickRoll(canvas, context, 0, 0, img_obj) }, 100);
    
    var banner = document.getElementById('banner');
    banner.classList.add('rainbow_text_animated');
    banner.innerHTML = "RICKROLLED AHAHAHA!"; // another message to remind that you've been rickrolled
    box.onclick = null;
    
  }

};

// this function adds a new circle to the box
function addCircle() {
  var circle = document.createElement('div');
  circle.className = 'circle';
  circle.id = count;
  box.appendChild(circle);
  box.id = count++;
}

// this function takes care of the animation by moving the spritesheet and taking each frame to draw
// once the frame is determined, it checks for each dark pixel and then colors the appropriate circle with black
function rickRoll(canvas, context, x, y, iobj) {
  // coloring all black pixels to normal before animation to reset the box
  // seems like a glitch where if i dont run it twice, it creates a weird effect
  clearBox();
  clearBox();
  
  if (iobj.source != null){
    context.drawImage(iobj.source, iobj.current * iobj.width, 0, iobj.width, iobj.height, x, y, iobj.width, iobj.height);
  }

  iobj.current = (iobj.current + 1) % iobj.total_frames;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let data = context.getImageData(x, y, 1, 1).data;
      if (data && data[0] <= 20 && document.getElementById(((y+1) * 50 + x + 1).toString())) {
        document.getElementById(((y+1) * 50 + x + 1).toString()).classList.add("dark");
      }
    }
  }

  iobj.current = (iobj.current + 1) % iobj.total_frames;
}

// this function removes the dark class from all circles
function clearBox() {
  let elems = document.getElementsByClassName("dark");
  for (let i = 0; i < elems.length; i++) {
    elems[i].classList.remove("dark");
  }
}
