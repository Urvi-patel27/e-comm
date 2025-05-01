// Navbar toggle functionality
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Wait for DOM to load before executing the script
document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtn = document.querySelector(".normal");

  // Only run if we're on a product page
  if (addToCartBtn && document.querySelector(".single-pro-details")) {
    const productTitle = document.querySelector(".single-pro-details h4");
    const productPrice = document.querySelector(".single-pro-details h2");
    const productImg = document.getElementById("MainImg");
    const sizeSelect = document.querySelector("select");
    const quantityInput = document.querySelector('input[type="number"]');

    addToCartBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default button behavior

      const selectedSize = sizeSelect.value;
      const quantity = parseInt(quantityInput.value);

      if (selectedSize === "Select Size" || isNaN(quantity) || quantity <= 0) {
        alert("Please select a valid size and quantity.");
        return;
      }

      const cartItem = {
        title: productTitle.innerText,
        price: parseFloat(productPrice.innerText.replace("$", "")),
        imgSrc: productImg.src,
        size: selectedSize,
        quantity: quantity,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check for same product with same size
      const productIndex = cart.findIndex(
        (item) => item.title === cartItem.title && item.size === cartItem.size
      );

      if (productIndex > -1) {
        // Overwrite quantity instead of adding
        cart[productIndex].quantity = cartItem.quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${cartItem.title} (Size: ${cartItem.size}) added to cart!`);
    });
  }
});
