/*
Name: Isaac Euceda
Date: February 20th, 2026
CSC 372-01
This page allows users to add items to the favorites list and it calculates the total price at the bottom of the html page.
Users can also unselect items and it updates the total price.
*/
document.addEventListener("DOMContentLoaded", function () {
    Favorites();
});

let total = 0;

function Favorites() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const name = card.dataset.name;
        const price = card.dataset.price;

        
        const priceTag = document.createElement("p");
        priceTag.textContent = "$" + price;
        priceTag.classList.add("price-tag");

        
        const button = document.createElement("button");
        button.textContent = "Add to Favorites";
        button.classList.add("favorite");

        
        button.addEventListener("click", function () {
            clickFavorite(card, button);
        });

        card.appendChild(priceTag);
        card.appendChild(button);
    });
}

function clickFavorite(card, button) {
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    if (!card.classList.contains("selected")) {
        addFavorite(card, button, name, price);
    } else {
        removeFavorite(card, button, name, price);
    }
}

function addFavorite(card, button, name, price) {
    card.classList.add("selected");
    button.textContent = "Remove from Favorites";

    const list = document.getElementById("favorites-list");

    const listItem = document.createElement("li");
    listItem.textContent = name + " - $" + price.toFixed(2);
    listItem.setAttribute("data-name", name);

    list.appendChild(listItem);

    total += price;
    Total();
}

function removeFavorite(card, button, name, price) {
    card.classList.remove("selected");
    button.textContent = "Add to Favorites";

    const list = document.getElementById("favorites-list");
    const items = list.querySelectorAll("li");

    items.forEach(item => {
        if (item.getAttribute("data-name") === name) {
            list.removeChild(item);
        }
    });

    total -= price;
    Total();
}

function Total() {
    const totalElement = document.getElementById("total-price");
    totalElement.textContent = total.toFixed(2);
}