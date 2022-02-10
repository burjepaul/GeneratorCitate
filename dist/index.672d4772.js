"use strict";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const audioBtn = document.getElementById("audioBtn");
const audioElement = document.getElementById("audio");
let apiQuotes = [];
//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show new Quote
function newQuote() {
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is blank and replace it with 'Unknown'
    quote.author ? authorText.textContent = quote.author : authorText.textContent = "Unknown";
    // Check Quote length to determiine styling
    quote.text.length > 120 ? quoteText.classList.add("long-quote") : quoteText.classList.remove("long-quote");
    quoteText.textContent = quote.text;
    complete();
}
// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
    //Catch Error Here
    }
}
//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}
//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
audioBtn.addEventListener("click", tellMe);
audioElement.addEventListener("ended", toggleButton);
//On load
getQuotes();

//# sourceMappingURL=index.672d4772.js.map
