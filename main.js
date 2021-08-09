audio="";
status="";
objects="";


function preload(){
    audio=createAudio("alarm.mp3");
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(480,380);

}

function start(){
    objectDetector=ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML="status : Detecting Objects";
}

function draw(){
image(video,0,0,480,380);
if(status !=""){
    objectDetector.detect(video, gotResult);
    for(i=0; i< objects.length; i++ ) {
        document.getElementById("status").innerHTML="status : Object Detected";
        if(objects[i].label=="Person"){
        document.getElementById("found").innerHTML="Baby Found";
        }
        else if(object[i].label !="Person"){
            document.getElementById("found").innerHTML="Baby Not Found";
            audio.play();
        }
        else if(object.length <0){
            document.getElementById("found").innerHTML="Baby Not Found";
            audio.play();
        }
        fill("#FF0000");
        percent= floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent +"%",objects[i].x + 15 , objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}

function modelLoaded(){
    status=true;
    console.log("modelLoaded");
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}