Webcam.set({
  width:350,
  height:300,
  image_format : 'png',
  png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

    
function take_snapshot()
{
  Webcam.snap(function(data_uri) {
      document.getElementById("result").innerHTML = '<img id="Take_Snapshot src="'+data_uri+'"/>';
  });
}

MustacheX=0;
MustacheY=0;

function preload() {
  Mustache_nose = loadImage('https://i.postimg.cc/3x3QzSGq/m.png');
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    MustacheX = results[0].pose.Mustache.x-15;
    MustacheY = results[0].pose.Mustache.y-15;
  }
}

function draw() {
  image(video, 0, 0, 300, 300);
  image(Mustache, MustacheX, MustacheY, 30, 30);
}

function take_snapshot(){    
  save('myFilterImage.png');
}
    