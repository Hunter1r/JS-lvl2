'use strict';

//корзина товаров
class Basket {
    constructor() {
    }
    addToBasket() {
        //добавление товара в корзину
    }
    removeFromBasket() {
        //удаление товара из корзины
    }
    getSumCostBasket() {
        //подсчет количества и стоимости товаров в корзине
    }
}

//Элемент в корзине
class ItemToBasket {
    constructor(name, price) {
        this.name = name; //наименование товара для корзины
        this.price = price; //цена товара для корзины
    }
}

//Товар
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price
    }
    render() {
        return `<div class="goods-item"><h3>​ ${this.title}​</h3><p> ${this.price}​</p></div>`;
    }
}

//список товаров
class GoodsList {
    constructor() {
        this.goods = []
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ]
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    // определение стоимости товаров
    saySumm() {
        let summ = 0;
        this.goods.forEach(good => { summ += good.price })
        console.log('стоимость всех товаров = ' + summ);
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.saySumm();