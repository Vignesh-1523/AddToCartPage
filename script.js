 // Sample product data
 const products = [
    { id: 1, name: 'Product 1', price: 1500, image: 'https://webapi3.adata.com/storage/product/xenia_15g_plk_002_listing_page.png' },
    { id: 2, name: 'Product 2', price: 2500, image: 'https://www.intel.com/content/dam/www/central-libraries/us/en/images/2022-08/chromebook-product-image-transparent-background.png.rendition.intel.web.576.324.png' },
    { id: 3, name: 'Product 3', price: 3500, image: 'https://png.pngtree.com/png-clipart/20230418/original/pngtree-3d-laptop-original-design-png-image_9065802.png' },
    { id: 4, name: 'Product 4', price: 4500, image: 'https://png.pngtree.com/png-vector/20240208/ourlarge/pngtree-laptop-with-colorful-screen-png-image_11731791.png' },
    { id: 5, name: 'Product 5', price: 5500, image: 'https://png.pngtree.com/png-clipart/20240403/original/pngtree-a-laptop-with-colorful-screen-png-image_14745825.png' },
    { id: 6, name: 'Product 6', price: 6500, image: 'https://png.pngtree.com/png-vector/20240310/ourmid/pngtree-laptop-with-colorful-screen-isolated-on-white-background-clipping-path-included-png-image_11890961.png' }
];

let cart = [];

function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <div class="image">
            <img src="${product.image}" alt="${product.name}" ">
            </div>
            <div class="selection">
            <p> <span>$</span> ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    if (cart.length >= 100) {
        alert('You cannot add more than 100 products to the cart.');
        return;
    }

    const product = products.find(p => p.id === productId);
    const existingCartItem = cart.find(item => item.id === productId);

    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        // const span = document.createElement('span')
        // span.innerHTML = `- $ ${item.price} [ Qty ${item.quantity} ]`;
        cartItem.textContent = `${item.name} - $ ${item.price} [ Qty ${item.quantity} ]`;
        const removeButton = document.createElement('button');
        removeButton.classList.add('removeBtn');
        removeButton.innerHTML = "X";
        removeButton.onclick = () => removeCartItem(item.id);
        // cartItem.appendChild(span);
        cartItem.appendChild(removeButton);
        cartList.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice;
    document.getElementById('average-price').textContent = calculateAveragePrice();
    
    const emptyCartMessage = document.getElementById('empty-cart-message');
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
    }
}

function removeCartItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function filterProducts(filterType) {
    let filteredProducts;

    switch (filterType) {
        case 'less':
            filteredProducts = products.filter(product => product.price < 2000);
            break;
        case 'between':
            filteredProducts = products.filter(product => product.price >= 2000 && product.price <= 5000);
            break;
        case 'more':
            filteredProducts = products.filter(product => product.price > 5000);
            break;
        default:
            filteredProducts = products;
    }

    renderProducts(filteredProducts);
}

function resetFilter() {
    renderProducts(products);
}

function sortCart(sortType) {
    switch (sortType) {
        case 'low':
            cart.sort((a, b) => a.price - b.price);
            break;
        case 'high':
            cart.sort((a, b) => b.price - a.price);
            break;
        default:
            // Do nothing
    }

    renderCart();
}

function calculateAveragePrice() {
    if (cart.length === 0) return 0;

    const totalPrices = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return (totalPrices / cart.length).toFixed(2);
}

// Initial render
renderProducts(products);
