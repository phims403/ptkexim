// Admin credentials (in a real application, this should be stored securely on the server)
let adminCredentials = {
    username: 'admin',
    password: 'password'
};

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const currentPage = window.location.pathname;

    if (currentPage.includes('dashboard.html') && !isLoggedIn) {
        window.location.href = 'login.html';
    } else if (currentPage.includes('login.html') && isLoggedIn) {
        window.location.href = 'dashboard.html';
    }
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const adminSettingsForm = document.getElementById('adminSettingsForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check authentication status
    checkAuth();

    // Login form handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === adminCredentials.username && password === adminCredentials.password) {
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Admin settings form handler
    if (adminSettingsForm) {
        adminSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            if (newPassword.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }

            // Update credentials
            adminCredentials.username = newUsername || adminCredentials.username;
            adminCredentials.password = newPassword || adminCredentials.password;

            // Show success message
            alert('Admin credentials updated successfully');
            
            // Clear form
            adminSettingsForm.reset();
        });
    }

    // Logout handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }
});

// Sample data storage (in a real application, this would be replaced with API calls)
let articles = [];
let products = [];
let suppliers = [];
let activityLog = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats();
    loadActivityLog();
});

// Dashboard stats
function updateDashboardStats() {
    document.getElementById('totalArticles').textContent = articles.length;
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalSuppliers').textContent = suppliers.length;
}

// Activity log
function loadActivityLog() {
    const activityLogElement = document.getElementById('activityLog');
    activityLogElement.innerHTML = activityLog.map(activity => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${activity.time}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${activity.action}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${activity.status}</td>
        </tr>
    `).join('');
}

function addActivity(action, status) {
    const now = new Date();
    activityLog.unshift({
        time: now.toLocaleString(),
        action,
        status
    });
    loadActivityLog();
}

// Article Management
function showAddArticleModal() {
    document.getElementById('articleModalTitle').textContent = 'Tambah Artikel';
    document.getElementById('articleId').value = '';
    document.getElementById('articleTitle').value = '';
    document.getElementById('articleContent').value = '';
    document.getElementById('articleImage').value = '';
    document.getElementById('articleModal').classList.remove('hidden');
}

function showEditArticleModal(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (article) {
        document.getElementById('articleModalTitle').textContent = 'Edit Artikel';
        document.getElementById('articleId').value = article.id;
        document.getElementById('articleTitle').value = article.title;
        document.getElementById('articleContent').value = article.content;
        document.getElementById('articleModal').classList.remove('hidden');
    }
}

function hideArticleModal() {
    document.getElementById('articleModal').classList.add('hidden');
}

// Function to create article page
async function createArticlePage(article) {
    try {
        // Create slug from title
        const slug = article.title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Format date
        const formattedDate = new Date(article.createdAt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create article HTML
        const articleHtml = `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${article.title} - PTK Exim</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body class="font-sans">
                <!-- Navigation -->
                <nav class="bg-white shadow-lg fixed w-full z-50">
                    <div class="max-w-7xl mx-auto px-4">
                        <div class="flex justify-between items-center h-16">
                            <div class="flex-shrink-0">
                                <a href="/" class="text-2xl font-bold text-blue-800">PTK Exim</a>
                            </div>
                            <div class="hidden md:block">
                                <div class="ml-10 flex items-baseline space-x-4">
                                    <a href="/" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md">Home</a>
                                    <a href="/about.html" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md">Tentang Kami</a>
                                    <a href="/products.html" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md">Produk</a>
                                    <a href="/suppliers.html" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md">Supplier</a>
                                    <a href="/articles.html" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md">Artikel & Berita</a>
                                    <a href="/contact.html" class="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md">Hubungi Kami</a>
                                    <a href="/admin/login.html" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login Admin</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- Article Content -->
                <div class="pt-20">
                    <div class="max-w-4xl mx-auto px-4 py-8">
                        <article class="bg-white rounded-lg shadow-md p-8">
                            <h1 class="text-3xl font-bold mb-4">${article.title}</h1>
                            <div class="flex items-center text-gray-500 mb-6">
                                <span class="mr-4"><i class="far fa-calendar-alt mr-2"></i>${formattedDate}</span>
                            </div>
                            ${article.image ? `<img src="${article.image}" alt="${article.title}" class="w-full h-96 object-cover rounded-lg mb-6">` : ''}
                            <div class="prose max-w-none">
                                ${article.content}
                            </div>
                        </article>
                    </div>
                </div>

                <script src="/js/main.js"></script>
            </body>
            </html>
        `;

        // Save the article page
        const response = await fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                slug,
                content: articleHtml
            })
        });

        if (!response.ok) {
            throw new Error('Gagal menyimpan artikel');
        }

        return slug;
    } catch (error) {
        console.error('Error creating article page:', error);
        throw error;
    }
}

// Function to delete article page
async function deleteArticlePage(slug) {
    const response = await fetch(`/api/articles/${slug}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete article page');
    }
}

