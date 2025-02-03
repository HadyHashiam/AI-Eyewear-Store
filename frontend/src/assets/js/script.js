







document.addEventListener("DOMContentLoaded", function () {
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach(button => {
    button.addEventListener("click", async function () {
      const productId = button.getAttribute("data-product-id");
      try {
        const response = await fetch(`/cart/${productId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Remove the product row from the modal
          button.parentNode.remove();
        } else {
          console.error("Error removing item from cart:", response.status);
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    });
  });
});





document.addEventListener("DOMContentLoaded", function () {
  const removeButtons = document.querySelectorAll(".remove-from-favorites");

  removeButtons.forEach(button => {
    button.addEventListener("click", async function () {
      const productId = button.getAttribute("data-product-id");
      try {
        const response = await fetch(`/favorites/${productId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Remove the favorite item from the list
          button.parentNode.parentNode.remove();
        } else {
          console.error("Error removing favorite item:", response.status);
        }
      } catch (error) {
        console.error("Error removing favorite item:", error);
      }
    });
  });
});



// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)') {
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
})
// end of open cart modal


// close cart modal
const closeBtn = document.querySelector('#close-btn');
closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')) {
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})
// end of close cart modal


// add products to cart
const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');
const favoritedetails = document.getElementsByClassName('favorite-item');                    //////////////////////

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('product-price')[0].innerText;
  var productTitle = cartItem.getElementsByClassName('product-title')[0].innerText;

  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  addItemToCart(price, imageSrc, productTitle);
  updateCartPrice()
}









function addproductToCart(name, price, image, _id) {
  const button = document.getElementById(`add-to-cart-${_id}`);
  const data = {
    name,
    price,
    image,
    _id,
    timestamp: Date.now()
  };

  fetch('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      if (result.status === 'success') {
        // تحديث الزر بناءً على الاستجابة
        button.style.backgroundColor = "#0000FF";
        button.innerHTML = "Added";
        button.disabled = true;
      } else if (result.redirect) {
        window.location.href = result.redirect;
      }
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
    });
}















// update quantity input
var quantityInput = document.getElementsByClassName('product-quantity');

for (var i = 0; i < quantityInput.length; i++) { // تحديث حلقة الإضافة للأحداث
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartPrice()
}
// end of update quantity input


// update total price
function updateCartPrice() {                                                                                                   // ****************************************
  var total = 0
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value
    total = total + (price * quantity)

  }
  document.getElementsByClassName('total-price')[0].innerText = '$' + total

  document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
}
// end of update total price



// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked() {
  alert('Thank you for your purchase');
  cartModalOverlay.style.transform = 'translateX(-100%)'
  var cartItems = document.getElementsByClassName('product-rows')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)

  }
  updateCartPrice()
}

// end of purchase items





// Select the view button for all products
const viewButtons = document.querySelectorAll('.view-button');


// Add event listener to each view button
viewButtons.forEach(button => {                                                                                                // ****************************************
  button.addEventListener('click', function () {
    // Get the product details from the clicked product card
    const productTitle = this.closest('.card').querySelector('.product-title').textContent;
    const productImage = this.closest('.card').querySelector('.product-image').src;
    const productPrice = this.closest('.card').querySelector('.product-price').textContent;

    // Create product details HTML
    const productDetailsHTML = `
      <h2>${productTitle}</h2>
      <img src="${productImage}" alt="${productTitle}">
      <p>Price: ${productPrice}</p>
    `;

    // Display the product details in the modal
    document.getElementById('productDetailsContent').innerHTML = productDetailsHTML;

    // Show the modal
    document.getElementById('productDetailsModal').style.display = 'block';
  });
});

// Close the modal when the close button is clicked
document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('productDetailsModal').style.display = 'none';
});





