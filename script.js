const BASE_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`;
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`;

function service(url) {
  return fetch(url).then((res) => res.json());
}

function init() {
  const app = new Vue({
    el: "#root",
    data: {
      items: [],
      filteredItems: [],
      search: "",
      cardIsVisiable: false,
      cartItems:[],
    },
    methods: {
      setVisiability() {
        this.cardIsVisiable = !this.cardIsVisiable;
      },
      fetchGoods() {
        service(GET_GOODS_ITEMS).then((data) => {
          this.items = data;
          this.filteredItems = data;
        });
      },
      fetchCart() {
        service(GET_BASKET_GOODS_ITEMS).then((data) => {
          this.cartItems = data.contents;
          this.cartItemsCount = data.countGoods
        });
      },
      filterItems() {
        this.filteredItems = this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.search, "gui"));
        });
      },
    },
    computed: {
      calculatePrice() {
        return this.filteredItems.reduce((prev, { price }) => {
          return prev + price;
        }, 0);
      },
    },
    mounted() {
      this.fetchGoods();
      this.fetchCart();
    },
  });

  const cart = Vue.component("cart", {
    data() {
      return {
       
      };
    },

    template: `
        <div class="fixed-area">
           <div class="cart-card">
              <div class="cart-card__header">
                 <h1 class="cart-card__header__title">cart card</h1>
                 <div class="cart-card__header__delete-icon"
                    v-on:click="$emit('closeclick')"
                 ></div>
              </div>
              <div class="cart-card__content">
              </div>
           </div>
        </div>
      `,
  });

  const customButton = Vue.component("custom-button", {
    template: `
      <button class="search-button" type="button" v-on:click="$emit('click')">
         <slot></slot>
      </button>
    `,
  });

  const goodsItem = Vue.component("goods-item", {
    props: ["item"],
    template: `
      <div class="goods-item">
         <h3>{{ item.product_name }}</h3>
         <p>{{ item.price }}</p>
      </div>
    `,
  });

  const cartItem = Vue.component("cart-item", {
    props: ["item"],
    template: `
      <div class="cart-item">
        <h3>{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
      </div>
  `,
  });

  const search = Vue.component("search", {
    template:`
    <div class="search">
      <input type="text" class="goods-search" />
      <custom-button >искать</custom-button>
    </div>
    `
  });

  const count = Vue.component("count", {
    props:["count"],
    template:`
      <p>Количество {{count}}</p>
    `
  })


}

window.onload = init;
