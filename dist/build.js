/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./module_vue_basket.js":
/*!******************************!*\
  !*** ./module_vue_basket.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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


/* harmony default export */ __webpack_exports__["default"] = ({
    vue: Vue
});

/***/ }),

/***/ "./module_vue_main.js":
/*!****************************!*\
  !*** ./module_vue_main.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_vue_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module_vue_search.js */ "./module_vue_search.js");
/* harmony import */ var _module_vue_basket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module_vue_basket.js */ "./module_vue_basket.js");
 
 

 const srh = _module_vue_search_js__WEBPACK_IMPORTED_MODULE_0__["default"].vue
 const bsk = _module_vue_basket_js__WEBPACK_IMPORTED_MODULE_1__["default"].vue


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

/* harmony default export */ __webpack_exports__["default"] = ({
    app: app
});

/***/ }),

/***/ "./module_vue_search.js":
/*!******************************!*\
  !*** ./module_vue_search.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
Vue.component('search', {
    template:
        `<div class="search-line"> 
        <input type="text" class="goods-search" v-model="srch" v-on:keyup="clickHandler(srch)">
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

/* harmony default export */ __webpack_exports__["default"] = ({
    vue: Vue
});

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_vue_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module_vue_main.js */ "./module_vue_main.js");
/* harmony import */ var _module_vue_search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module_vue_search.js */ "./module_vue_search.js");
/* harmony import */ var _module_vue_basket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module_vue_basket.js */ "./module_vue_basket.js");




const app = _module_vue_main_js__WEBPACK_IMPORTED_MODULE_0__["default"].app
const Vue = _module_vue_search_js__WEBPACK_IMPORTED_MODULE_1__["default"].vue
const Vue2 = _module_vue_basket_js__WEBPACK_IMPORTED_MODULE_2__["default"].vue




/***/ })

/******/ });
//# sourceMappingURL=build.js.map