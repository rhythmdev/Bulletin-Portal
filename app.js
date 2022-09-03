const loadCatagories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();

  displayCatagories(data.data.news_category);
  //console.log(data.data.news_category[0])
};
const displayCatagories = (categories) => {
  // console.log(categories)
  try {
    const allCategory = document.getElementById("all-catagories");
    categories.forEach((category) => {
      const li = document.createElement("li");

      li.innerHTML = `
                
                <a onclick="loadCategoriesData('${category.category_id}')" class="nav-link text-dark" href="#">${category.category_name}</a>
               
               `;
      allCategory.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
};


const loadCategoriesData = async(category_id) => {
  try{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    displayCatagoriesData(data.data)
  }
  catch (error) {
    console.log(error)
  }
    

}

const displayCatagoriesData = elements =>{
     //console.log(elements)
// total news found

const totalFound = document.getElementById('total-category');
totalFound.textContent = '';
 const totalDiv = document.createElement('div')
 totalDiv.innerHTML = `
<h5>${elements.length} items found for category ('${elements.category_name}')</h5>
`
totalFound.appendChild(totalDiv)

const newsContainer = document.getElementById('news-container');
newsContainer.textContent = '';
// display no news
const noNews = document.getElementById('not-found-message');
if(elements.length === 0){
  noNews.classList.remove('d-none')
}
else{
  noNews.classList.add('d-none')
}
// display all news
elements.forEach( element => {
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('card')
    newsDiv.innerHTML = `
    <div class="row g-4">
          <div class="col-md-4">
            <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div> 
    
    `
    newsContainer.appendChild(newsDiv)
})

}


loadCatagories();