// Initialize all management functions
document.addEventListener('DOMContentLoaded', () => {
    // Load tables if they exist
    if (document.getElementById('articlesTable')) {
        loadArticlesTable();
    }
    if (document.getElementById('productsTableBody')) {
        loadProductsTable();
    }
    if (document.getElementById('suppliersTableBody')) {
        loadSuppliersTable();
    }

    // Article Management
    const articleForm = document.getElementById('articleForm');
    if (articleForm) {
        articleForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const articleId = document.getElementById('articleId').value;
            const title = document.getElementById('articleTitle').value.trim();
            const content = document.getElementById('articleContent').value.trim();
            const image = document.getElementById('articleImage').files[0];

            // Validate form
            if (!title || !content) {
                alert('Judul dan konten artikel harus diisi');
                return;
            }

            try {
                if (articleId) {
                    // Edit existing article
                    const index = articles.findIndex(a => a.id === articleId);
                    if (index !== -1) {
                        const oldSlug = articles[index].slug;
                        const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        
                        if (oldSlug !== newSlug) {
                            await deleteArticlePage(oldSlug);
                        }
                        
                        articles[index] = {
                            ...articles[index],
                            title,
                            content,
                            image: image ? URL.createObjectURL(image) : articles[index].image,
                            slug: await createArticlePage({
                                ...articles[index],
                                title,
                                content,
                                image: image ? URL.createObjectURL(image) : articles[index].image
                            })
                        };
                        
                        addActivity(`Mengedit artikel: ${title}`, 'Berhasil');
                    }
                } else {
                    // Add new article
                    const newArticle = {
                        id: Date.now().toString(),
                        title,
                        content,
                        image: image ? URL.createObjectURL(image) : null,
                        createdAt: new Date().toISOString()
                    };

                    newArticle.slug = await createArticlePage(newArticle);
                    articles.push(newArticle);
                    addActivity(`Menambahkan artikel baru: ${title}`, 'Berhasil');
                }

                hideArticleModal();
                updateDashboardStats();
                loadArticlesTable();
                this.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat menyimpan artikel: ' + error.message);
            }
        });
    }

    // Product Management
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const productId = document.getElementById('productId').value;
            const name = document.getElementById('productName').value.trim();
            const category = document.getElementById('productCategory').value;
            const supplierId = document.getElementById('productSupplier').value;
            const status = document.getElementById('productStatus').value;
            const description = document.getElementById('productDescription').value.trim();
            const image = document.getElementById('productImage').files[0];

            // Validate form
            if (!name || !category || !supplierId || !status || !description) {
                alert('Semua field yang ditandai dengan * harus diisi');
                return;
            }

            try {
                if (productId) {
                    // Edit existing product
                    const index = products.findIndex(p => p.id === productId);
                    if (index !== -1) {
                        products[index] = {
                            ...products[index],
                            name,
                            category,
                            supplierId,
                            status,
                            description,
                            image: image ? URL.createObjectURL(image) : products[index].image
                        };
                        addActivity(`Mengedit produk: ${name}`, 'Berhasil');
                    }
                } else {
                    // Add new product
                    const newProduct = {
                        id: Date.now().toString(),
                        name,
                        category,
                        supplierId,
                        status,
                        description,
                        image: image ? URL.createObjectURL(image) : null,
                        createdAt: new Date().toISOString()
                    };
                    products.push(newProduct);
                    addActivity(`Menambahkan produk baru: ${name}`, 'Berhasil');
                }

                hideProductModal();
                updateDashboardStats();
                loadProductsTable();
                this.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat menyimpan produk: ' + error.message);
            }
        });
    }

    // Supplier Management
    const supplierForm = document.getElementById('supplierForm');
    if (supplierForm) {
        supplierForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const supplierId = document.getElementById('supplierId').value;
            const name = document.getElementById('supplierName').value.trim();
            const location = document.getElementById('supplierLocation').value;
            const mainProduct = document.getElementById('supplierMainProduct').value;
            const status = document.getElementById('supplierStatus').value;
            const description = document.getElementById('supplierDescription').value.trim();
            const contact = document.getElementById('supplierContact').value.trim();
            const logo = document.getElementById('supplierLogo').files[0];

            // Validate form
            if (!name || !location || !mainProduct || !status || !description) {
                alert('Semua field yang ditandai dengan * harus diisi');
                return;
            }

            try {
                if (supplierId) {
                    // Edit existing supplier
                    const index = suppliers.findIndex(s => s.id === supplierId);
                    if (index !== -1) {
                        suppliers[index] = {
                            ...suppliers[index],
                            name,
                            location,
                            mainProduct,
                            status,
                            description,
                            contact,
                            logo: logo ? URL.createObjectURL(logo) : suppliers[index].logo
                        };
                        addActivity(`Mengedit supplier: ${name}`, 'Berhasil');
                    }
                } else {
                    // Add new supplier
                    const newSupplier = {
                        id: Date.now().toString(),
                        name,
                        location,
                        mainProduct,
                        status,
                        description,
                        contact,
                        logo: logo ? URL.createObjectURL(logo) : null,
                        createdAt: new Date().toISOString()
                    };
                    suppliers.push(newSupplier);
                    addActivity(`Menambahkan supplier baru: ${name}`, 'Berhasil');
                }

                hideSupplierModal();
                updateDashboardStats();
                loadSuppliersTable();
                this.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat menyimpan supplier: ' + error.message);
            }
        });
    }

    // Add button event listeners
    const addArticleBtn = document.getElementById('addArticleBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const addSupplierBtn = document.getElementById('addSupplierBtn');

    if (addArticleBtn) addArticleBtn.addEventListener('click', showAddArticleModal);
    if (addProductBtn) addProductBtn.addEventListener('click', showAddProductModal);
    if (addSupplierBtn) addSupplierBtn.addEventListener('click', showAddSupplierModal);

    // Cancel button event listeners
    const cancelArticleBtn = document.getElementById('cancelArticleBtn');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const cancelSupplierBtn = document.getElementById('cancelSupplierBtn');

    if (cancelArticleBtn) cancelArticleBtn.addEventListener('click', hideArticleModal);
    if (cancelProductBtn) cancelProductBtn.addEventListener('click', hideProductModal);
    if (cancelSupplierBtn) cancelSupplierBtn.addEventListener('click', hideSupplierModal);
});

