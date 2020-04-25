'use strict';


function makeGETRequest(url, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
            makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
                try {
                this.goods = JSON.parse(goods);
                    resolve(this.goods)
                } catch {
                    reject('Error');
                }
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
    }, (error) => { console.log(error) });
