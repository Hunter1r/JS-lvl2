'use strict';

const stuff = [
    {
        name: 'cheese',
        price: 10,
        cal: 20
    },
    {
        name: 'salat',
        price: 20,
        cal: 5
    },
    {
        name: 'potatoes',
        price: 15,
        cal: 10
    },
    {
        name: 'grass',
        price: 15,
        cal: 0
    },
    {
        name: 'sause',
        price: 20,
        cal: 5
    }
]

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.price = 0;
        this.cal = 0;
    }
    addTopping() {
        this.topping = true;
        this.price = this.price + 15;
    }
    
    calculatePrice() {
        if (this.size == 'small') {
            this.price += 50;
            this.cal += 20;
        } else if (this.size == 'big') {
            this.price += 100;
            this.cal += 40;
        }

        this.stuffing.forEach(element => {
            let itm = stuff.find((item) => item.name == element);
            if (itm != undefined) {
                this.price += itm.price;
                this.cal += itm.cal;
            }
        });
    }
}

let burger = new Hamburger('small', ['cheese', 'salat', 'grass']);
burger.addTopping();
burger.calculatePrice();
console.log(burger);