// Function to load articles table
function loadArticlesTable() {
    const articlesTable = document.getElementById('articlesTable');
    articlesTable.innerHTML = articles.map(article => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${article.title}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${new Date(article.createdAt).toLocaleDateString('id-ID')}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="showEditArticleModal('${article.id}')" class="text-blue-600 hover:text-blue-900 mr-3">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteArticle('${article.id}')" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        </tr>
    `).join('');
}

// Update delete article function
async function deleteArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (article) {
        try {
            await deleteArticlePage(article.slug);
            articles = articles.filter(a => a.id !== articleId);
            addActivity(`Menghapus artikel: ${article.title}`, 'Berhasil');
            updateDashboardStats();
            loadArticlesTable();
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghapus artikel');
        }
    }
}

// Initialize articles table on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('articlesTable')) {
        loadArticlesTable();
    }
});

// Product Management
function showAddProductModal() {
    document.getElementById('productModalTitle').textContent = 'Tambah Produk';
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productModal').classList.remove('hidden');
}

function showEditProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productModalTitle').textContent = 'Edit Produk';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productModal').classList.remove('hidden');
    }
}

function hideProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

// Load products table
function loadProductsTable() {
    const productsTableBody = document.getElementById('productsTableBody');
    if (!productsTableBody) return;

    productsTableBody.innerHTML = products.map(product => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${product.name}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${product.category}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${product.price}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${product.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="showEditProductModal('${product.id}')" class="text-blue-600 hover:text-blue-900 mr-3">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteProduct('${product.id}')" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        </tr>
    `).join('');
}

