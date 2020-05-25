'use strict';

let searchbtn = document.querySelector('.search-button');

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

Vue.component('search', {
    template:
        `<div class="search-line"> 
        <input type="text" class="goods-search" v-model="srch">
    <button class="search-button" type="button" v-on:click="clickHandler(srch)">Искать</button>
    </div>`,
    methods: {
        clickHandler(srch) {
            this.filterGoods(srch);
        },
        filterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.$parent.filteredGoods = this.$parent.goods.filter(good => {
                return regexp.test(good.product_name);
            })
        }
    },
    data() {
        return {
            srch: ""
        }
    }
})

Vue.component('basket', {
    props: ['basket'],
    template:
        `<div class="basket-items">
    <div class="basket-item" v-for="(item, index) in basket">
    <button v-on:click="remove(item)">Убрать</button>
        <span>{{++index}}</span>
        <h4>{{item.product_name}}</h4>
        <span>{{item.count}}</span>
        <span>{{item.totalPrice}}</span>
    </div>
        <div class="basket-total">
            <h4>Итого:</h4>
            <span>{{getSumBasket()}}</span>
        </div>
    </div>`
    ,
    data(basket) {
        return {
            basketSum: basket.basket
        }
    },
    methods: {
        getSumBasket() {
            return this.basketSum.reduce((accum, curval) => {
                return accum = accum + curval.totalPrice || curval.totalPrice;
            }, 0)
        },
        remove(item) {
            let el = this.basket.find((elem) => elem.id_product == item.id_product);
            if (el != undefined && el.count > 1) {
                el.count--;
                el.totalPrice -= el.price;
            } else if (el.count == 1) {
                let indx = this.basket.indexOf(el);
                if (indx > -1) {
                    this.basket.splice(indx, 1);
                }
            }

            this.$parent.makePOSTRequest(`/removeFromCart`, item, (respText) => {
                console.log(respText);
            })
        }
    },
    computed: {
        counting() { return this.count = this.count + 1 }
    }
})

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        basket: [],
        searchline: '',
        isVisibleCart: false,
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
        makePOSTRequest(url, data, callback) {
            let xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    
                    callback(xhr.responseText);
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.send(JSON.stringify(data));
        },
        add(good) {
            //добавление товара в корзину
            let el = this.basket.find((elem) => elem.id_product == good.id_product);
            if (el != undefined) {
                el.count++;
                el.totalPrice += el.price;
            } else {
                good.count = 1;
                good.totalPrice = good.price;
                this.basket.push({ ...good });
            }

            // return new Promise((resolve, reject) => {
            //    makeGETRequest(`${API_URL}/addToBasket.json`).then((goods) => {
            //       this.goods = JSON.parse(goods);
            //       console.log(goods)
            //      resolve();
            //  })
            // })

            this.makePOSTRequest(`/addToCart`, good, (respText) => {
                console.log(respText);
            })
        }

    },
    mounted() {
        // this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
        this.makeGETRequest(`/catalogData`).then((goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        })
        this.makeGETRequest(`/cartItems`).then((goods) => {
            this.basket = JSON.parse(goods);
        })

    }
})