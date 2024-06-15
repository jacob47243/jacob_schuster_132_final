/**
 * Name: Jacob Schuster
 * Date: June 11th, 2024
 * 
 * filter.js This JavaScript allows users to filter plants by indoor and outdoor categories and move them to the current-shop section.
 */


/**
 * Initializes the filter functionality by setting up event listeners to change the filter
 */
function init() {
    const filterSelect = document.getElementById("filter");
    filterSelect.addEventListener("change", filterPlants);
    filterPlants();
}

/**
 * Filters the plants based on the selected category and updates the current-shop section.
 */
async function filterPlants() {
    const filterSelect = document.getElementById("filter");
    const selectedFilter = filterSelect.value;
    const currentShop = document.querySelector('.current-shop');
    currentShop.innerHTML = '';

    let url = '/plant-info';
    if (selectedFilter !== 'all') {
        url = `/plant-filter/${selectedFilter}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (selectedFilter === 'all') {
            for (const plantName in data) {
                const plantCard = createPlantCard(plantName);
                currentShop.appendChild(plantCard);
            }
        } else {
            const plantNames = data.items;
            for (const plantName of plantNames) {
                const plantCard = createPlantCard(plantName);
                currentShop.appendChild(plantCard);
            }
        }
    } catch (error) {
        handleError(error);
    }
}

/**
 * Creates a plant card element with the given plant name.
 * @param {string} name - The name of the plant.
 * @returns {HTMLElement} - The created plant card element.
 */
function createPlantCard(name) {
    const plantCard = document.createElement('div');
    plantCard.classList.add('plant');

    const imgElement = document.createElement('img');
    imgElement.src = `imgs/${name}.webp`;
    imgElement.alt = name;
    plantCard.appendChild(imgElement);

    const linkElement = document.createElement('a');
    linkElement.href = `individuals/${name}.html`;

    const pElement = document.createElement('p');
    pElement.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    linkElement.appendChild(pElement);
    plantCard.appendChild(linkElement);

    return plantCard;
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
            "An error occurred when interacting with the server. Please try again later.";
    }
    document.querySelector("#message-area").classList.remove("hidden");
}

init();