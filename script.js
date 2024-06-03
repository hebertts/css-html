document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const cartPopup = document.getElementById('cart-popup');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    const productPrices = {
        'BOLO DE ROLO': 4.50,
        'SONHO': 10.50,
        'CHEESECAKE MORANGO': 11.00
    };
    
    const pedirButtons = document.querySelectorAll('.pedir');
    
    pedirButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.info').querySelector('h3').innerText;
            showPopup(item);
        });
    });
    
    function showPopup(item) {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        
        popup.innerHTML = `
            <div class="popup-content">
                <span class="close-btn">&times;</span>
                <h3>Adicionar ${item} ao carrinho</h3>
                <label for="quantity">Quantidade:</label>
                <input type="number" id="quantity" name="quantity" min="1" value="1">
                <button class="add-to-cart">Adicionar</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        const closeBtn = popup.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(popup);
        });
        
        const addToCartButton = popup.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            const quantity = parseInt(popup.querySelector('#quantity').value);
            if (isNaN(quantity) || quantity < 1) {
                alert('Por favor, insira uma quantidade válida.');
                return;
            }
            const price = productPrices[item];
            cart.push({ item, quantity, price });
            updateCartCount();
            updateCartItems();
            document.body.removeChild(popup);
        });
    }

    function updateCartCount() {
        const totalItems = cart.reduce((total, currentItem) => total + currentItem.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function updateCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear the current items
        let totalPrice = 0;

        cart.forEach((cartItem, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <span>${cartItem.item} - Quantidade: ${cartItem.quantity}</span>
                <span>R$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">&times;</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += cartItem.price * cartItem.quantity;
        });

        cartTotalContainer.innerText = `Total: R$${totalPrice.toFixed(2)}`;

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                cart.splice(index, 1);
                updateCartItems();
                updateCartCount();
            });
        });
    }

    cartIcon.addEventListener('click', () => {
        cartPopup.classList.toggle('hidden');
    });

    const popupCloseBtn = cartPopup.querySelector('.close-btn');
    popupCloseBtn.addEventListener('click', () => {
        cartPopup.classList.add('hidden');
    });
});
