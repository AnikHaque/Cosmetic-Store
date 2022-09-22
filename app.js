const productContainer = document.getElementById('product-container');
const coverSection = document.getElementById('bg-section');
const displayProductSection = document.getElementById('display-product');
// const productPriceContainer = document.getElementById('product-price');
const cartContainer = document.getElementById('cart-container');
// const productNameContainer = document.getElementById('product-name');
const cartTitle = document.getElementById('cart-title');
const totalPriceInCart = document.getElementById('total-price');
const cartDetails = document.getElementById('cart-details');
const confirmSection = document.getElementById('confirm-section');
const confirmBtn = document.getElementById('confirm-btn');
const confirmMsg = document.getElementById('confirm-message');
const loading = document.getElementById('loader');
// Home Section:
const homeSection = document.getElementById('home-section');

// Disable Confirm Button:
confirmBtn.setAttribute('disabled', true);

// Display None and Block Setup:
const displayNone = id => {
        id.style.display = 'none';
}
const displayBlock = id => {
        id.style.display = 'block';
}
// Initially Display None Cart Section:
displayNone(displayProductSection);
displayNone(cartContainer);
displayNone(confirmSection);

// Load Default Display Data:
fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`)
        .then(res => res.json())
        .then(data => displayProduct(data))

// Display Product Data:
const displayProduct = (products) => {
        displayNone(loading);
        console.log(products[0]);
        products.forEach((product) => {
                const { brand, name, price, image_link, product_colors } = product;
                // Product Color Code:
                const colorName = product_colors.splice(0, 3);
                const firstColor = colorName[0]?.hex_value;
                const secondColor = colorName[1]?.hex_value;
                const thirdColor = colorName[2]?.hex_value;

                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                                <div class="col">
                                <div class="h-100 product-card">
                                        <div class="product-image">
                                        <img src="${image_link}" class="img-fluid pt-3" alt="...">
                                        </div>
                                        <div class="card-body">
                                                <div class="product-name overflow-hidden">
                                                        <h5 class="card-title">${name}</h5>
                                                </div>
                                                <p class="m-0 p-0">Brand Name: ${brand}</p>
                                                
                                                <div class="d-flex justify-content-between mt-3">
                                                        <h3 class="product-price">$${price ? price : 20.99}</h3>
                                                        <button onclick="addToCartProduct('${name ? name : 'Emty Name'}','${price ? price : '20.99'}')" type="button" class="btn btn-danger fw-bold" id="add-cart"><i class="fas fa-cart-plus"></i> Add
                                                                Cart</button>
                                                </div>
                                        </div>
                                        <div class="text-center d-flex justify-content-center pb-3" id="product-color-container">
                                                <p class="product-color" style="background-color: ${firstColor ? firstColor : 'rgb(244, 205, 244)'}"></p>
                                                <p class="product-color" style="background-color: ${secondColor ? secondColor : 'rgb(244, 183, 183)'}"></p>
                                                <p class="product-color" style="background-color: ${thirdColor ? thirdColor : 'rgb(239, 244, 183)'}"></p>
                                        </div>

                                </div>
                        </div>
                `;
                productContainer.appendChild(productDiv);
        })
}

// Loaded Item Products By Menu Click:
const singleItem = (url, itemName) => {
        displayNone(displayProductSection)
        displayBlock(loading)
        // console.log(url)
        fetch(url)
                .then(res => res.json())
                .then(data => displaySingleItem(data, itemName))
}

