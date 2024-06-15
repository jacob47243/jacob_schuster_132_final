// Name: Jacob Schuster 
// CS 132 Spring 2024
// Date: June 11, 2024
// This is my JavaScript page that handles the Promotions interactions.

/**
 * Initializes the Promotions page by fetching and displaying promotions
 */
async function init() {
    try {
        for (let i = 1; i <= 5; i++) {
            await addPromotion(i);
        }
    } catch (error) {
        handleError(error);
    }
}

/**
 * Fetches and displays a promotion on the page
 * @param {number} number - The promotion number
 */
async function addPromotion(number) {
    try {
        let response = await fetch(`/promotion/${number}`);
        checkStatus(response);
        const promotionInfo = await response.json();
        displayPromotion(promotionInfo.text, number);
    } catch (error) {
        handleError(error);
    }
}

/**
 * Displays a promotion on the page
 * @param {string} information - The promotion text
 * @param {number} number - The promotion number
 */
function displayPromotion(information, number) {
    const promotionElement = document.getElementById(`promotion${number}`);
    promotionElement.textContent = information;
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
