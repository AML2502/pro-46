const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bg1,bg2,SS;
var lander;

var vx=0;
var g=0.05;
var vy=0;
var fuel=100;

var thrust,left,right,crash,land,normal,obstacleImg,lzImg;

function preload()
{
	bg1=loadImage("bg_sur.png");
	bg2=loadImage("bg.png");

	SS=loadImage("normal.png");

	thrust=loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")

	crash=loadAnimation("crash1.png","crash2.png","crash3.png");

	land=loadAnimation("landing1.png","landing2.png","landing_3.png");

	left=loadAnimation("left_thruster_1.png","left_thruster_2.png");
	right=loadAnimation("right_thruster_1.png","right_thruster_2.png");

	normal=loadAnimation("normal.png");

	obstacleImg=loadImage("obstacle.png");
	lzImg=loadImage("lz.png");
	
	thrust.playing=true;
	thrust.looping=false;
	left.looping=false;
	right.looping=false;
}

function setup() 
{

	createCanvas(1000, 700);
	frameRate(80);
	timer=1500

	thrust.frameDelay=5
	left.frameDelay=5;
	right.frameDelay=5;


	lander=createSprite(100,50,30,30);
	lander.addImage(SS)
	lander.scale=0.1;

	lander.addAnimation("thrusting",thrust)
	lander.addAnimation("left1",left);
	lander.addAnimation("right1",right);
	lander.addAnimation("normal",normal);


	ground=createSprite(500,690,1000,20);
	ground.shapeColor="black";
	
	engine = Engine.create();
	world = engine.world;

	lander.setCollider("rectangle",0,0,200,200);
	lander.debug=true;

	Engine.run(engine);
  
}


function draw() 
{

	rectMode(CENTER);

	background(0);
	image(bg2,0,0);

	push()
		fill("black");
		textSize(20);
		text("Vertical Velocity: "+round(vy),200,25);
		text("Fuel:"+fuel,450,25);
		text("Horizontal Velocity:"+ round(vx,2),600,25)
	pop();

	vy=vy+g;

	lander.position.y=lander.position.y+vy;
	lander.position.x=lander.position.x+vx;
	
	drawSprites();

	
}

 function upwardThrust(){
	 vy=-1;
	 fuel=fuel-1;
 }
 function rightThrust(){
	vx+=0.2;
	fuel=fuel-1
}
function leftThrust(){
	vx-=0.2;
	fuel=fuel-1;
} 

function stop(){
	vx=0;
	g=0;
	vy=0;
	fuel=0;
}

 function keyPressed()
 {

	 if(keyCode===UP_ARROW && fuel>0)
	 {
		upwardThrust();
		lander.changeAnimation("thrusting")
		thrust.nextFrame();
	 }

	 if (keyCode===RIGHT_ARROW && fuel>0)
	 {
		 rightThrust();
		 lander.changeAnimation("right1");
	 }

	 if(keyCode===LEFT_ARROW&& fuel>0)
	 {
		 leftThrust();
		lander.changeAnimation("left1")
	 }

 }

 