document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById('searchInput');
  const products = document.getElementById('products');
  const allProducts = document.querySelectorAll('.card'); // Select all product cards

  // Add event listener for input event on search input
  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Filter products based on search term
    allProducts.forEach(product => {
      const productTitle = product.querySelector('.product-title').textContent.toLowerCase();
      if (productTitle.includes(searchTerm)) {
        product.style.display = 'block'; // Show matching products
      } else {
        product.style.display = 'none'; // Hide non-matching products
      }
    });

    // If search input is empty, display all products
    if (searchTerm === '') {
      allProducts.forEach(product => {
        product.style.display = 'block';
      });
    }
  });
});




window.addE


// Params
let mainSliderSelector = '.main-slider',
  navSliderSelector = '.nav-slider',
  interleaveOffset = 0.5;

// Main Slider
let mainSliderOptions = {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000
  },
  loopAdditionalSlides: 10,
  grabCursor: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function () {
      this.autoplay.stop();
    },
    imagesReady: function () {
      this.el.classList.remove('loading');
      this.autoplay.start();
    },
    slideChangeTransitionEnd: function () {
      let swiper = this,
        captions = swiper.el.querySelectorAll('.caption');
      for (let i = 0; i < captions.length; ++i) {
        captions[i].classList.remove('show');
      }
      swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
    },
    progress: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        let slideProgress = swiper.slides[i].progress,
          innerOffset = swiper.width * interleaveOffset,
          innerTranslate = slideProgress * innerOffset;

        swiper.slides[i].querySelector(".slide-bgimg").style.transform =
          "translateX(" + innerTranslate + "px)";
      }
    },
    touchStart: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function (speed) {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slide-bgimg").style.transition =
          speed + "ms";
      }
    }
  }
};
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

// Navigation Slider
let navSliderOptions = {
  loop: true,
  loopAdditionalSlides: 10,
  speed: 1000,
  spaceBetween: 5,
  slidesPerView: 5,
  centeredSlides: true,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  direction: 'vertical',
  on: {
    imagesReady: function () {
      this.el.classList.remove('loading');
    },
    click: function () {
      mainSlider.autoplay.stop();
    }
  }
};
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;




document.addEventListener("DOMContentLoaded", function () {                                                           // ****************************************
  const favoritesIcon = document.getElementById('favoritesIcon');
  const favoritesContainer = document.querySelector('.favorites-container');
  const favoritesList = document.getElementById('favoritesList');

  // Function to add a product to favorites
  function addToFavorites(productTitle, productImage, productPrice) {
    // Check if the product already exists in favorites
    const existingItem = Array.from(favoritesList.querySelectorAll('.favorite-item')).find(item => {
      return item.querySelector('h4').textContent === productTitle;
    });
    // If the product does not exist, add it to favorites
    if (!existingItem) {
      const listItem = document.createElement('li');
      listItem.classList.add('favorite-item');
      listItem.innerHTML = `
        <div class="favorite-item">
                <img src="${productImage}" alt="${productTitle}">
                <div class="favorite-details">
                    <h4>${productTitle}</h4>
                    <span>${productPrice}</span>
                    <button class="remove-from-favorites">Remove</button>
                </div>
            </div>
        `;


      favoritesList.appendChild(listItem);
      // Attach event listener to the remove button
      const removeButton = listItem.querySelector('.remove-from-favorites');
      removeButton.addEventListener('click', function () {
        listItem.remove(); // Remove the item from the favorites list
        updateLocalStorage(); // Update local storage after removal
      });
      updateLocalStorage(); // Update local storage after addition
    }

  }



  // Function to update local storage with current favorites list
  function updateLocalStorage() {                                                                                                                  // ****************************************
    const favoritesItems = Array.from(favoritesList.querySelectorAll('.favorite-item')).map(item => {
      return {
        title: item.querySelector('h4').textContent,
        image: item.querySelector('img').src,
        price: item.querySelector('span').textContent
      };
    });
    localStorage.setItem('favorites', JSON.stringify(favoritesItems));
  }

  // Load favorites from local storage when the page loads 
  function loadFavoritesFromLocalStorage() {                                                                              // ****************************************

  }

  loadFavoritesFromLocalStorage(); // Load favorites from local storage                                                                           // ****************************************

  favoritesIcon.addEventListener('click', function () {                                                                                  // ****************************************
    // Toggle the visibility of the favorites container
    if (favoritesContainer.style.display === 'none') {
      favoritesContainer.style.display = 'block';
    } else {
      favoritesContainer.style.display = 'none';
    }
  });

  // Add event listeners to "Add to Favorites" buttons for each product
  const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites');                                                      // ****************************************
  addToFavoritesButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productCard = this.closest('.card');
      const productTitle = productCard.querySelector('.product-title').textContent;
      const productImage = productCard.querySelector('.product-image').src;
      const productPrice = productCard.querySelector('.product-price').textContent;
      addToFavorites(productTitle, productImage, productPrice);
    });
  });

  // Clear favorites list when the page is about to unload
  window.addEventListener('beforeunload', function () {
    favoritesList.innerHTML = ''; // Clear favorites list in the DOM
  });
});




