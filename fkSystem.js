class FKSystem
{
    arms = [new Arm()];
    lastArm = new Arm();
    constructor()
    {
        this.arms = [];
        this.lastArm = null;
        this.x =0;
        this.y = 0;
        this.phase = 0;
        this.speed = 0.05;
    }

    static create(x, y){
        let obj = new FKSystem();
        obj.init(x, y);
        return obj;
    }

    init(x, y)
    {
        this.x = x;
        this.y = y;
        this.arms = [];
    }

    addArm(length, centerAngle, rotationRange)
    {
        let arm = Arm.create(length, centerAngle, rotationRange);
        this.arms .push(arm);
        if(this.lastArm)
        {
            arm.parent = this.lastArm;
        }
        this.lastArm = arm;
        this.update();
    }

    update()
    {
        for (let i = 0; i < this.arms.length; i++) {
            let arm = this.arms[i];
            arm.setPhase(this.phase);
            if(arm.parent){
                arm.x = arm.parent.getEndX();
                arm.y = arm.parent.getEndY();
            }
            else
            {
                arm.x = this.x ;
                arm.y = this.y;
            }
            
        }
        this.phase += this.speed;
    }

    render(context)
    {
        for (let i = 0; i < this.arms.length; i++) {
             this.arms[i].render(context);
        }
    }

    rotateArm(index, angle){
        this.arms[index].angle = angle;
    }
}