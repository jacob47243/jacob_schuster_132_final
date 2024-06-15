/**
 * Name: Jacob Schuster
 * Date: June 13th, 2024
 * 
 * This pages is a contact form that allows users to submit the form, which is stored 
 */
"use strict";



/**
     * Adds an event listener when the submit button is pressed
     */
async function init() {
    let form = document.querySelector("#contact-form");
    form.addEventListener("submit", (event) => submitForm(event));
}

/**
     * Submits the form using a POST request to the API
     * @param {Event} event - current event
     * @returns None
*/
async function submitForm(event) {
    event.preventDefault();
    var params = new FormData(document.getElementById("contact-form"));
    try {
        let resp = await fetch("/addMessage", { method: "POST", body: params });
        if (resp.ok) {
            displaySuccess();
        } else {
            handleError(await resp.text());
        }
    } catch (err) {
        handleError(err);
    }
}

/**
     * Displays a success message if the form is submitted succesfully
     */
function displaySuccess() {
    let messageDiv = document.querySelector("#form-message");
    let p = document.createElement("p");
    p.textContent = "Form submitted successfully";
    p.classList.add("success");
    messageDiv.appendChild(p);
    document.getElementById("contact-form").reset();
}

/**
     * Handles errors 
     * @param {Error} errMsg - error message to be handle and passed to the user
*/
function handleError(errMsg) {
    if (typeof errMsg === "string") {
        document.querySelector("#form-message").textContent = errMsg;
    } else {
        document.querySelector("#form-message").textContent =
            "An error occurred when interacting with the server. Please try again later.";
    }
    document.querySelector("#form-message").classList.remove("hidden");
}

init();
