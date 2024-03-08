
const access_key = "m8_W79sgdPvg1fwD4YDHhsqxLit7Kik3bVoIrcZpCzc";

const formEle = document.querySelector("form");
const inputEle = document.getElementById("search-input");
const search_results = document.querySelector(".search-results");
const showmore = document.getElementById("show-more");

let inputData = "";
let pageno = 1;

async function searchImages() {
  inputData = inputEle.value;
  const url = `https://api.unsplash.com/search/photos?page=${pageno}&query=${inputData}&client_id=${access_key}`;
    const response  = await fetch(url);
    const data = await response.json();
    const results = data.results
    if(pageno === 1){
        search_results.innerHTML = ""
    }
    results.map((result)=>{
        const image_wrapper = document.createElement('div');
        image_wrapper.classList.add("search-result")
        const image = document.createElement('img');
        image.setAttribute("src",result.urls.small)
        image.alt = result.alt_description
        const image_link = document.createElement('a');
        image_link.href = result.links.html
        image_link.target = "_blank"
        image_link.textContent = result.alt_description
        image_wrapper.appendChild(image)
        image_wrapper.appendChild(image_link)
        search_results.appendChild(image_wrapper)
    })
    pageno++;
    if(pageno > 1){
        showmore.style.display = "block"
    }
}

formEle.addEventListener("submit", (event)=>{
    event.preventDefault();
    pageno = 1;
    searchImages();
})

showmore.addEventListener("click",()=>{
    searchImages();
})