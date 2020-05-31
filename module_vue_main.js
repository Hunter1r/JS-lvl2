 import module_vue_search from './module_vue_search.js';
 import module_vue_basket from './module_vue_basket.js';

 const srh = module_vue_search.vue
 const bsk = module_vue_basket.vue


const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        basket: [],
        searchline: '',
        isVisibleCart: false,
    },
     component: {
         search: srh,
         basket: bsk
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

            this.makePOSTRequest(`/addToCart`, good, (respText) => {
                console.log('resp text'+respText);
            })
        }
    },
    mounted() {
        //debugger;
        this.makeGETRequest(`/catalogData`).then((goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        })
        this.makeGETRequest(`/cartItems`).then((goods) => {
            this.basket = JSON.parse(goods);
        })
    }
})


// module.exports = {
//     add: app.add
// }

export default {
    app: app
};