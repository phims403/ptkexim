// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden p-2 text-gray-700';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('nav .flex-shrink-0').appendChild(mobileMenuButton);

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu hidden';
    mobileMenu.innerHTML = `
        <div class="p-4">
            <div class="flex justify-between items-center mb-4">
                <span class="text-2xl font-bold text-blue-800">PTK Exim</span>
                <button class="p-2 text-gray-700" id="closeMenu">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-4">
                <a href="/" class="block text-gray-700 hover:text-blue-800">Home</a>
                <a href="/about" class="block text-gray-700 hover:text-blue-800">Tentang Kami</a>
                <a href="/products" class="block text-gray-700 hover:text-blue-800">Produk</a>
                <a href="/suppliers" class="block text-gray-700 hover:text-blue-800">Supplier</a>
                <a href="/articles" class="block text-gray-700 hover:text-blue-800">Artikel & Berita</a>
                <a href="/contact" class="block text-gray-700 hover:text-blue-800">Hubungi Kami</a>
                <a href="/admin/login" class="block bg-blue-800 text-white px-4 py-2 rounded-md text-center">Login Admin</a>
            </div>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('block');
    });

    document.getElementById('closeMenu').addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Load featured products
    loadFeaturedProducts();
});

// Function to load featured products
async function loadFeaturedProducts() {
    try {
        // In a real application, this would fetch from an API
        const products = [
            {
                id: 1,
                name: 'Biji Kakao Fermentasi',
                image: 'images/products/cocoa.jpg',
                description: 'Kualitas premium, siap ekspor'
            },
            {
                id: 2,
                name: 'Kopi Arabika',
                image: 'images/products/coffee.jpg',
                description: 'Asal Gayo, grade specialty'
            },
            {
                id: 3,
                name: 'Rempah-rempah',
                image: 'images/products/spices.jpg',
                description: 'Berbagai jenis rempah pilihan'
            }
        ];

        const productsContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
        if (productsContainer) {
            products.forEach(product => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
            });
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Function to create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card animate-fade-in';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-card-image">
        <div class="product-card-content">
            <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-4">${product.description}</p>
            <a href="/products/${product.id}" class="btn-primary">Lihat Detail</a>
        </div>
    `;
    return card;
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
        } else {
            input.classList.remove('border-red-500');
        }
    });

    return isValid;
}

// Add form validation to contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                // In a real application, this would send the form data to a server
                alert('Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
                this.reset();
            }
        });
    }
});

// Sample data (in production, this would come from JSON files)
let products = [];
let articles = [];
let suppliers = [];

// Function to create product card
function createProductCard(product) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-2">Supplier: ${product.supplier}</p>
                <p class="text-gray-700 mb-4">${product.description.substring(0, 100)}...</p>
                <a href="/products/${product.id}" class="text-blue-800 hover:text-blue-600 font-medium">
                    Lihat Detail <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    `;
}

// Function to create article card
function createArticleCard(article) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            ${article.image ? `
                <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover">
            ` : ''}
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${article.title}</h3>
                <p class="text-gray-600 text-sm mb-4">${new Date(article.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
                <p class="text-gray-700 mb-4">${article.content.substring(0, 150)}...</p>
                <a href="/articles/${article.id}" class="text-blue-800 hover:text-blue-600 font-medium">
                    Baca Selengkapnya <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    `;
}

