'use strict';


function makeGETRequest(url) {

    const promise = new Promise((resolve, reject) => {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                //callback(xhr.responseText);
                resolve(xhr.responseText)
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    })

    return promise;

}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//корзина товаров
class Basket {
    constructor() {
        this.goods = []
    }
    addToBasket() {
        //добавление товара в корзину
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/addToBasket.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                resolve();
            })
        })
    }
    getBasket() {
        //получение содержимого корзины
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/getBasket.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                resolve();
            })
        })
    }
    removeFromBasket() {
        //удаление товара из корзины
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/deleteFromBasket.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                resolve();
            })
        })

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
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price
    }
    render() {
        return `<div class="goods-item"><h3>​ ${this.product_name}​</h3><p> ${this.price}​</p></div>`;
    }
}




//список товаров
class GoodsList {
    constructor() {
        this.goods = []
    }

    fetchGoods() {
        // this.goods = [
        //     { title: 'Shirt', price: 150 },
        //     { title: 'Socks', price: 50 },
        //     { title: 'Jacket', price: 350 },
        //     { title: 'Shoes', price: 250 },
        // ]
        // makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {

        //     this.goods = JSON.parse(goods);
        //     cb();
        // })

        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                resolve();
            })
        })
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
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
//list.fetchGoods(()=>{list.render();});
list.fetchGoods()
    .then(() => {
        list.render();
        list.saySumm();
    });

const basket = new Basket();
basket.addToBasket();
basket.getBasket().then(()=>{console.log(`после добавления в корзину ${basket}`)})
basket.removeFromBasket()
//basket.getBasket().then(()=>{console.log(`после удаления из корзины ${basket}`)})
  

