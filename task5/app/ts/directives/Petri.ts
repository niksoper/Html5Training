/// <amd-dependency path="d3" />

export class Petri {

    parent: any;
    r: number;
    cx: number;
    cy: number;
    germs: Array<Germ>;

    constructor(parent, x, y, radius, txValues: Array<number>, private germSize) {

        this.parent = parent;

        this.r = radius != null ? radius : 10;
        this.cx = x != null ? x : this.r + 1;
        this.cy = y != null ? y : this.r + 1;

        parent.append('circle')
            .attr('cy', this.cy)
            .attr('cx', this.cx)
            .attr('r', this.r)
            .style('fill', 'lightblue')
            .style('stroke', 'gray');

        this.germs = [];

        var maxSpend: number = 0;
        txValues.forEach((spend: number): void => {
            if (spend > maxSpend) {
                maxSpend = spend;
            }
        });

        var self = this;
        txValues.forEach((spend: number): void => {

            // set velocity as a proportion of the highest value transaction
            var velocity = spend / maxSpend;

            // scale the velocity up to a maximum
            velocity = velocity * 5;

            // ensure that all transactions have at least some velocity
            velocity++;

            self.addGerm(velocity);
        });

    }

    addGerm = (speed: number): void => {
    
        var g = new Germ(this, this.germSize, speed);
        this.germs.push(g);

        g.circle = this.parent.append('circle')
            .attr('class', 'germ')
            .attr('cy', g.y)
            .attr('cx', g.x)
            .attr('r', g.r)
            .style('fill', 'green');
    
    }

    moveGerms = ():void => {

        this.germs.forEach((germ: Germ): void => {

            germ.move();

        });

    };

}

export class Germ {

    x: number;
    y: number;
    circle: any;

    constructor(
        private parent: Petri, 
        public r: number,
        private v: number) {

        do {

            this.x = this.parent.cx + (Math.random() * this.parent.r * 2) - this.parent.r;
            this.y = this.parent.cy + (Math.random() * this.parent.r * 2) - this.parent.r;

        } while (!this.testLocation(this.x, this.y));

    }

    testLocation = (x: number, y: number): Boolean => {

        var px = Math.abs(this.parent.cx - x);
        var py = Math.abs(this.parent.cy - y);

        var germDistFromDishCentre = Math.sqrt(px * px + py * py);

        return germDistFromDishCentre + this.r <= this.parent.r;

    }

    move = ():void => {

        var oldX = this.x;
        var oldY = this.y;

        var newX, newY;

        do {

            newX = oldX + (((Math.random() * this.r * 2) - this.r) * 0.5) * this.v;
            newY = oldY + (((Math.random() * this.r * 2) - this.r) * 0.5) * this.v;

        } while (!this.testLocation(newX, newY));

        this.x = newX;
        this.y = newY;

        this.circle.attr('cx', this.x);
        this.circle.attr('cy', this.y);

    }

}