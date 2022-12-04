var box = document.getElementsByClassName("clickable")[0];
var count = parseInt(box.id);

const max = 2500;

box.onclick = function () {
  var ok = true;
  
  if (ok === true && count <= max) {
    var num = count * 2 > max ? (max - count) : count * 2;
    for (var i = 0; i < num ; i++) { addCircle() }
    box.id = num;

    ok = false;
 }

  if (count >= max) {
    // automate the color of the circle based on data.json in the data folder
    // each value of either 0 or 1 decides what the color of the circle should be
    // 0 = red
    // 1 = green
    // the color of the circle should be changed based on the value of the data.json file
    box.style.gridTemplateColumns = "repeat(50, 1fr)";
    box.id="full";

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
    var banner = document.createElement('h3');
    banner.className = "rainbow rainbow_text_animated";
    banner.innerHTML = "RICKROLLED AHAHAHA!";
    document.body.appendChild(banner);
    box.onclick = null;
    
  }

};

function addCircle() {
  var circle = document.createElement('div');
  circle.className = 'circle';
  circle.id = count;
  box.appendChild(circle);
  box.id = count++;
}

function rickRoll(canvas, context, x, y, iobj) {
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let data = context.getImageData(x, y, 1, 1).data;
      if (data && data[0] <= 20 && document.getElementById(((y+1) * 50 + x + 1).toString())) {
        document.getElementById(((y+1) * 50 + x + 1).toString()).style.backgroundColor = "#999";
      }
    }
  }

  if (iobj.source != null){
    context.drawImage(iobj.source, iobj.current * iobj.width, 0, iobj.width, iobj.height, x, y, iobj.width, iobj.height);
  }

  iobj.current = (iobj.current + 1) % iobj.total_frames;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let data = context.getImageData(x, y, 1, 1).data;
      if (data && data[0] <= 20 && document.getElementById(((y+1) * 50 + x + 1).toString())) {
        document.getElementById(((y+1) * 50 + x + 1).toString()).style.backgroundColor = "#333";
      }
    }
  }


  iobj.current = (iobj.current + 1) % iobj.total_frames;
}
