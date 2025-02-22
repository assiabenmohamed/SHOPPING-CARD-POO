// Classe représentant un produit avec un identifiant, un nom et un prix
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
// Classe représentant un article dans le panier (produit + quantité)
class shoppingcartitem {
  constructor(Product, quantity) {
    this.Product = Product;
    this.quantity = quantity;
  }
  // Calcul du prix total d'un article en fonction de la quantité
  totalprice() {
    return this.Product.price * this.quantity;
  }
}
// Classe représentant le panier d'achat
class shoppingcart {
  constructor() {
    this.items = []; // Tableau contenant les articles du panier
  }
  // Ajoute un produit au panier ou incrémente sa quantité s'il est déjà présent
  addItems(product) {
    let existingItem = this.items.find(
      (item) => item.Product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity++; // Incrémente la quantité si le produit est déjà dans le panier
    } else {
      this.items.push(new shoppingcartitem(product, 1)); // Ajoute un nouvel article si le produit n'est pas encore présent
    }
    this.updateTotalPrice(); // Met à jour le prix total affiché
    this.updateUI(); // Met à jour l'affichage des quantités
  }
  // Supprime un produit du panier en filtrant les éléments qui ne correspondent pas à l'ID du produit
  removeItems(product) {
    console.log(product.id);
    let temp = this.items.filter((item) => item.Product.id !== product.id);
    this.items = temp;
    console.log(this.items);
    this.removeUi(); // Supprime l'affichage du produit dans l'interface
    this.updateTotalPrice(); // Met à jour le prix total affiché
  }
  // Modifie la quantité d'un produit dans le panier (incrémentation ou décrémentation)
  updateQuantity(product, increment = true) {
    let existingItem = this.items.find(
      (item) => item.Product.id === product.id
    );
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity = increment
        ? existingItem.quantity + 1 // Augmente la quantité si "increment" est vrai
        : existingItem.quantity - 1; // Diminue la quantité sinon
    }
    this.updateTotalPrice(); // Met à jour le prix total affiché
    this.updateUI(); // Met à jour l'affichage des quantités
  }
  // Calcule et retourne le prix total du panier
  getTotalPrice() {
    let s = 0;
    for (let i = 0; i < this.items.length; i++) {
      s += this.items[i].totalprice(); // Additionne les prix de chaque article du panier
    }
    return s;
  }
  // Met à jour l'affichage du prix total dans la page HTML
  updateTotalPrice() {
    document.querySelector(".total").textContent = this.getTotalPrice() + " $";
  }
  // Met à jour l'affichage des quantités des produits dans l'interface utilisateur
  updateUI() {
    document.querySelectorAll(".fa-plus-circle").forEach((btn, index) => {
      const product = products[index];
      let cartItem = this.items.find((item) => item.Product.id === product.id);
      btn.nextElementSibling.textContent = cartItem ? cartItem.quantity : 0; // Met à jour la quantité affichée
    });
  }
  // Supprime visuellement un élément du panier dans l'interface utilisateur
  removeUi() {
    document.querySelectorAll(".fa-trash-alt").forEach((btn) => {
      btn.addEventListener("click", function () {
        const itemElement = btn.closest(".card"); // Trouve l'élément HTML parent correspondant
        if (itemElement) {
          itemElement.remove(); // Supprime uniquement cet élément de l'affichage
        }
      });
    });
  }
}

// Création d'une instance du panier
const cart = new shoppingcart();

// Définition des produits disponibles
const products = [
  new Product(1, "Baskets", 100),
  new Product(2, "Socks", 20),
  new Product(3, "Bag", 50),
];
// Ajout des écouteurs d'événements après le chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
  // Gère l'ajout d'un produit au panier lors du clic sur l'icône "+"
  document.querySelectorAll(".fa-plus-circle").forEach((btn, index) => {
    btn.addEventListener("click", () => cart.addItems(products[index]));
  });
  // Gère la diminution de la quantité d'un produit au clic sur l'icône "-"
  document.querySelectorAll(".fa-minus-circle").forEach((btn, index) => {
    btn.addEventListener("click", () =>
      cart.updateQuantity(products[index], false)
    );
  });
  // Gère la suppression d'un produit au clic sur l'icône "🗑️"
  document.querySelectorAll(".fa-trash-alt").forEach((btn, index) => {
    btn.addEventListener("click", () => cart.removeItems(products[index]));
  });
});
