const loadCategoriesName = () => {
    fetch(' https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => displayCategoriesName(data.data.news_category))
        .catch(error => console.log(error))
}
loadCategoriesName()
const displayCategoriesName = (categories) => {
    const categoresContainer = document.getElementById('categores_container');
    categories.forEach(category => {
        const categoiryDiv = document.createElement('div');
        categoiryDiv.classList.add('categoiry');
        categoiryDiv.innerHTML = `
                            <a class="px-2 py-1 rounded" href="">${category.category_name}</a>
        `;
        categoresContainer.appendChild(categoiryDiv);
        console.log(category)
    });
    console.log(categories)
}