// script.js

const api_key = "e1f64bbb7c0546dbb1219a1861f985cb";
const url = "https://newsapi.org/v2/everything?q=";

// Event listener for the search button
document.querySelector(".search-button").addEventListener("click", () => {
    const searchTerm = document.querySelector(".news-input").value;
    fetchNews(searchTerm); // Fetch news based on the search term
});

// Event listener for loading the page initially with news related to "AI ML"
window.addEventListener("load", () => fetchNews("AI ML"));

//! fetchNews() Function
async function fetchNews(query) {
    // try {
        // fetching data
        const res = await fetch(`${url}${query}&apiKey=${api_key}`);

        // Check if the response is successful
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        // storing data in JSON format
        const data = await res.json();

        console.log(data.articles);

        // Binding Data
        bindData(data.articles);
    // } catch (error) {
    //     console.error("Error fetching news:", error.message);
    // }
}

//! bindData() Function
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCards(cardClone, article); // calling the fillDataCards() function

        // append the child to the parent node
        cardsContainer.appendChild(cardClone);
    });
}


//! fillDataInCards() Function 
function fillDataInCards(cardClone, article) {
    const image = cardClone.querySelector("#news-img"); // Use #news-img to select the image element
    const title = cardClone.querySelector("#news-title"); // Use #new-title to select the title element
    const newsSource = cardClone.querySelector("#news-source"); // Use #new-source to select the source element
    const description = cardClone.querySelector("#news-desc"); // Use #news-desc to select the description element

    image.src = article.urlToImage;
    title.innerHTML = article.title;
    description.innerHTML = article.description;

    // Creating Date
    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;

    // Click on Cards
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}


//! onNavItemClick() Function
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}


const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text')


searchButton.addEventListener('click', () => {
    const query = searchText.value;

    if (!query) return;
    fetchNews(query);

    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})