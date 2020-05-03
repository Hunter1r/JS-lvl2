'use strict';

let searchbtn = document.querySelector('.search-button');
//let searchstr = document.querySelector('.goods-search')

// searchbtn.addEventListener('click', (el) => {
//     list.filterGoods(searchstr.value);
// });

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
    add() {
        //добавление товара в корзину
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/addToBasket.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                resolve();
            })
        })
    }
    get() {
        //получение содержимого корзины
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/getBasket.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                resolve();
            })
        })
    }
    remove() {
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
        this.goods = [];
        this.filteredGoods = [];
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
                this.filteredGoods = JSON.parse(goods);
                resolve();
            })
        })
    }
    render() {
        let listHtml = '';
        // this.goods.forEach(good => {
        //console.log(this.filteredGoods);
        this.filteredGoods.forEach(good => {
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
    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => {
            return regexp.test(good.product_name);
        })
        this.render();
    }
}

// const list = new GoodsList();
// list.fetchGoods()
//     .then(() => {
//         list.render();
//         list.saySumm();
//     });

// const basket = new Basket();
// basket.add();
//basket.get().then(()=>{console.log(`после добавления в корзину ${basket}`)})
//basket.remove()


const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCard: true
    },
    methods: {
        makeGETRequest(url) {
            const promise = new Promise((resolve, reject) => {
                var xhr;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        resolve(xhr.responseText)
                    }
                }
                xhr.open('GET', url, true);
                xhr.send();
            })
            return promise;
        },
        filterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => {
                return regexp.test(good.product_name);
            })
        },
        clickHandler() {
            this.filterGoods(this.searchLine);
        },
        clickBasket() {
        }
    },
    mounted() {

        // return new Promise((resolve, reject) => {
        this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
            //     // resolve();
        })
        // })

        // const list = new GoodsList();
        // list.fetchGoods()
        //     .then(() => {
        //         list.render();
        //         list.saySumm();
        //     });
    }
})