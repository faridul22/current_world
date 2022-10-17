// load news categories data
const loadCategoriesName = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(response => response.json())
        .then(data => displayCategoriesName(data.data.news_category))
        .catch(error => console.log(error))

};
loadCategoriesName();

// display news categories name
const displayCategoriesName = categories => {
    const categoresContainer = document.getElementById('categores_container');
    categories.forEach(category => {
        const categoiryDiv = document.createElement('div');
        categoiryDiv.classList.add('categoiry');
        categoiryDiv.innerHTML = `
               <p onclick="loadCategoryId('${category.category_id ? category.category_id : 'No data found'}')" class="px-2 py-1 rounded categoiry" href="">${category.category_name ? category.category_name : 'No data found'}</p>
        `;
        categoresContainer.appendChild(categoiryDiv);
    });
};

// news load by category id
const loadCategoryId = categoryId => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayNewsByCategory(data.data))
        .catch(error => console.log(error))
    toggleSpinner(true);
};

// display all news
const displayNewsByCategory = newsCategories => {

    // display how many news found
    const showDataNumberField = document.getElementById('show_data_number');
    showDataNumberField.value = `${newsCategories.length ? newsCategories.length : 'No news found'} items your search category News`;

    // display no data found
    const noDataFound = document.getElementById('no_data');
    if (newsCategories.length === 0) {
        noDataFound.classList.remove('d-none')
        toggleSpinner(false);
    }
    else {
        noDataFound.classList.add('d-none')
    }

    // display news
    const newsContainer = document.getElementById('news_container');
    newsContainer.textContent = ``;
    newsCategories.forEach(news => {
        // news details text ellipsis
        news.details = news.details.slice(0, 350);
        // create new card
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3 my-4">
            <div class="row g-0 p-3">
                <div class="col-md-4 col-sm-12">
                    <img src="${news.thumbnail_url ? news.thumbnail_url : 'No data found'}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 col-sm-12">
                    <div class="card-body">
                            <h5 class="card-title">${news.title ? news.title : 'No data found'}</h5>
                            <p id="news_details" class="card-text">${news.details ? news.details : 'No data found'}....</p>
                            <div class="card-text d-sm-inline-flex d-md-flex justify-content-between align-items-center pt-1">
                                <div class="d-sm-inline-flex d-md-flex">
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
                                <p onclick="loadNewsDetails('${news._id}')" class="btn text-primary fw-bolder" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show details</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        `;
        newsContainer.appendChild(newsDiv);
        toggleSpinner(false);
        // console.log(news)

    })
};

// toggle spinner
const toggleSpinner = isLoding => {
    const spinner = document.getElementById('loding_spinner');
    if (isLoding === true) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none')
    }
};

const loadNewsDetails = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayNewsDetails(data.data))
        .catch(error => console.log(error))
}

// display modal
const displayNewsDetails = newsDetails => {
    //  display how many news found
    const showDataNumberField = document.getElementById('show_data_number');
    showDataNumberField.value = `${newsDetails.length} items found your search category`;

    // display no data found
    const noDataFound = document.getElementById('no_data');
    if (newsDetails.length === 0) {
        noDataFound.classList.remove('d-none')
        toggleSpinner(false);
    }
    else {
        noDataFound.classList.add('d-none')
    }

    // display news
    const modalContainer = document.getElementById('modal_container');
    modalContainer.textContent = ``;
    newsDetails.forEach(news => {
        // news details text ellipsis
        news.details = news.details.slice(0, 350);
        // create news modal
        const modalTitle = document.getElementById('modal_title');
        modalTitle.innerText = `${news.title ? news.title : 'No data found'}`;
        const newsModalDiv = document.createElement('div');

        newsModalDiv.innerHTML = `
        <div class="card mb-3 my-4">
            <div class="row g-0 p-3">
                <div class="col-md-12 col-sm-12 text-center">
                    <img src="${news.image_url ? news.image_url : 'No data found'}" class="img-fluid " alt="...">
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="card-body">
                        <p id="news_details" class="card-text">${news.details ? news.details : 'No data found'}....</p>
                        <div class="card-text d-flex flex-column justify-content-between align-items-center pt-1">
                            <div class="d-flex">
                                <div>
                                    <img class="rounded-circle" src="${news.author.img ? news.author.img : 'No data found'}" alt="" width="60" height="60">
                                </div>
                                <div class="ms-3">
                                    <h5>${news.author.name ? news.author.name : 'No author founds'}</h5>
                                    <p class="text-muted">${news.author.published_date ? news.author.published_date : 'No data found'} M</p>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div>
                                 <h5><span><i class="fa-regular fa-eye"></i></span> ${news.total_view ? news.total_view : 'No data found'}</h5>
                                </div>
                                <div class="ms-4">
                                    <span><i class="fa-regular fa-star-half-stroke"></i></span>
                                    <span><i class="fa-regular fa-star"></i></span>
                                    <span><i class="fa-regular fa-star"></i></span>
                                    <span><i class="fa-regular fa-star"></i></span>
                                    <span><i class="fa-regular fa-star"></i></span>
                                    <span class="fw-bolder">${news.rating.number}</i></span>
                                    
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        `; modalContainer.appendChild(newsModalDiv);
        toggleSpinner(false);

    })
};