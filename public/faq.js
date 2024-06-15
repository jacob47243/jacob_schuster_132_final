// Name: Jacob Schuster 
// CS 132 Spring 2024
// Date: June 11, 2024
// This is my JavaScript page that handles the FAQ interactions.

/**
 * Initializes the FAQ page by fetching and displaying questions
 */
async function init() {
    try {
        for (let i = 1; i <= 5; i++) {
            await addQuestion(i);
            document.getElementById(`button${i}`).addEventListener("click", () => addAnswer(i));
        }
    } catch (error) {
        handleError(error);
    }
}

/**
 * Fetches and displays a question on the page
 * @param {number} number - The question number
 */
async function addQuestion(number) {
    try {
        let response = await fetch(`/question/${number}`);
        checkStatus(response);
        const questionInfo = await response.json();
        displayQuestion(questionInfo.text, number);
    } catch (error) {
        handleError(error);
    }
}

/**
 * Fetches and displays the answer for a given question
 * @param {number} number - The question number
 */
async function addAnswer(number) {
    try {
        let response = await fetch(`/answer/${number}`);
        checkStatus(response);
        const answerInfo = await response.json();
        displayAnswer(answerInfo.text, number);
    } catch (error) {
        handleError(error);
    }
}

/**
 * Displays a question on the page
 * @param {string} information - The question text
 * @param {number} number - The question number
 */
function displayQuestion(information, number) {
    const questionElement = document.getElementById(`question${number}`);
    questionElement.textContent = information;
}

/**
 * Displays the answer on the page
 * @param {string} information - The answer text
 * @param {number} number - The question number
 */
function displayAnswer(information, number) {
    const answerElement = document.getElementById(`answer${number}`);
    answerElement.textContent = information;
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

