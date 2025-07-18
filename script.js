    // Add new order item
    // function addOrderItem() {
    //   const container = document.getElementById('orderItemsContainer');
    //   const newItem = document.createElement('div');
    //   newItem.className = 'order-item';
    //   newItem.innerHTML = `
    //     <input type="text" class="item-name" placeholder="Item name">
    //     <input type="number" class="price-input" placeholder="Price" min="0">
    //     <input type="number" class="qty-input" placeholder="Qty" min="1" value="1">
    //     <button class="remove-item-btn" onclick="removeOrderItem(this)"><i class="fas fa-times"></i></button>
    //   `;
    //   container.appendChild(newItem);
    // }



//     function addOrderItem() {
//   const container = document.getElementById("orderItemsContainer");

//   const div = document.createElement("div");
//   div.className = "order-item";

//   div.innerHTML = `
//     <select class="item-select" style="width: 300px; height: 50px;" onchange="updatePrice(this)">
//       <option value="">Select Item</option>
//     </select>
//     <input type="number" class="price-input" placeholder="Price" min="0" readonly>
//     <input type="number" class="qty-input" placeholder="Qty" min="1" value="1">
//     <button class="remove-item-btn" onclick="removeOrderItem(this)">
//       <i class="fas fa-times"></i>
//     </button>
//   `;

//   container.appendChild(div);

//   const select = div.querySelector('.item-select');
//   populateMenuSelect(select);
// }

function addOrderItem() {
  const container = document.getElementById("orderItemsContainer");

  const div = document.createElement("div");
  div.className = "order-item";

  div.innerHTML = `
    <select class="item-select" style="width: 250px; height: 40px;" onchange="handleItemSelect(this)">
      <option value="">Select Item</option>
    </select>

    <select class="portion-select" style="width: 120px; height: 40px; display: none;" onchange="updatePrice(this)">
      <option value="half">Half</option>
      <option value="full">Full</option>
    </select>

    <input type="number" class="price-input" placeholder="Price" min="0" readonly style="width: 80px;">
    <input type="number" class="qty-input" placeholder="Qty" min="1" value="1" style="width: 60px;">
    <button class="remove-item-btn" onclick="removeOrderItem(this)">
      <i class="fas fa-times"></i>
    </button>
  `;

  container.appendChild(div);

  const select = div.querySelector('.item-select');
  populateMenuSelect(select);
}


    
    // Remove order item
    function removeOrderItem(button) {
      const container = document.getElementById('orderItemsContainer');
      if (container.children.length > 1) {
        button.parentElement.remove();
      } else {
        // If it's the last item, just clear the inputs
        const item = button.parentElement;
        item.querySelector('.item-name').value = '';
        item.querySelector('.price-input').value = '';
        item.querySelector('.qty-input').value = 1;
      }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const firstItemSelect = document.querySelector('.item-select');
        if (firstItemSelect) {
          populateMenuSelect(firstItemSelect);
          firstItemSelect.addEventListener('change', function () {
            handleItemSelect(this);
          });
        }

        
      // Generate Invoice
      document.getElementById('generateInvoice').addEventListener('click', function() {
        const invoiceItems = document.getElementById('invoiceItems');
        invoiceItems.innerHTML = '';
        
        let total = 0;
        let hasItems = false;
        
        // Process all order items
        document.querySelectorAll('.order-item').forEach(item => {
          // const itemSelect = item.querySelector('.item-select');
          // const itemData = JSON.parse(itemSelect.value || '{}');
          // const itemName = itemData.name || '';

          const itemSelect = item.querySelector('.item-select');
const itemData = JSON.parse(itemSelect.value || '{}');
const portion = item.querySelector('.portion-select')?.value;
const portionLabel = (itemData.price_half && portion) ? ` (${portion})` : '';
const itemName = itemData.name + portionLabel;


          const price = parseFloat(item.querySelector('.price-input').value) || 0;
          const qty = parseInt(item.querySelector('.qty-input').value) || 0;

          if (itemName && price > 0 && qty > 0) {
            hasItems = true;
            const itemTotal = price * qty;
            total += itemTotal;

            const invoiceItem = document.createElement('div');
            invoiceItem.className = 'invoice-item';
            invoiceItem.innerHTML = `
              <span>${itemName} × ${qty}</span>
              <span>₹${itemTotal.toFixed(2)}</span>
            `;
            invoiceItems.appendChild(invoiceItem);
          }
        });

        
        if (hasItems) {
          // Add customer info
          const customerName = document.getElementById('customerName').value;
          const customerPhone = document.getElementById('customerPhone').value;
          
          let customerInfo = '';
          if (customerName || customerPhone) {
            customerInfo = `
              <div class="customer-info">
                <p><strong>Customer:</strong> ${customerName || 'Not provided'}</p>
                <p><strong>Phone:</strong> ${customerPhone || 'Not provided'}</p>
              </div>
            `;
          }
          document.getElementById('customerInfo').innerHTML = customerInfo;
          
          // Get selected payment method
          const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
          document.getElementById('paymentMethod').textContent = `Payment Method: ${paymentMethod}`;
          
          document.getElementById('invoiceTotal').textContent = `Total: ₹${total.toFixed(2)}`;
          document.getElementById('invoice').style.display = 'block';
          document.getElementById('printInvoice').style.display = 'block';
          
          // Set current date
          const now = new Date();
          document.getElementById('invoiceDate').textContent = now.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        } else {
          invoiceItems.innerHTML = '<div class="no-items">No items selected</div>';
          document.getElementById('invoiceTotal').textContent = 'Total: ₹0';
          document.getElementById('paymentMethod').textContent = 'Payment Method: Cash';
          document.getElementById('invoice').style.display = 'none';
          document.getElementById('printInvoice').style.display = 'none';
        }
      });
      
      // Reset Order
      document.getElementById('resetOrder').addEventListener('click', function() {
        // Clear all order items except the first one
        const container = document.getElementById('orderItemsContainer');
        while (container.children.length > 1) {
          container.removeChild(container.lastChild);
        }
        
        // Clear the first item's inputs
      const firstItem = container.firstElementChild;
        firstItem.querySelector('.item-select').selectedIndex = 0;
        firstItem.querySelector('.price-input').value = '';
        firstItem.querySelector('.qty-input').value = 1;

        
        // Reset customer details
        document.getElementById('customerName').value = '';
        document.getElementById('customerPhone').value = '';
        
        // Reset payment method to Cash
        document.getElementById('cashPayment').checked = true;
        
        // Reset invoice display
        document.getElementById('invoiceItems').innerHTML = '<div class="no-items">No items selected</div>';
        document.getElementById('invoiceTotal').textContent = 'Total: ₹0';
        document.getElementById('paymentMethod').textContent = 'Payment Method: Cash';
        document.getElementById('invoice').style.display = 'none';
        document.getElementById('printInvoice').style.display = 'none';
        document.getElementById('customerInfo').innerHTML = '';
      });
      
      // Print Invoice
      document.getElementById('printInvoice').addEventListener('click', function() {
        window.print();
      });
    });





