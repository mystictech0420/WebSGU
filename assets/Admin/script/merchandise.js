function stripHtml(html) {
    const temporaryElement = document.createElement('div');
    temporaryElement.innerHTML = html;
    return temporaryElement.textContent || temporaryElement.innerText || "";
}

document.addEventListener("DOMContentLoaded", () => {
    const rowsPerPage = 5; // Number of rows to show per page
    let currentPage = 1;
    let products = [];
    let editingItemIndex = null;

    // Load JSON data from `data.json`
    function loadData() {
        try {
            // Embedded JSON data
            products = JSON.parse(localStorage.getItem("products"));
            filteredProducts=null;
            displayPaginationButtons();
            displayPage(currentPage);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }
    // Function to display the product data for a specific page
    function displayPage(page) {
        const mainContent = document.getElementById("main-content");
        mainContent.innerHTML = ""; // Clear existing rows

        // Use filteredProducts if it's set, otherwise use the original products array
        const dataToDisplay = filteredProducts || products;

        // Calculate the start and end indices for the rows on the current page
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, dataToDisplay.length);

        // Generate the rows for the current page
        for (let i = startIndex; i < endIndex; i++) {
            const product = dataToDisplay[i];
            const productDiv = document.createElement("div");
            productDiv.classList.add("table");
            productDiv.innerHTML = `
                <img src="${product.images[0]}" width="20%">
                <div class="product-info">
                    <span>ID: ${product.id}</span>
                    <span>Name: ${product.name}</span>
                    <span>Category: ${product.category}</span>
                    <span>Price: ${product.price}</span>
                    <span>Description: ${stripHtml(product.description)}</span>
                </div>
                <div class="button-group">
                    <button class="edit-buttons1" onclick="openEditBlock(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="edit-buttons2" onclick="confirmDelete(${i})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            mainContent.appendChild(productDiv);
        }

        
        // updateActiveButton(page);
    }

    // Function to handle search functionality
    function searchProducts() {
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const searchFilter = document.getElementById("searchFilter").value;
    
        // Handle case where search filter is not valid
        if (searchFilter === "0" || !searchFilter) {
            alert("Please select a valid filter to search by.");
            return;
        }
    
        // Filter products based on the search criteria
        filteredProducts = products.filter(product => {
            const value = product[searchFilter]?.toString().toLowerCase();
            return value?.includes(searchInput);
        });
    
        if (filteredProducts.length === 0) {
            alert("No products found matching your search.");
        }
    
        // Update pagination and display the first page of filtered results
        currentPage = 1;
        displayPaginationButtons(filteredProducts);
        displayPage(currentPage);
    }
    function sortProducts() {
        const sortFilter = document.getElementById("searchFilter").value;
        console.log(`Selected filter: ${sortFilter}`);
        // If no valid sort filter is selected, return early
        if (sortFilter === "0" || !sortFilter) {
            alert("Please select a valid sort option.");
            return;
        }
    
        // Sorting logic based on selected filter
        switch (sortFilter) {
            case "0":
                break;
            case "id": // Sort by ID descending
                products.sort((a, b) => b.id - a.id);
                break;
            case "name": // Sort by name alphabetically
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "category": // Sort by category alphabetically
                products.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case "low-price": // Sort by lowest price
                products.sort((a, b) => a.price - b.price);
                break;
            case "high-price": // Sort by highest price
                products.sort((a, b) => b.price - a.price);
                break;
            case "recent": // Sort by most recently added (highest ID)
                products.sort((a, b) => b.id - a.id);
                break;
            case "description": // Sort by description alphabetically
                products.sort((a, b) => a.description.localeCompare(b.description));
                break;
            default:
                alert("Invalid sort option.");
                return;
        }
    
        // Reset to the first page and display sorted products
        currentPage = 1;
        displayPaginationButtons(products);
        displayPage(currentPage);
    }
    document.addEventListener("DOMContentLoaded", () => {
        loadData(); // Ensure products are loaded
        document.getElementById("searchFilter").addEventListener("change", sortProducts);
    });
    
    document.getElementById("searchSubmitButton").addEventListener("click", () => {
        searchProducts();
        sortProducts();
    });
    document.getElementById("searchFilter").addEventListener("change", () => {
        sortProducts(); // Trigger sorting
    });
    
    // Function to display filtered results
    function displayFilteredResults(filteredProducts) {
        const mainContent = document.getElementById("main-content");
        mainContent.innerHTML = ""; // Clear existing rows

        filteredProducts.forEach((product, index) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("table");
            productDiv.innerHTML = `
                <img src="${product.images[0]}" width="20%">
                <div class="product-info">
                    <span>ID: ${product.id}</span>
                    <span>Name: ${product.name}</span>
                    <span>Category: ${product.category}</span>
                    <span>Price: ${product.price}</span>
                    <span>Description: ${product.description}</span>
                </div>
                <div class="button-group">
                    <button class="edit-buttons1" onclick="openEditBlock(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="edit-buttons2" onclick="confirmDelete(${i})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            mainContent.appendChild(productDiv);
        });
    }

    // Function to display pagination buttons
    function displayPaginationButtons(data = null) {
        const buttonGroup = document.querySelector("#Display .merchandise .pagination-buttons");
        buttonGroup.innerHTML = ""; // Clear existing buttons

        // Use the provided data (filtered or original) to calculate total pages
        const dataToPaginate = data || (filteredProducts || products);
        const totalPages = Math.ceil(dataToPaginate.length / rowsPerPage);

        // Create Previous button
        const prevButton = document.createElement("button");
        prevButton.classList.add("prev-page");
        prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
            }
        });
        buttonGroup.appendChild(prevButton);

        // Create page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.classList.add("page-button");
            pageButton.textContent = i;
            pageButton.addEventListener("click", () => {
                currentPage = i;
                displayPage(currentPage);
            });
            buttonGroup.appendChild(pageButton);
        }

        // Create Next button
        const nextButton = document.createElement("button");
        nextButton.classList.add("next-page");
        nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(currentPage);
            }
        });
        buttonGroup.appendChild(nextButton);
    }
    loadData();

    // Function to toggle search block visibility
    document.getElementById("searchButton").addEventListener("click", () => {
        const searchBlock = document.getElementById("searchBlock");
        searchBlock.style.display = searchBlock.style.display === "none" ? "block" : "none";
    });

    // Trigger search when the search button is clicked
    document.getElementById("searchSubmitButton").addEventListener("click", searchProducts);

    // Function to open the Edit block (for editing or adding an item)
    window.openEditBlock = function(index = null) {
        editingItemIndex = index;
        const editBlock = document.querySelector('#Display .merchandise .DisplayEditItemBlock');
        editBlock.style.display = 'flex';

        if (index !== null) {
            // Pre-fill form for editing
            const product = products[index];
            document.getElementById('idInput').value = product.id;
            document.getElementById('nameInput').value = product.name;
            document.getElementById('categoryInput').value = product.category;
            document.getElementById('priceInput').value = product.price; // Use lowercase 'price'
            document.getElementById('descInput').value = stripHtml(product.description); // Use lowercase 'description'
            document.getElementById('uploadedImage').src = product.images[0];
            document.getElementById('uploadedImage').style.display = 'block';
            document.getElementById('uploadText').style.display = 'none';
        } else {
            // Clear form for adding a new item
            document.getElementById('itemForm').reset();
            document.getElementById('uploadedImage').style.display = 'none';
            document.getElementById('uploadText').style.display = 'block';
        }
    };

    // Function to close the Edit block
    window.closeEditBlock = function() {
        document.querySelector('#Display .merchandise .DisplayEditItemBlock').style.display = 'none';
    };

    // Function to validate and update/add the item
    window.updateItem = function() {
        const id = document.getElementById('idInput').value.trim();
        const name = document.getElementById('nameInput').value.trim();
        const category = document.getElementById('categoryInput').value.trim();
        const price = document.getElementById('priceInput').value.trim();
        const desc = document.getElementById('descInput').value.trim();
        const imageUploaded = document.getElementById('uploadedImage').src !== '';

        if (!id || !name || !category || !price || !desc || !imageUploaded) {
            alert('Please fill in all fields and upload an image.');
            return false;
        }

        if (editingItemIndex !== null) {
            // Update existing item
            products[editingItemIndex] = {
                id,
                name,
                category,
                price, // Use lowercase 'price'
                description: desc, // Use lowercase 'description'
                images: [document.getElementById('uploadedImage').src]
            };
            localStorage.setItem("products", JSON.stringify(products));
            displayPage(1);
            alert('Item updated successfully!');
        } else {
            // Add a new item
            products.push({
                id,
                name,
                category,
                price, // Use lowercase 'price'
                description: desc, // Use lowercase 'description'
                images: [document.getElementById('uploadedImage').src]
            });
            localStorage.setItem("products", JSON.stringify(products));
            alert('Item added successfully!');
            displayPage(1);
        }

        displayPage(currentPage);
        closeEditBlock();
    };
    loadData();
    // Function to confirm deletion of a product
    window.confirmDelete = function(index) {
        const confirmation = confirm("Are you sure that you want to delete this?");
        if (confirmation) {
            products.splice(index, 1); // Remove the product from the array
            localStorage.setItem("products", JSON.stringify(products));
            displayPage(1);  // Refresh the page after deletion
            displayPaginationButtons(); // Update pagination if needed
        }
    };

    // Load initial data and set up pagination
    loadData();
});

// Event listener for the image file input
document.getElementById('imageInput').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('uploadedImage').src = e.target.result;
            document.getElementById('uploadedImage').style.display = 'block';
            document.getElementById('uploadText').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

