class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
class shoppingcartitem {
  constructor(Product, quantity) {
    this.Product = Product;
    this.quantity = quantity;
  }
  totalprice() {
    return this.Product.price * this.quantity;
  }
}
class shoppingcart {
  constructor() {
    this.items = [];
  }
  addItems(product) {
    let existingItem = this.items.find(
      (item) => item.Product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push(new shoppingcartitem(product, 1));
    }
    this.updateTotalPrice();
    this.updateUI();
  }
  removeItems(product) {
    this.items = this.items.filter((item) => item.Product.id != product.id);
    this.removeUi();
    this.updateTotalPrice();
  }
  updateQuantity(product, increment = true) {
    let existingItem = this.items.find(
      (item) => item.Product.id === product.id
    );
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity = increment
        ? existingItem.quantity + 1
        : existingItem.quantity - 1;
    }
    this.updateTotalPrice();
    this.updateUI();
  }

  getTotalPrice() {
    let s = 0;
    for (let i = 0; i < this.items.length; i++) {
      s += this.items[i].totalprice();
    }
    return s;
  }

  updateTotalPrice() {
    document.querySelector(".total").textContent = this.getTotalPrice() + " $";
  }
  updateUI() {
    document.querySelectorAll(".fa-plus-circle").forEach((btn, index) => {
      const product = products[index];
      let cartItem = this.items.find((item) => item.Product.id === product.id);
      btn.nextElementSibling.textContent = cartItem ? cartItem.quantity : 0;
    });
  }
  removeUi() {
    document.querySelectorAll(".fa-trash-alt").forEach((btn) => {
      btn.addEventListener("click", function () {
        const itemElement = btn.closest(".card"); // Trouve l'élément parent correspondant
        if (itemElement) {
          itemElement.remove(); // Supprime uniquement cet élément
        }
      });
    });
  }
}
const cart = new shoppingcart();
const products = [
  new Product(1, "Baskets", 100),
  new Product(2, "Socks", 20),
  new Product(3, "Bag", 50),
];
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".fa-plus-circle").forEach((btn, index) => {
    btn.addEventListener("click", () => cart.addItems(products[index]));
  });

  document.querySelectorAll(".fa-minus-circle").forEach((btn, index) => {
    btn.addEventListener("click", () =>
      cart.updateQuantity(products[index], false)
    );
  });

  document.querySelectorAll(".fa-trash-alt").forEach((btn, index) => {
    btn.addEventListener("click", () => cart.removeItems(products[index].id));
  });
});
