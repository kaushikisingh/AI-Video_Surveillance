video="";
status="";
objects=[];
function preload()
{
    video=createVideo("video.mp4");
    video.hide();
}
function setup()
{
    canvas=createCanvas(300,300);
    canvas.center();
}
function draw()
{
    image(video,0,0,300,300);
    if(status!="")
    {
        object_dectector.detect(video,gotResults);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="status: object detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are"+objects.length;

            fill("blue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("pink");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function start()
{
    object_dectector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: object detected";
}
function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
      
    }
}