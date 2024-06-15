/**
 * Name: Jacob Schuster
 * Date: June 13, 2024
 * 
 * This is cart.js, the javascript that controls the cart, allowing checkout, adding to the cart,
 * and removing from the cart. 
 * 
 * I decided to display each plant separately in the cart, even if there are duplicates. The reason for this was 

 */

"use strict";

let infoAdded = false;

/**
 * @param None
 * @returns None
 * Populates the page with all items in the cart and adds an event listener when the
 * user checks out.
 */
async function init() {
    populateCart();

    let checkoutBtn = document.querySelector("#checkout");
    checkoutBtn.addEventListener("click", checkout);
}

/**
 * @param None
 * @returns None
 * Sends a POST request to the API to save all items in the cart to a file and clear the current cart.
 */
async function checkout() {
    let plantNames = JSON.parse(window.localStorage.getItem('cart')) || [];
    try {
        let resp = await fetch("/checkout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ plantNames: plantNames })
        });
        if (!resp.ok) {
            handleError(await resp.text());
            return;
        }
        displaySuccess();
        window.localStorage.clear();
        document.querySelector("#cart-list").innerHTML = "";
    } catch (err) {
        handleError("An unexpected error occurred while processing your request. Please try again later.");
    }
}

/**
 * @param None
 * @returns None
 * Displays a success message when the user checks out
 */
function displaySuccess() {
    if (!infoAdded) {
        infoAdded = true;
        let upper_div = document.querySelector("#selection");
        let p = document.createElement("p");
        p.classList.add("success");
        p.textContent = "Order sent in!";
        upper_div.appendChild(p);
    }
}

/**
 * @param None
 * @returns None
 * Populates the page with all items in the cart
 */
function populateCart() {
    let plantNames = JSON.parse(window.localStorage.getItem('cart')) || [];
    for(const idx in plantNames) {
        addCard(plantNames[idx], idx);
    }
}

/**
 * @param {String} plantName - Name of the plant
 * @param {int} idx - index of the plant in localStorage
 * Creates a plant card and adds the card to the DOM tree
 */
function addCard(plantName, idx) {
    let plantCard = document.createElement("div");
    plantCard.classList.add("plant-card");
    plantCard.id = `cart${idx}`;

    let img = document.createElement("img");
    img.src = `../imgs/${plantName}.webp`;

    let h3 = document.createElement("h3");
    h3.textContent = plantName.charAt(0).toUpperCase() + plantName.slice(1);

    let button = document.createElement("button");
    button.textContent = "Remove from cart";

    button.addEventListener("click", () => removeCard(idx));

    plantCard.appendChild(img);
    plantCard.appendChild(h3);
    plantCard.appendChild(button);

    document.querySelector("#cart-list").appendChild(plantCard);
}

/**
 * @param {int} idx - Index of item in the cart
 * Removes an item from the cart
 */
function removeCard(idx) {
    const cartList = document.getElementById("cart-list");
    const item = document.getElementById(`cart${idx}`);
    cartList.removeChild(item);
    let plantNames = JSON.parse(window.localStorage.getItem('cart'));
    plantNames.splice(idx, 1); 
    window.localStorage.setItem('cart', JSON.stringify(plantNames));
}

/**
     * Handles errors 
     * @param {Error} errMsg - error message to be handle and passed to the user
     */
function handleError(errMsg) {
    if (typeof errMsg === "string") {
        document.querySelector("#message-area").textContent = errMsg;
    } else {
        document.querySelector("#message-area").textContent =
            "An error ocurred when interacting with the server. Please try again later.";
    }
    document.querySelector("#message-area").classList.remove("hidden");
}

init();
