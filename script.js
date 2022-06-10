class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `<div
  class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150 },
      { title: "Socks", price: 50 },
      { title: "Jacket", price: 350 },
      { title: "Shoes", price: 250 },
    ];
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
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.summaryPrice();

class Hamburger {
  constructor(size, stuffing, topping) {
    this.size = size;
    this.stuffing = stuffing;
    this.topping = topping;
  }

  calculatePrice() {
    let price = 0;

    this.size === "small" ? (price += 50) : (price += 100);
    this.topping === "cheese" && (price += 10);
    this.topping === "salad" && (price += 20);
    this.topping === "potato" && (price += 15);
    this.stuffing === "pepper" ? (price += 15) : (price += 20);

    return price;
  }

  calculateCalories() {
    let calories = 0;

    this.size === "small" ? (calories += 20) : (calories += 40);
    this.topping === "cheese" && (calories += 20);
    this.topping === "salad" && (calories += 5);
    this.topping === "potato" && (calories += 10);
    this.stuffing === "pepper" ? (calories += 0) : (calories += 5);

    return calories;
  }
}

const hamburger = new Hamburger("small", "pepper", "potato");
console.log(hamburger.calculatePrice());
console.log(hamburger.calculateCalories());