// function populateMenuSelect(selectElement) {
//   if (!menuItems || !Array.isArray(menuItems)) return;

//   menuItems.forEach(item => {
//     const option = document.createElement("option");
//     option.value = JSON.stringify(item); // Store full item object
//     option.textContent = `${item.name} - ₹${item.price || item.price_half || 0}`;
//     selectElement.appendChild(option);
//   });
// }
function populateMenuSelect(selectElement) {
  if (!Array.isArray(menuItems)) return;

  const grouped = {};

  // Group items by category
  menuItems.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });

  // Create optgroups
  for (const category in grouped) {
    const group = document.createElement("optgroup");
    group.label = category;

    grouped[category].forEach(item => {
      const option = document.createElement("option");
      option.value = JSON.stringify(item); // Keep full object
      option.textContent = item.name;
      group.appendChild(option);
    });

    selectElement.appendChild(group);
  }
}



// function updatePrice(selectElement) {
//   const item = JSON.parse(selectElement.value || '{}');
//   const priceInput = selectElement.parentElement.querySelector('.price-input');

//   if (item.price) {
//     priceInput.value = item.price;
//   } else if (item.price_half && item.price_full) {
//     priceInput.value = item.price_half; // default to half; you could prompt user to choose
//   } else {
//     priceInput.value = '';
//   }
// }
function updatePrice(portionSelect) {
  const parent = portionSelect.parentElement;
  const item = JSON.parse(parent.querySelector('.item-select').value || '{}');
  const priceInput = parent.querySelector('.price-input');

  if (portionSelect.value === 'half') {
    priceInput.value = item.price_half || '';
  } else if (portionSelect.value === 'full') {
    priceInput.value = item.price_full || '';
  }
}





function handleItemSelect(selectElement) {
  const item = JSON.parse(selectElement.value || '{}');
  const parent = selectElement.parentElement;
  const portionSelect = parent.querySelector('.portion-select');
  const priceInput = parent.querySelector('.price-input');

  if (item.price_half && item.price_full) {
    portionSelect.style.display = 'inline-block';
    portionSelect.value = 'half'; // Default to half
    priceInput.value = item.price_half;
  } else {
    portionSelect.style.display = 'none';
    priceInput.value = item.price || '';
  }
}
