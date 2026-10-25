const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const twitterBtn = document.getElementById("twitter");

let quotes = [];

//show new quote
function showNewQuote() {
  if (!quotes.length) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteText = document.getElementById("quote");
  const quoteAuthor = document.getElementById("author");

  if (!quoteText || !quoteAuthor) {
    console.error("Quote elements are missing from the page.");
    return;
  }

  quoteText.innerText = quote.text ? quote.text : "No quote available.";
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  }
  quoteAuthor.innerText = quote.author || "Unknown";
}

async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    quotes = await response.json();
    setTimeout(() => {
      hideLoadingSpinner();
      showNewQuote();
    }, 100);
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
  window.open(twitterUrl, "_blank");
}

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function handleNewQuote() {
  showLoadingSpinner();
  showNewQuote();
  hideLoadingSpinner();
}

newQuoteBtn.addEventListener("click", handleNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on Load
window.addEventListener("load", () => {
  showLoadingSpinner();
  getQuotes();
});