// function addproductToFav(name, price, image, _id) {
//                   const data = {
//                     name: name,
//                     price: price,
//                     image: image,
//                     _id: _id,
//                     timestamp: Date.now()
//                   };
//                   fetch('/favorites', {
//                     method: 'POST',
//                     headers: {
//                       'Content-Type': 'application/json' // Set the content type to JSON
//                     },
//                     body: JSON.stringify(data) // Convert data to JSON string and include it in the body
//                   })
//                     .then(response => {
//                       console.log('Item added to favorites successfully');
//                     })
//                     .catch(error => {
//                       console.error('Error adding item to favorites:', error);
//                     });
//                 }




function toggleFavorite(name, price, image, _id) {
  const data = {
    name,
    price,
    image,
    _id,
    timestamp: Date.now()

  };
  const heartIcon = document.getElementById('heartIcon-' + _id);
  if (heartIcon.classList.contains('favorite')) {
    fetch('/favorites/' + _id, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.redirected && response.url.includes('/login')) {
          window.location.href = response.url;
        } else if (response.ok) {
          console.log('Item removed from favorites successfully');
          heartIcon.style.color = '#8a8a8a';
          heartIcon.classList.remove('favorite');
          heartIcon.classList.add('not-favorite');
        } else {
          console.error('Failed to remove item from favorites:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error removing item from favorites:', error);
      });
  } else {
    fetch('/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.redirected && response.url.includes('/login')) {
          window.location.href = response.url;
        } else if (response.ok) {
          console.log('Item added to favorites successfully');
          heartIcon.style.color = '#ff0000';
          heartIcon.classList.remove('not-favorite');
          heartIcon.classList.add('favorite');
        } else {
          console.error('Failed to add item to favorites:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error adding item to favorites:', error);
      });
  }
}




// function toggleFavorite(productId, isFavorite) {
//     const data = {
//         productId: productId
//     };

//     const url = isFavorite === 'true' ? '/favorites/' + productId : '/favorites';

//     fetch(url, {
//         method: isFavorite === 'true' ? 'DELETE' : 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Toggle favorite successfully');
//             const heartIcon = document.getElementById('heartIcon-' + productId);
//             if (heartIcon) {
//                 heartIcon.classList.toggle('favorite');
//             }
//         } else {
//             console.error('Failed to toggle favorite:', response.statusText);
//         }
//     })
//     .catch(error => {
//         console.error('Error toggling favorite:', error);
//     });
// }

// function addproductToFav(name, price, image, _id) {
//     const data = {
//         name: name,
//         price: price,
//         image: image,
//         _id: _id,
//         timestamp: Date.now()
//     };
//     fetch('/favorites', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Set the content type to JSON
//         },
//         body: JSON.stringify(data) // Convert data to JSON string and include it in the body
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Item added to favorites successfully');
//             // Change the color of the heart button to red
//             const heartIcon = document.getElementById('heartIcon-' + _id);
//             if (heartIcon) {
//                 heartIcon.style.color = '#ff0000';
//             }
//         } else {
//             console.error('Failed to add item to favorites:', response.statusText);
//         }
//     })
//     .catch(error => {
//         console.error('Error adding item to favorites:', error);
//     });
// }


