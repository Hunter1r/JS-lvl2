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


export default {
    vue: Vue
};