const displaySingleItem = (products, itemName) => {
        // Title Text in BG:
        const readyItems = document.getElementById('ready-items');
        readyItems.innerHTML = `<span class="orange">${itemName}</span><span class="text-dark">'s are ready in below...</span>`
        productContainer.textContent = '';
        // console.log(products[0].product_colors.length);
        products.forEach((product) => {
                // Destructure Value
                const { brand, name, price, image_link, product_colors } = product;
                // console.log(product_colors.splice(0, 3));//That is Array
                const colorName = product_colors.splice(0, 3);
                const firstColor = colorName[0]?.hex_value;
                const secondColor = colorName[1]?.hex_value;
                const thirdColor = colorName[2]?.hex_value;
                // Create Single Product
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                                <div class="col">
                                <div class="h-100 product-card">
                                        <div class="product-image">
                                                <img src="${image_link}" class="img-fluid pt-3" alt="...">
                                        </div>
                                        <div class="card-body">
                                                <div class="product-name overflow-hidden">
                                                        <h5 class="card-title">${name}</h5>
                                                </div>
                                                <p class="m-0 p-0">Brand Name: ${brand}</p>
                                                <div class="d-flex justify-content-between mt-3">
                                                        <h3 class="product-price">$${price ? price : '20.99'}</h3>
                                                        <button onclick="addToCartProduct('${name}','${price}')" type="button" class="btn btn-danger fw-bold" id="add-cart">
                                                                <i class="fas fa-cart-plus"></i> Add
                                                                Cart
                                                        </button>
                                                </div>
                                        </div>
                                        <div class="text-center d-flex justify-content-center pb-3" id="product-color-container">
                                                <p class="product-color" style="background-color: ${firstColor ? firstColor : 'rgb(244, 205, 244)'}"></p>
                                                <p class="product-color" style="background-color: ${secondColor ? secondColor : 'rgb(244, 183, 183)'}"></p>
                                                <p class="product-color" style="background-color: ${thirdColor ? thirdColor : 'rgb(239, 244, 183)'}"></p>
                                        </div>
                                </div>
                        </div>
                `;
                productContainer.appendChild(productDiv);
        })
        displayNone(loading);
        displayBlock(displayProductSection)
}

// My Cart: 
const myCart = () => {
        displayNone(coverSection);
        displayNone(displayProductSection);
        displayNone(homeSection);
        displayBlock(cartContainer);
        displayBlock(confirmSection)
}

let totalPrice = 0;
let totalProductCount = 0;
const productCountContainer = document.getElementById('product-count');
// Click Add to Cart and Pass Value:
const addToCartProduct = (name, price) => {
        displayNone(cartTitle);
        // Enable Confirm Button After Added Product:
        confirmBtn.removeAttribute('disabled');

        totalPrice = totalPrice + (+price);
        totalProductCount = totalProductCount + 1;
        productCountContainer.innerText = totalProductCount;

        // Set Single Price In Cart Details:
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `
                <div class="row">
                        <div class="col-1 text-center"><h6>${totalProductCount}</h6></div>
                        <div class="col-8"><h6>${name}</h6></div>
                        <div class="col-3"><h6>$ ${price ? price : '10'}</h6></div>
                </div>
                <hr/>
        `;
        cartDetails.appendChild(cartItemDiv);

        // Set Total Price:
        totalPriceInCart.innerHTML = `
                <h4>$ ${totalPrice.toFixed(2)}</h4>
        `;
        console.log(totalPrice)

}

// Confirm Section After Click:
confirmBtn.addEventListener('click', function () {
        window.scroll(0, 0)
        displayNone(cartContainer);
        displayNone(confirmSection);
        displayBlock(confirmMsg);
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="d-flex justify-content-center">
                        <div style="margin-top: 10%">
                                <img class="img-fluid" src="./images/giphy.gif" alt="">
                        </div>
                </div>
                <div class="text-center mt-5">
                        <h3 class="text-center">Thank You<h3>
                        <h3 class="orange">Your Makeup Box is up</h3>
                </div>
                <div class="d-flex justify-content-center">
                        <div style="margin-top: 3%; width: 350px">
                                <img class="img-fluid" src="./images/confirm-emoji.png" alt="">
                        </div>
                </div>
        `;
        confirmMsg.appendChild(div);
        document.getElementById('home').addEventListener('click', () => {
                location.reload();
        });
        document.getElementById('products').addEventListener('click', () => {
                location.reload();
                showProducts();
        });
        document.getElementById('logo').addEventListener('click', () => {
                location.reload();
        });
        document.getElementById('my-cart').addEventListener('click', () => {
                displayNone(cartContainer);
                window.scrollTo(0, 0);
                displayNone(confirmSection);
        })
        document.getElementById('cart-icon').addEventListener('click', () => {
                displayNone(cartContainer);
                window.scrollTo(0, 0);
                displayNone(confirmSection);
        })
})

// Home Section:
const displayHomePart = () => {
        displayNone(displayProductSection);
        displayNone(cartContainer);
        displayBlock(coverSection);
        displayBlock(homeSection);
        displayNone(confirmSection);
        displayNone(confirmMsg);
}

// Show Product click in products:
const showProducts = () => {
        displayNone(coverSection);
        displayBlock(displayProductSection);
        displayNone(confirmSection);
        displayNone(cartContainer);
        displayNone(confirmMsg);
        displayNone(homeSection);
}
