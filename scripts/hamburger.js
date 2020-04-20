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
        let price;
        let cal;
        if(this.size=='small'){
            price = 50; cal = 20
        } else if(this.size=='big'){
            price = 100; cal = 40
        }
        
        if(this.stuffing=='cheese'){
            price += 10; cal += 20
        } else if(this.stuffing=='green salad'){
            price += 20; cal += 5
        } else if(this.stuffing=='potatoes'){
            price += 15; cal += 10
        }

        this.price += price;
        this.cal += cal;
    }
}

let burger = new Hamburger('small','cheese');
burger.addTopping();
burger.addSause();

burger.calculatePrice();
console.log(burger);
