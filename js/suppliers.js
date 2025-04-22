// Sample data (in production, this would come from JSON files)
let suppliers = [];

// Function to create supplier row
function createSupplierRow(supplier) {
    return `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <img src="${supplier.logo}" alt="${supplier.name}" class="h-10 w-10 rounded-full object-cover">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${supplier.name}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${supplier.location}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${supplier.mainProducts}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${supplier.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="editSupplier(${supplier.id})" class="text-blue-600 hover:text-blue-900 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteSupplier(${supplier.id})" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
}

// Function to load suppliers
async function loadSuppliers() {
    try {
        // In production, this would be an API call
        const response = await fetch('/data/suppliers.json');
        suppliers = await response.json();
        updateSuppliersTable();
    } catch (error) {
        console.error('Error loading suppliers:', error);
        // Fallback to sample data
        suppliers = [
            {
                id: 1,
                name: 'PT. Supplier A',
                location: 'Jawa Barat',
                mainProducts: 'Biji Kakao',
                status: 'active',
                logo: '/images/supplier1.jpg',
                description: 'Supplier biji kakao berkualitas dari Jawa Barat',
                contact: '081234567890'
            },
            {
                id: 2,
                name: 'PT. Supplier B',
                location: 'Sumatra Utara',
                mainProducts: 'Kopi',
                status: 'active',
                logo: '/images/supplier2.jpg',
                description: 'Supplier kopi arabika dari Sumatra Utara',
                contact: '081234567891'
            },
            {
                id: 3,
                name: 'PT. Supplier C',
                location: 'Jawa Timur',
                mainProducts: 'Rempah-rempah',
                status: 'active',
                logo: '/images/supplier3.jpg',
                description: 'Supplier rempah-rempah berkualitas dari Jawa Timur',
                contact: '081234567892'
            }
        ];
        updateSuppliersTable();
    }
}

// Function to update suppliers table
function updateSuppliersTable() {
    const tableBody = document.getElementById('suppliersTableBody');
    if (tableBody) {
        tableBody.innerHTML = suppliers.map(createSupplierRow).join('');
    }
}

// Function to show supplier modal
function showSupplierModal(supplier = null) {
    const modal = document.getElementById('supplierModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('supplierForm');
    
    if (supplier) {
        modalTitle.textContent = 'Edit Supplier';
        document.getElementById('supplierId').value = supplier.id;
        document.getElementById('supplierName').value = supplier.name;
        document.getElementById('supplierLocation').value = supplier.location;
        document.getElementById('supplierMainProduct').value = supplier.mainProducts;
        document.getElementById('supplierStatus').value = supplier.status;
        document.getElementById('supplierDescription').value = supplier.description;
        document.getElementById('supplierContact').value = supplier.contact;
    } else {
        modalTitle.textContent = 'Tambah Supplier';
        form.reset();
    }
    
    modal.classList.remove('hidden');
}

// Function to hide supplier modal
function hideSupplierModal() {
    const modal = document.getElementById('supplierModal');
    modal.classList.add('hidden');
}

// Function to edit supplier
function editSupplier(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        showSupplierModal(supplier);
    }
}

// Function to delete supplier
function deleteSupplier(id) {
    if (confirm('Apakah Anda yakin ingin menghapus supplier ini?')) {
        suppliers = suppliers.filter(s => s.id !== id);
        updateSuppliersTable();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSuppliers();

    // Add Supplier Button
    const addSupplierBtn = document.getElementById('addSupplierBtn');
    if (addSupplierBtn) {
        addSupplierBtn.addEventListener('click', () => showSupplierModal());
    }

    // Cancel Button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideSupplierModal);
    }

    // Supplier Form Submit
    const supplierForm = document.getElementById('supplierForm');
    if (supplierForm) {
        supplierForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const id = document.getElementById('supplierId').value;
            const name = document.getElementById('supplierName').value;
            const location = document.getElementById('supplierLocation').value;
            const mainProducts = document.getElementById('supplierMainProduct').value;
            const status = document.getElementById('supplierStatus').value;
            const description = document.getElementById('supplierDescription').value;
            const contact = document.getElementById('supplierContact').value;
            
            const supplier = {
                id: id || Date.now(),
                name,
                location,
                mainProducts,
                status,
                description,
                contact,
                logo: '/images/default-supplier.jpg' // Default logo
            };

            if (id) {
                // Update existing supplier
                const index = suppliers.findIndex(s => s.id === parseInt(id));
                if (index !== -1) {
                    suppliers[index] = supplier;
                }
            } else {
                // Add new supplier
                suppliers.push(supplier);
            }

            updateSuppliersTable();
            hideSupplierModal();
        });
    }

    // Search and Filter
    const searchInput = document.getElementById('searchSupplier');
    const locationFilter = document.getElementById('locationFilter');
    const statusFilter = document.getElementById('statusFilter');

    function filterSuppliers() {
        const searchTerm = searchInput.value.toLowerCase();
        const location = locationFilter.value;
        const status = statusFilter.value;

        const filteredSuppliers = suppliers.filter(supplier => {
            const matchesSearch = supplier.name.toLowerCase().includes(searchTerm);
            const matchesLocation = !location || supplier.location === location;
            const matchesStatus = !status || supplier.status === status;
            return matchesSearch && matchesLocation && matchesStatus;
        });

        const tableBody = document.getElementById('suppliersTableBody');
        if (tableBody) {
            tableBody.innerHTML = filteredSuppliers.map(createSupplierRow).join('');
        }
    }

    if (searchInput) searchInput.addEventListener('input', filterSuppliers);
    if (locationFilter) locationFilter.addEventListener('change', filterSuppliers);
    if (statusFilter) statusFilter.addEventListener('change', filterSuppliers);
}); 