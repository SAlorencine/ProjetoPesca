class Isca {
    constructor(x, y, width, height){
        var options = {
            'restitution' :0.8,
            'friction' :1.0,
            'density' :0.01
        }

        this.width = width;
        this.height = height;
        this.image = loadImage("Images/isca.png");
        this.body = Bodies.rectangle(x, y, width, height, options);
        World.add(world, this.body);
    }
    
    display(){
        var angle = this.body.angle;

        push();
        imageMode(CENTER);
        rotate(angle);
        translate(this.body.position.x, this.body.position.y);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }
}