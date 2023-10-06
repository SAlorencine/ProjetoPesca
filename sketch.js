const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var FishingRod, Boat, isca, Minhoca, peixe1Group, peixe2Group;
var rigthFishGroup, leftFishGroup;
var boatImg, minhocaImg, peixe1Img, peixe2Img, peixe3Img, peixe4Img;
var SomAmbiente, SomCaptura, SomMovimento;
var  backgroundImg;
var spritInvisivel;
var Score = 0;
var gameState = 0;
var posX ;

function preload(){
    boatImg = loadImage("Images/Barco.png");
    minhocaImg = loadImage("Images/isca.png");
    peixe1Img = loadImage("Images/peixe1.png");
    peixe2Img = loadImage("Images/peixe2.png");
    peixe3Img = loadImage("Images/peixe3.png");
    peixe4Img = loadImage("Images/peixe4.png");
    backgroundImg = loadImage("Images/background.jpg");

    SomAmbiente = loadSound("Sounds/Ambiente.wav");
    SomCaptura = loadSound("Sounds/PegaPeixe.wav");
}
function setup(){
    createCanvas(windowWidth, windowHeight);

    engine = Engine.create();
    world = engine.world;

    peixe1Group = new Group();
    peixe2Group = new Group();

    
    Boat = createSprite(width/3 - 200, height/2 - 50, 50, 50,);
    Boat.addImage(boatImg);
    Boat.scale = 0.5

    isca = new Isca(Boat.position.x -40, Boat.position.y + 170 , 30, 30);

    spritInvisivel = createSprite(isca.body.position.x, isca.body.position.y, 50, 50);
    spritInvisivel.visible = false;

    FishingRod = new Rod(isca.body,{x:Boat.position.x- 55,y:Boat.position.y-65});

    SomAmbiente.loop();

}
function draw(){
    background(backgroundImg);
    

    if(gameState == 0){
    spritInvisivel.position.x = isca.body.position.x;
    spritInvisivel.position.y = isca.body.position.y;


        if(keyDown("left")){
            Boat.position.x = Boat.position.x - 2;
            Matter.Body.setPosition(isca.body, {x:Boat.position.x- 40, y: Boat.position.y + 70});
            FishingRod.updateSlingPosition(Boat.position.x- 55,Boat.position.y-65);
        }else if(keyDown("right")){
            Boat.position.x = Boat.position.x + 2;
            Matter.Body.setPosition(isca.body, {x:Boat.position.x- 40, y: Boat.position.y + 70});
            FishingRod.updateSlingPosition(Boat.position.x- 55,Boat.position.y-65);
        }
        if(spritInvisivel.isTouching(peixe1Group) || spritInvisivel.collide(peixe2Group)){
            Score = Score + 1;
            SomCaptura.play();
            if(spritInvisivel.isTouching(peixe1Group)){
                for(var i = 0; i < peixe1Group.length; i++){
                    if(peixe1Group[i].isTouching(spritInvisivel)){
                        peixe1Group[i].destroy();
                    }
                }
            }
            if(spritInvisivel.isTouching(peixe2Group)){
                for(var i = 0; i < peixe2Group.length; i++){
                    if(peixe2Group[i].isTouching(spritInvisivel)){
                        peixe2Group[i].destroy();
                    }
                }
            }
        }
    }
    mouseDragged();
    spawnFish1();
    spawnFish2();
    

    drawSprites();
    textSize(30);
    fill("blue");
    text("Peixes:"+ Score, 40 , 50 );

    isca.display();
    FishingRod.display();
    
    Engine.update(engine);
}

function mouseDragged(){

    if(mouseDown("leftButton") && isca.body.position.y < height/2){
        Matter.Body.setPosition(isca.body, {x: mouseX, y: mouseY});
    } 

}


function spawnFish1(){
    if(frameCount % 60 === 0){
        var peixe1 = createSprite(width+10, height/2 + 200, 50, 50);
        peixe1.velocityX = -6;
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: peixe1.addImage(peixe2Img);
                break;
            case 2: peixe1.addImage(peixe3Img);
        }
        peixe1.scale = 0.2;
        peixe1.lifetime = 300;
        peixe1Group.add(peixe1);
    }
}
function spawnFish2(){
    if(frameCount % 60 === 0){
        var peixe2 = createSprite(-10, height/2 + 150, 50, 50);
        peixe2.velocityX = 6;
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: peixe2.addImage(peixe1Img);
                break;
            case 2: peixe2.addImage(peixe4Img);
        }
        peixe2.scale = 0.2;
        peixe2.lifetime = 300;
        peixe1Group.add(peixe2);
    }
}
