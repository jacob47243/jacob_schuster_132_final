// Name: Jacob Schuster 
// CS 132 Spring 2024
// Date: June 11, 2024
// This is my JavaScript page that adds info about a single item to its page

/**
 * Initializes the individual items page by fetching and displaying info about each plant
 */
async function init() {
    try {
        const plantName = getPlantNameFromURL();
        await addPlant(plantName);
    } catch (error) {
        handleError(error);
    }
}

/**
 * Extracts the plant name from the URL
 * @returns {string} - The plant name
 */
function getPlantNameFromURL() {
    const path = window.location.pathname;
    const parts = path.split("/");
    const pageName = parts[parts.length - 1];
    return pageName.split(".")[0];
}

/**
 * Fetches and displays plant information on the page
 * @param {string} name - The plant name
 */
async function addPlant(name) {
    try {
        let response = await fetch(`/plant-info/${name}`);
        checkStatus(response);
        const plantInfo = await response.json();
        const imgSrc = `../imgs/${name}.webp`;
        displayPlantInfo(name, plantInfo, imgSrc);
    } catch (error) {
        handleError(error);
    }
}

/**
 * Displays the plant information on the page
 * @param {string} name - The plant name
 * @param {Array} plantInfo - The plant information [description, price, location]
 * @param {string} imgSrc - The source path of the plant image
 */
function displayPlantInfo(name, plantInfo, imgSrc) {
    const [description, price] = plantInfo;
    const plantDetailElement = document.querySelector(".plant-detail");

    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.alt = name;
    imgElement.classList.add('image');

    const h2Element = document.createElement('h2');
    h2Element.textContent = name.charAt(0).toUpperCase() + name.slice(1);

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${price}`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener('click', () => addToCart(name));

    plantDetailElement.appendChild(imgElement);
    plantDetailElement.appendChild(h2Element);
    plantDetailElement.appendChild(priceElement);
    plantDetailElement.appendChild(descriptionElement);
    plantDetailElement.appendChild(addToCartButton);
}

/**
 * Adds the plant to the cart
 * @param {string} name - The plant name
 */
function addToCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(name);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart.`);
}


/**
 * Checks the status of the response
 * @param {Response} response - The response to check
 * @throws Will throw an error if the response status is not OK
 */
function checkStatus(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
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
