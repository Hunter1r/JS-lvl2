'use strict';

let curval = 0;
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

        // if (this.stuffing == 'cheese') {
        //     this.price += 10;
        //     this.cal += 20;
        // } else if (this.stuffing == 'green salad') {
        //     this.price += 20;
        //     this.cal += 5;
        // } else if (this.stuffing == 'potatoes') {
        //     this.price += 15;
        //     this.cal += 10
        // }
    }
}

//let burger = new Hamburger('small', 'cheese');
let burger = new Hamburger('small', ['cheese', 'salat', 'grass']);

// burger.addTopping();
burger.calculatePrice();
console.log(burger);

