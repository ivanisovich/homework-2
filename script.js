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
  };
  xhr.open("GET", url, true);
  xhr.send();
}

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `<div
  class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    });
  }

  summaryPrice() {
    let result = 0;

    this.goods.forEach((item) => {
      result += item.price;
    });

    console.log(result);
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
}

const list = new GoodsList();

list.fetchGoods(() => {
  list.render();
});

list.summaryPrice();

class Cart {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    makeGETRequest(`${API_URL}/getBasket.json`, (goods) => {
      this.goods = JSON.parse(goods).contents;
    });
  }
}

const cart = new Cart();

cart.fetchGoods();

console.log(cart);
