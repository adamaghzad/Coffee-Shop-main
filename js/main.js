let navBar = document.querySelector('.nav-bar')

document.querySelector('#menu-btn').onclick = () => {
  navBar.classList.toggle('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form')

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  navBar.classList.remove('active');
  cartItem.classList.remove('active');
  
}

let cartItem = document.querySelector('.cart-items-container')

document.querySelector('#cart-btn').onclick = () => {
  cartItem.classList.toggle('active');
  navBar.classList.remove('active');
  searchForm.classList.remove('active');
}

let logoutBtn = document.querySelector('#logout-btn')

document.querySelector('#logout-btn').onclick = () => {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = 'login.html';
  }
}

window.onscroll = () => {
  navBar.classList.remove('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
  cart = [];
  updateCart();
}

// Cart functionality
let cart = [];

function updateCart() {
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total-amount');
  
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    
    cartItems.innerHTML += `
      <div class="cart-item">
        <span class="fas fa-times" onclick="removeFromCart(${index})"></span>
        <img src="./img/menu-${index + 1}.png" alt="${item.name}" />
        <div class="content">
          <h3>${item.name}</h3>
          <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
          <div class="quantity">Qty: ${item.quantity}</div>
        </div>
      </div>
    `;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function addToCart(name, price, quantity) {
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Quantity controls
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const input = e.target.parentElement.querySelector('.quantity-input');
      if (e.target.classList.contains('plus')) {
        input.value = Math.min(99, parseInt(input.value) + 1);
      } else {
        input.value = Math.max(1, parseInt(input.value) - 1);
      }
    });
  });

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const quantity = parseInt(btn.parentElement.querySelector('.quantity-input').value);
      addToCart(name, price, quantity);
    });
  });
});

// Add this function to handle the checkout process
function checkout() {
  const modal = document.getElementById('checkout-modal');
  const closeBtn = document.querySelector('.close-btn');
  const checkoutForm = document.getElementById('checkout-form');

  // Display the modal
  modal.style.display = 'block';

  // Close the modal when the user clicks on the close button
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  // Handle form submission
  checkoutForm.onsubmit = (e) => {
    e.preventDefault();
    alert('Order confirmed! Thank you for your purchase.');
    modal.style.display = 'none';
    // Clear the cart after confirming the order
    cart = [];
    updateCart();
  };

  // Close the modal when the user clicks anywhere outside of the modal
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

// Add event listener for the checkout button
document.querySelector('.btn.checkout').onclick = (e) => {
  e.preventDefault();
  checkout();
};

// Add event listener for checkout button
document.querySelector('.checkout').addEventListener('click', (e) => {
  e.preventDefault();
  const dialog = document.getElementById('checkout-dialog');
  const dialogCartItems = document.getElementById('dialog-cart-items');
  const dialogTotal = document.getElementById('dialog-total-amount');
  
  // Populate cart items in dialog
  dialogCartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    total += item.price * item.quantity;
    dialogCartItems.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    `;
  });
  
  dialogTotal.textContent = `$${total.toFixed(2)}`;
  dialog.showModal();
  
  // Handle dialog close
  const cancelBtn = dialog.querySelector('.cancel');
  cancelBtn.onclick = () => dialog.close();
  
  // Handle form submission
  const form = dialog.querySelector('form');
  form.onsubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    cart = [];
    updateCart();
    dialog.close();
  };
});
