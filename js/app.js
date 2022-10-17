const loadCategoriesName = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(response => response.json())
        .then(data => displayCategoriesName(data.data.news_category))
        .catch(error => console.log(error))
};

loadCategoriesName();

const displayCategoriesName = categories => {
    const categoresContainer = document.getElementById('categores_container');
    categories.forEach(category => {
        const categoiryDiv = document.createElement('div');
        categoiryDiv.classList.add('categoiry');
        categoiryDiv.innerHTML = `
               <p onclick="loadCategoryId('${category.category_id}')" class="px-2 py-1 rounded" href="">${category.category_name}</p>
        `;
        categoresContainer.appendChild(categoiryDiv);
        // console.log(category)
    });
};

const loadCategoryId = categoryId => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayNewsByCategory(data.data))
};

const displayNewsByCategory = newsCategories => {
    const newsContainer = document.getElementById('news_container');
    newsContainer.textContent = ``;
    newsCategories.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3 my-4">
            <div class="row g-0 p-3">
                <div class="col-md-4">
                    <img src="${news.thumbnail_url ? news.thumbnail_url : 'No data found'}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${news.title ? news.title : 'No data found'}</h5>
                            <p class="card-text">${news.details ? news.details : 'No data found'}</p>
                            <div class="card-text d-flex justify-content-between align-items-center pt-1">
                                <div class="d-flex">
                                   <div>
                                       <img class="rounded-circle" src="${news.author.img ? news.author.img : 'No data found'}" alt="" width="60" height="60">
                                   </div>
                                   <div class="ms-3">
                                       <h5>${news.author.name ? news.author.name : 'No author founds'}</h5>
                                       <p class="text-muted">${news.author.published_date ? news.author.published_date : 'No data found'} M</p>
                                   </div>
                                </div>
                                <div>
                                    <h5><span><i class="fa-regular fa-eye"></i></span> ${news.total_view ? news.total_view : 'No data found'}</h5>
                                </div>
                                <div>
                                    <span><i class="fa-regular fa-star-half-stroke"></i></span>
                                    <span><i class="fa-regular fa-star"></i></span>
                                    <span><i class="fa-regular fa-star"></i></span>
                                    <span><i class="fa-regular fa-star"></i></span>
                                    <span><i class="fa-regular fa-star"></i></span>
                                </div>
                                <div>
                                    <p class="text-primary">Show details</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>    
        `;
        newsContainer.appendChild(newsDiv)
        console.log(news)
    })
    // console.log(newsCategories)
}