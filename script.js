const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "",
  },
  methods: {
    makeGETRequest(url, callback) {
      return new Promise((resolve, reject) => {
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
        };
        xhr.open("GET", url, true);
        xhr.send();

        resolve("resolved");
      });
    },
  },
  mounted() {
    const API_URL =
      "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

    this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
    });
  },
});

const cart = new Vue({
  el: "#cart",
  data: {
    isVisibleCart : "true"
  },
})

