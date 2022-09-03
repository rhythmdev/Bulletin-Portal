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
                
                <a class="nav-link text-dark" href="#">${category.category_name}</a>
               
               `;
      allCategory.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
};


const loadCategoriesData = async(category_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    console.log(data.data)
}

const displayCatagoriesData = (elementData)=>{
    
}


loadCatagories();
