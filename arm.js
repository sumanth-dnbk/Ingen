class Arm{

    constructor()
    {
        this.x =0;
        this.y =0;
        this.length = 100;
        this.angle = 0;
        this.centerAngle = 0;
        this.rotationRange = Math.PI/4;
        this.parent = null;
    }

    static create(length, centerAngle, rotationRange)
    {
        let obj = new Arm();
        obj.init( length , centerAngle, rotationRange);
        return obj;
    }

    init(length , centerAngle, rotationRange)
    {
        
        this.length = length;
        this.centerAngle = centerAngle;
        this.rotationRange = rotationRange;
    }

    setPhase(phase)
    {
        //if angle is 100 and rotation range is 90 it will be rotating from 10(100 - 90) to 190 (100+90)
        //phase is nothing but someRandomAngle+=speed;
        this.angle = this.centerAngle + this.rotationRange * Math.sin(phase);
    }
    
    getEndX()
    {
        let angle= this.angle;
        let parent = this.parent;
        //adding all the parents angles
        while(parent)
        {
            angle+=parent.angle
            parent  = parent.parent;
        }
        return this.x + this.length * Math.cos(angle);
    }

    getEndY()
    {
        let angle =  this.angle;
        let parent = this.parent;
        //adding all the parents angles
        while(parent)
        {
            angle+=parent.angle
            parent  = parent.parent;
        }
        return this.y + this.length * Math.sin(angle);
    }

    render(context)
    {
        context.strokeStyle = '#000000';
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.getEndX(), this.getEndY());
        context.stroke();
    }


}