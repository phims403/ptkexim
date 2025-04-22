// Sample data (in production, this would come from JSON files)
let products = [];
let suppliers = [];

// Function to create product row
function createProductRow(product) {
    return `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <img src="${product.image}" alt="${product.name}" class="h-10 w-10 rounded-full object-cover">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${product.name}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${product.category}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${product.supplier}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${product.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-900 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
}

// Function to load products
async function loadProducts() {
    try {
        // In production, this would be an API call
        const response = await fetch('/data/products.json');
        products = await response.json();
        updateProductsTable();
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to sample data
        products = [
            {
                id: 1,
                name: 'Biji Kakao Premium',
                category: 'Biji Kakao',
                supplier: 'PT. Supplier A',
                status: 'active',
                image: '/images/cocoa.jpg'
            },
            {
                id: 2,
                name: 'Kopi Arabika',
                category: 'Kopi',
                supplier: 'PT. Supplier B',
                status: 'active',
                image: '/images/coffee.jpg'
            },
            {
                id: 3,
                name: 'Rempah-rempah',
                category: 'Rempah-rempah',
                supplier: 'PT. Supplier C',
                status: 'active',
                image: '/images/spices.jpg'
            }
        ];
        updateProductsTable();
    }
}

// Function to update products table
function updateProductsTable() {
    const tableBody = document.getElementById('productsTableBody');
    if (tableBody) {
        tableBody.innerHTML = products.map(createProductRow).join('');
    }
}

// Function to load suppliers for dropdown
async function loadSuppliers() {
    try {
        // In production, this would be an API call
        const response = await fetch('/data/suppliers.json');
        suppliers = await response.json();
        updateSupplierDropdown();
    } catch (error) {
        console.error('Error loading suppliers:', error);
        // Fallback to sample data
        suppliers = [
            { id: 1, name: 'PT. Supplier A' },
            { id: 2, name: 'PT. Supplier B' },
            { id: 3, name: 'PT. Supplier C' }
        ];
        updateSupplierDropdown();
    }
}

// Function to update supplier dropdown
function updateSupplierDropdown() {
    const dropdown = document.getElementById('productSupplier');
    if (dropdown) {
        dropdown.innerHTML = suppliers.map(supplier => 
            `<option value="${supplier.id}">${supplier.name}</option>`
        ).join('');
    }
}

// Function to show product modal
function showProductModal(product = null) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');
    
    if (product) {
        modalTitle.textContent = 'Edit Produk';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productSupplier').value = product.supplierId;
        document.getElementById('productStatus').value = product.status;
        document.getElementById('productDescription').value = product.description;
    } else {
        modalTitle.textContent = 'Tambah Produk';
        form.reset();
    }
    
    modal.classList.remove('hidden');
}

// Function to hide product modal
function hideProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.add('hidden');
}

// Function to edit product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        showProductModal(product);
    }
}

// Function to delete product
function deleteProduct(id) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        products = products.filter(p => p.id !== id);
        updateProductsTable();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadSuppliers();

    // Add Product Button
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => showProductModal());
    }

    // Cancel Button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideProductModal);
    }

    // Product Form Submit
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const id = document.getElementById('productId').value;
            const name = document.getElementById('productName').value;
            const category = document.getElementById('productCategory').value;
            const supplierId = document.getElementById('productSupplier').value;
            const status = document.getElementById('productStatus').value;
            const description = document.getElementById('productDescription').value;
            
            const product = {
                id: id || Date.now(),
                name,
                category,
                supplierId,
                supplier: suppliers.find(s => s.id === parseInt(supplierId))?.name || '',
                status,
                description,
                image: '/images/default-product.jpg' // Default image
            };

            if (id) {
                // Update existing product
                const index = products.findIndex(p => p.id === parseInt(id));
                if (index !== -1) {
                    products[index] = product;
                }
            } else {
                // Add new product
                products.push(product);
            }

            updateProductsTable();
            hideProductModal();
        });
    }

    // Search and Filter
    const searchInput = document.getElementById('searchProduct');
    const categoryFilter = document.getElementById('categoryFilter');
    const supplierFilter = document.getElementById('supplierFilter');

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const supplier = supplierFilter.value;

        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || product.category === category;
            const matchesSupplier = !supplier || product.supplierId === parseInt(supplier);
            return matchesSearch && matchesCategory && matchesSupplier;
        });

        const tableBody = document.getElementById('productsTableBody');
        if (tableBody) {
            tableBody.innerHTML = filteredProducts.map(createProductRow).join('');
        }
    }

    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (supplierFilter) supplierFilter.addEventListener('change', filterProducts);
}); 