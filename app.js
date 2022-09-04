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
     //start loader
    //  toggleSpinner(true)
      li.innerHTML = `
                
                <a onclick="loadCategoriesData('${category.category_id}'), toggleSpinner(${(true)})" class="nav-link text-dark" href="#">${category.category_name}</a>
               
               `;
      allCategory.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
};

const loadCategoriesData = async (category_id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${category_id}`
    );
    const data = await res.json();
    displayCatagoriesData(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayCatagoriesData = (elements) => {
  //console.log(elements)
  // total news found
try{
  const totalFound = document.getElementById("total-category");
  totalFound.textContent = "";
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `
<h5>${
    elements.length ? elements.length : "No"
  } news found for this category.</h5>
`;
  totalFound.appendChild(totalDiv);

  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  // display no news
  // const noNews = document.getElementById("not-found-message");
  // if (elements.length === 0) {
  //   noNews.classList.remove("d-none");
  // } else {
  //   noNews.classList.add("d-none");
  // }
  // toggleSpinner(false)
  // display all news
  elements.forEach((element) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.innerHTML = `
    <div class="card h-100 p-3 shadow-sm">
              <img src="${
                element.thumbnail_url
              }" class="card-img-top img-fluid h-50" alt="...">
              <div class="card-body text-center">
                <h5 class="card-title">${
                  element.title ? element.title : "No data found"
                }</h5>
                <p class="card-text text-break mt-3">${
                  element.details.slice(0, 180) + "....."
                }</p>
                
              </div>
              <div class="d-flex justify-content-around align-items-center text-center">
                <div>
                 <img src="${
                   element.author.img ? element.author.img : "No data found"
                 }" class="img-fluid rounded-circle" style="width: 35px;">
                 <p>${
                   element.author.name ? element.author.name : "No data found"
                 }</p>
                </div>
                <div>
                  <img src="/view.png" alt="image">
                  <p>${
                    element.total_view ? element.total_view : "No data found"
                  }</p>
                </div>
              
                <button onclick="loadNewsDetail('${element._id}')" class="show-btn" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show Details</button>
               </div>
            </div>
    
    `;
    newsContainer.appendChild(newsDiv);
    //stop loader
    toggleSpinner(false)
  });
}
catch(error){
  console.log(error)
}
  
};
const toggleSpinner = isLoading => {
  try{
    const loaderSection  = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
  }
  catch(error){
    console.log(error)
  }
  
}
const loadNewsDetail = async(news_id) =>{
  try{
    const res = await fetch(` https://openapi.programming-hero.com/api/news/${news_id}`)
    const data = await res.json();
    displayNewsDetail(data.data)
    // console.log(data.data)
  }
  catch(error){
    console.log(error)
  }
  
}

const displayNewsDetail = async (news) =>{
  //  console.log(news)
const modalContainer = document.getElementById('modal-container');
news.forEach((bulletin) => {
   const modalDiv = document.createElement('div');
  modalDiv.classList.add('col')
  modalDiv.innerHTML = `
  <div  class="modal fade" id="newsDetailModal" tabindex="-1" aria-labelledby="newsDetailModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    
      <div class="modal-header">
     
        <h5 class="modal-title" id="newsDetailModalLabel">'${bulletin.title}'</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src="${bulletin.thumbnail_url}">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>

  
  `
  modalContainer.appendChild(modalDiv)
})
}
loadCatagories();
