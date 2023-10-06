class Rod {
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness:0.1,
            length:100
        }
        this.pointB = pointB
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }

    fish(){
        this.sling.pointB = null;
    }

    back(point){
        this.sling.pointB = point;
    }
 
    updateSlingPosition(x, y) {
        this.sling.pointB.x = x;
        this.sling.pointB.y = y;
    }

    display(){
        if(this.sling.bodyA){
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;

            push();
            stroke(48, 22, 8);
            if(pointA.y > 220){
                strokeWeight(3);
                line(pointA.x, pointA.y, pointB.x + 30, pointB.y -3);
            } else{
                strokeWeight(1);
                 line(pointA.x, pointA.y, pointB.x + 30, pointB.y -3);
            }

            pop();
        }
    }
}