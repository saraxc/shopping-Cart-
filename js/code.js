let carts = document.querySelectorAll('.add-cart');

let products = [{
    id: 1,
    name: "Healer",
    artist: "GroupLove",
    price: 27,
    inCart: 0,
    tag: "grouplove",
},
{
    id: 2,
    name: "Fine Line",
    artist: "Harry Styles",
    price: 40,
    inCart: 0,
    tag: "fineline",
},
{
    id: 3,
    name: "After Hours",
    artist: "The Weeknd",
    price: 45,
    inCart: 0,
    tag:"after",
},
{
    id: 4,
    name: "Parachute",
    artist: "Petit Biscut",
    price: 27,
    inCart: 0,
   tag: "parachute",
},
{
    id: 5,
    name: "Live at Knebworth",
    artist: "Pink Floyd",
    price: 47,
    inCart: 0,
    tag: "pink",
},
{
    id: 6,
    name: "Cuttin' grass VOL.2",
    artist: "Sturgill Simpson",
    price: 18,
    inCart: 0,
    tag: "sturgill",
},
{

    id: 7,
    name: "FACES YELLOW EDITION VINYL",
    artist: "Mac Miller",
    price: 49,
    inCart: 0,
   tag:"MacMiller",
}
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        total(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product)

}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    console.log("Cart items", cartItems)

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }


    localStorage.setItem("productsInCart", JSON.stringify
        (cartItems))

}

function total(product) {
    let cartCost = localStorage.getItem('total')
    console.log("total", cartCost)

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("total", cartCost + product.price)


    } else {
        localStorage.setItem("total", product.price)
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector(".products")
    let cartCost = localStorage.getItem('total')
    
    if (cartItems && productContainer) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="product row">
                    <img src="./img/${item.tag}.jpg">
                    <span>${item.name}</span>
                    <span>${item.artist}</span>
                </div>
                <div class="price">$${item.price},00</div>
                <div class="quantity">
                    <span>${item.inCart}</span>
                </div>
                <div class="total">
                $${item.inCart * item.price},00
                </div>

            `
        })

        productContainer.innerHTML +=`
        <div class="TotalContainer">
            <h2 class="TotalTittle">
                TOTAL CHECKOUT
            </h2>
            <h4 class="basketTotal">
            $${cartCost},00
            </h4>
            
        </div>
        `

    }

}



onLoadCartNumbers();
displayCart();


