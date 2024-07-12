document.addEventListener('DOMContentLoaded', () => {
    const articles = document.querySelectorAll('article');
    
    articles.forEach(article => {
        article.addEventListener('click', () => {
            alert(`你点击了: ${article.querySelector('h3').innerText}`);
        });
    });
});