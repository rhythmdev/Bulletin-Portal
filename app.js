const loadCatagories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();

  displayCatagories(data.data.news_category);
};
const displayCatagories = (categories) => {
  try {
    const allCategory = document.getElementById("all-catagories");
    categories.forEach((category) => {
      const li = document.createElement("li");

      li.innerHTML = `
                
                <a onclick="loadCategoriesData('${
                  category.category_id
                }'), toggleSpinner(${true})" class="nav-link text-dark" href="#">${
        category.category_name
      }</a>
               
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
  elements.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  //console.log(elements)
  // total news found
  try {
    const totalFound = document.getElementById("total-category");
    totalFound.textContent = "";
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `
<h5>${
      elements.length ? elements.length : "No"
    } news found for this category.</h5>
`;
    toggleSpinner(false);
    totalFound.appendChild(totalDiv);

    const newsContainer = document.getElementById("news-container");
    newsContainer.textContent = "";

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
              
                <button onclick="loadNewsDetail('${
                  element._id
                }')" class="show-btn" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
               </div>
            </div>
    
    `;
      newsContainer.appendChild(newsDiv);
      //stop loader
      toggleSpinner(false);
    });
  } catch (error) {
    console.log(error);
  }
};
const toggleSpinner = (isLoading) => {
  try {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
      loaderSection.classList.remove("d-none");
    } else {
      loaderSection.classList.add("d-none");
    }
  } catch (error) {
    console.log(error);
  }
};
const loadNewsDetail = async (news_id) => {
  try {
    const res = await fetch(
      ` https://openapi.programming-hero.com/api/news/${news_id}`
    );
    const data = await res.json();
    displayNewsDetail(data.data);
    //  console.log(data.data)
  } catch (error) {
    console.log(error);
  }
};

const displayNewsDetail = async (news) => {
  //  console.log(news)
  try {
    news.forEach((bulletin) => {
      const modalTitle = document.getElementById("phoneDetailModalLabel");
      modalTitle.innerText = bulletin.title;
      const newsDetails = document.getElementById("news-details");
      newsDetails.innerHTML = `
      <img src="${bulletin.image_url}" class="img-fluid">
      <P class="text-break mt-3">${bulletin.details.slice(0, 180) + "....."}</P>
      <div class="d-flex justify-content-around align-items-center text-center mt-2">
                  <div>
                   <img src="${
                     bulletin.author.img ? bulletin.author.img : "No data found"
                   }" class="img-fluid rounded-circle" style="width: 35px;">
                   <p>${
                     bulletin.author.name
                       ? bulletin.author.name
                       : "No data found"
                   }</p>
                  </div>
                  <div>
                    <img src="/view.png" alt="image">
                    <p>${
                      bulletin.total_view
                        ? bulletin.total_view
                        : "No data found"
                    }</p>
                  </div>
      `;
    });
  } catch (error) {
    console.log(error);
  }
};
loadCatagories();
