'use strict';

class Hamburger {
    constructor(size,stuffing){
        this.size = size;
        this.stuffing = stuffing;
        this.price = 0;
        this.cal = 0;
    }
    addTopping(){
        this.topping = true;
        this.price = this.price + 15;
    }
    addSause(){
        this.sause = true;
        this.price += 20; 
        this.cal += 5; 
    }
    calculatePrice(){
        if(this.size=='small'){
            this.price += 50;
            this.cal += 20;
        } else if (this.size=='big') {
            this.price += 100;
            this.cal += 40;
        }

        if(this.stuffing=='cheese'){
            this.price += 10; 
            this.cal += 20;
        } else if(this.stuffing=='green salad'){
            this.price += 20; 
            this.cal += 5;
        } else if(this.stuffing=='potatoes'){
            this.price += 15;
            this.cal += 10
        }
    }
}

let burger = new Hamburger('small','cheese');
burger.addTopping();
burger.addSause();
burger.calculatePrice();
console.log(burger);