// Delete product
async function deleteProduct(productId) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Gagal menghapus produk');
            }

            products = products.filter(p => p.id !== productId);
            addActivity(`Menghapus produk`, 'Berhasil');
            updateDashboardStats();
            loadProductsTable();
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghapus produk: ' + error.message);
        }
    }
}

// Supplier Management
function showAddSupplierModal() {
    document.getElementById('supplierModalTitle').textContent = 'Tambah Supplier';
    document.getElementById('supplierId').value = '';
    document.getElementById('supplierName').value = '';
    document.getElementById('supplierLocation').value = '';
    document.getElementById('supplierProduct').value = '';
    document.getElementById('supplierStatus').value = 'active';
    document.getElementById('supplierDescription').value = '';
    document.getElementById('supplierLogo').value = '';
    document.getElementById('supplierModal').classList.remove('hidden');
}

function showEditSupplierModal(supplierId) {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
        document.getElementById('supplierModalTitle').textContent = 'Edit Supplier';
        document.getElementById('supplierId').value = supplier.id;
        document.getElementById('supplierName').value = supplier.name;
        document.getElementById('supplierLocation').value = supplier.location;
        document.getElementById('supplierProduct').value = supplier.mainProduct;
        document.getElementById('supplierStatus').value = supplier.status;
        document.getElementById('supplierDescription').value = supplier.description;
        document.getElementById('supplierModal').classList.remove('hidden');
    }
}

function hideSupplierModal() {
    document.getElementById('supplierModal').classList.add('hidden');
}

// Load suppliers table
function loadSuppliersTable() {
    const suppliersTableBody = document.getElementById('suppliersTableBody');
    if (!suppliersTableBody) return;

    suppliersTableBody.innerHTML = suppliers.map(supplier => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                ${supplier.logo ? `<img src="${supplier.logo}" alt="${supplier.name}" class="h-10 w-10 rounded-full object-cover">` : 
                '<div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-building text-gray-400"></i></div>'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${supplier.name}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${supplier.location}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${supplier.mainProduct}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${supplier.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="showEditSupplierModal('${supplier.id}')" class="text-blue-600 hover:text-blue-900 mr-3">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteSupplier('${supplier.id}')" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        </tr>
    `).join('');
}

// Delete supplier
async function deleteSupplier(supplierId) {
    if (confirm('Apakah Anda yakin ingin menghapus supplier ini?')) {
        try {
            const response = await fetch(`/api/suppliers/${supplierId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Gagal menghapus supplier');
            }

            suppliers = suppliers.filter(s => s.id !== supplierId);
            addActivity(`Menghapus supplier`, 'Berhasil');
            updateDashboardStats();
            loadSuppliersTable();
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghapus supplier: ' + error.message);
        }
    }
} 