// Sample articles data (in production, this would come from an API)
let articles = [];

// Function to create article card
function createArticleCard(article) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            ${article.image ? `
                <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover">
            ` : ''}
            <div class="p-6">
                <h2 class="text-xl font-bold mb-2">${article.title}</h2>
                <p class="text-gray-600 text-sm mb-4">${new Date(article.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
                <p class="text-gray-700 mb-4">${article.content.substring(0, 150)}...</p>
                <a href="/articles/${article.slug}" class="text-blue-800 hover:text-blue-600 font-medium">
                    Baca Selengkapnya <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    `;
}

// Function to load articles
async function loadArticles() {
    try {
        // In production, this would be an API call
        const response = await fetch('/api/articles');
        articles = await response.json();
        
        const articlesGrid = document.getElementById('articlesGrid');
        if (articlesGrid) {
            articlesGrid.innerHTML = articles.map(createArticleCard).join('');
        }
    } catch (error) {
        console.error('Error loading articles:', error);
        // Fallback to sample data if API fails
        articles = [
            {
                id: 1,
                title: 'Tips Memilih Biji Kakao Berkualitas',
                slug: 'tips-memilih-biji-kakao-berkualitas',
                content: 'Biji kakao berkualitas memiliki ciri-ciri tertentu yang bisa dikenali...',
                date: '2024-03-15',
                image: '/images/cocoa.jpg'
            },
            {
                id: 2,
                title: 'Perkembangan Harga Kopi Dunia',
                slug: 'perkembangan-harga-kopi-dunia',
                content: 'Harga kopi dunia mengalami fluktuasi yang signifikan dalam beberapa bulan terakhir...',
                date: '2024-03-10',
                image: '/images/coffee.jpg'
            }
        ];
        
        const articlesGrid = document.getElementById('articlesGrid');
        if (articlesGrid) {
            articlesGrid.innerHTML = articles.map(createArticleCard).join('');
        }
    }
}

// Load articles when the page loads
document.addEventListener('DOMContentLoaded', loadArticles); 