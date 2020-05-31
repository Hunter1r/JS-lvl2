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

export default {
    vue: Vue
};