// Function to create supplier card
function createSupplierCard(supplier) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
                <div class="flex items-center mb-4">
                    ${supplier.logo ? `
                        <img src="${supplier.logo}" alt="${supplier.name}" class="w-16 h-16 object-contain mr-4">
                    ` : ''}
                    <h3 class="text-xl font-bold">${supplier.name}</h3>
                </div>
                <p class="text-gray-600 mb-2">Lokasi: ${supplier.location}</p>
                <p class="text-gray-700 mb-4">Produk Utama: ${supplier.mainProducts}</p>
                <a href="/suppliers/${supplier.id}" class="text-blue-800 hover:text-blue-600 font-medium">
                    Lihat Profil <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    `;
}

// Function to load preview data
async function loadPreviewData() {
    try {
        // In production, these would be API calls
        const productsResponse = await fetch('/data/products.json');
        const articlesResponse = await fetch('/data/articles.json');
        const suppliersResponse = await fetch('/data/suppliers.json');

        products = await productsResponse.json();
        articles = await articlesResponse.json();
        suppliers = await suppliersResponse.json();

        // Update preview sections
        const productsPreview = document.getElementById('productsPreview');
        const articlesPreview = document.getElementById('articlesPreview');
        const suppliersPreview = document.getElementById('suppliersPreview');

        if (productsPreview) {
            productsPreview.innerHTML = products
                .slice(0, 3)
                .map(createProductCard)
                .join('');
        }

        if (articlesPreview) {
            articlesPreview.innerHTML = articles
                .slice(0, 3)
                .map(createArticleCard)
                .join('');
        }

        if (suppliersPreview) {
            suppliersPreview.innerHTML = suppliers
                .slice(0, 3)
                .map(createSupplierCard)
                .join('');
        }
    } catch (error) {
        console.error('Error loading preview data:', error);
        // Fallback to sample data
        products = [
            {
                id: 1,
                name: 'Biji Kakao Premium',
                supplier: 'PT. Supplier A',
                description: 'Biji kakao berkualitas tinggi dari perkebunan terbaik di Indonesia...',
                image: '/images/cocoa.jpg'
            },
            {
                id: 2,
                name: 'Kopi Arabika',
                supplier: 'PT. Supplier B',
                description: 'Kopi arabika premium dari dataran tinggi Indonesia...',
                image: '/images/coffee.jpg'
            },
            {
                id: 3,
                name: 'Rempah-rempah',
                supplier: 'PT. Supplier C',
                description: 'Berbagai jenis rempah-rempah berkualitas ekspor...',
                image: '/images/spices.jpg'
            }
        ];

        articles = [
            {
                id: 1,
                title: 'Tips Memilih Biji Kakao Berkualitas',
                content: 'Biji kakao berkualitas memiliki ciri-ciri tertentu yang bisa dikenali...',
                date: '2024-03-15',
                image: '/images/cocoa.jpg'
            },
            {
                id: 2,
                title: 'Perkembangan Harga Kopi Dunia',
                content: 'Harga kopi dunia mengalami fluktuasi yang signifikan dalam beberapa bulan terakhir...',
                date: '2024-03-10',
                image: '/images/coffee.jpg'
            },
            {
                id: 3,
                title: 'Potensi Ekspor Rempah Indonesia',
                content: 'Indonesia memiliki potensi besar dalam ekspor rempah-rempah...',
                date: '2024-03-05',
                image: '/images/spices.jpg'
            }
        ];

        suppliers = [
            {
                id: 1,
                name: 'PT. Supplier A',
                location: 'Jawa Barat',
                mainProducts: 'Biji Kakao',
                logo: '/images/supplier1.jpg'
            },
            {
                id: 2,
                name: 'PT. Supplier B',
                location: 'Sumatra Utara',
                mainProducts: 'Kopi',
                logo: '/images/supplier2.jpg'
            },
            {
                id: 3,
                name: 'PT. Supplier C',
                location: 'Jawa Timur',
                mainProducts: 'Rempah-rempah',
                logo: '/images/supplier3.jpg'
            }
        ];

        // Update preview sections with sample data
        const productsPreview = document.getElementById('productsPreview');
        const articlesPreview = document.getElementById('articlesPreview');
        const suppliersPreview = document.getElementById('suppliersPreview');

        if (productsPreview) {
            productsPreview.innerHTML = products
                .slice(0, 3)
                .map(createProductCard)
                .join('');
        }

        if (articlesPreview) {
            articlesPreview.innerHTML = articles
                .slice(0, 3)
                .map(createArticleCard)
                .join('');
        }

        if (suppliersPreview) {
            suppliersPreview.innerHTML = suppliers
                .slice(0, 3)
                .map(createSupplierCard)
                .join('');
        }
    }
}

// Load preview data when the page loads
document.addEventListener('DOMContentLoaded', loadPreviewData); 