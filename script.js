// Order History Storage System
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};

function saveOrderToHistory(orderData) {
  const now = new Date();
  const monthYear = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  
  if (!orderHistory[monthYear]) {
    orderHistory[monthYear] = [];
  }
  
  orderHistory[monthYear].push(orderData);
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

function displayOrderHistory() {
  const historyContainer = document.getElementById('orderHistoryContainer');
  if (!historyContainer) return;
  
  historyContainer.innerHTML = '';
  
  const months = Object.keys(orderHistory).sort().reverse();
  
  if (months.length === 0) {
    historyContainer.innerHTML = '<p>No order history available</p>';
    return;
  }
  
  months.forEach(month => {
    const [year, monthNum] = month.split('-');
    const monthName = new Date(year, monthNum - 1).toLocaleString('default', { month: 'long' });
    const monthTotal = orderHistory[month].reduce((sum, order) => sum + parseFloat(order.total), 0);
    
    const monthSection = document.createElement('div');
    monthSection.className = 'month-section';
    monthSection.innerHTML = `
      <h3>${monthName} ${year} (Total: ₹${monthTotal.toFixed(2)})</h3>
      <div class="month-orders" id="orders-${month}"></div>
    `;
    
    historyContainer.appendChild(monthSection);
    
    const ordersContainer = document.getElementById(`orders-${month}`);
    orderHistory[month].forEach((order, index) => {
      const orderDate = new Date(order.date);
      const orderElement = document.createElement('div');
      orderElement.className = 'order-history-item';
      orderElement.innerHTML = `
        <div class="order-header">
          <span>${orderDate.toLocaleString('en-IN')}</span>
          <span>₹${order.total}</span>
          <span>${order.paymentMethod}</span>
          <span>${order.customerName}</span>
        </div>
        <div class="order-details" id="details-${month}-${index}" style="display:none;">
          ${order.items.map(item => `
            <div class="order-item-detail">
              <span>${item.name}${item.portion ? ` (${item.portion})` : ''}</span>
              <span>${item.quantity} × ₹${item.price} = ₹${item.itemTotal}</span>
            </div>
          `).join('')}
        </div>
      `;
      
      orderElement.querySelector('.order-header').addEventListener('click', () => {
        const details = document.getElementById(`details-${month}-${index}`);
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
      });
      
      ordersContainer.appendChild(orderElement);
    });
  });
}

function clearOrderHistory() {
  if (confirm('Are you sure you want to clear all order history? This cannot be undone.')) {
    localStorage.removeItem('orderHistory');
    orderHistory = {};
    displayOrderHistory();
  }
}

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

function removeOrderItem(button) {
  const container = document.getElementById('orderItemsContainer');
  if (container.children.length > 1) {
    button.parentElement.remove();
  } else {
    // If it's the last item, just clear the inputs
    const item = button.parentElement;
    const itemSelect = item.querySelector('.item-select');
    if (itemSelect) itemSelect.selectedIndex = 0;
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

    // Initialize order history display
    displayOrderHistory();
    
    // Setup history control buttons
    document.getElementById('refreshHistory')?.addEventListener('click', displayOrderHistory);
    document.getElementById('clearHistory')?.addEventListener('click', clearOrderHistory);
    
    // Generate Invoice
    document.getElementById('generateInvoice').addEventListener('click', function() {
      const invoiceItems = document.getElementById('invoiceItems');
      invoiceItems.innerHTML = '';
      
      let total = 0;
      let hasItems = false;
      
      // Process all order items
      document.querySelectorAll('.order-item').forEach(item => {
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

        // Save the order to history
        const orderData = {
          date: now.toISOString(),
          customerName: customerName || 'Not provided',
          customerPhone: customerPhone || 'Not provided',
          items: [],
          total: total.toFixed(2),
          paymentMethod: paymentMethod
        };
        
        // Collect all items
        document.querySelectorAll('.order-item').forEach(item => {
          const itemSelect = item.querySelector('.item-select');
          const itemData = JSON.parse(itemSelect.value || '{}');
          const portion = item.querySelector('.portion-select')?.value;
          const price = parseFloat(item.querySelector('.price-input').value) || 0;
          const qty = parseInt(item.querySelector('.qty-input').value) || 0;
          
          if (itemData.name && price > 0 && qty > 0) {
            orderData.items.push({
              name: itemData.name,
              portion: portion,
              price: price,
              quantity: qty,
              itemTotal: (price * qty).toFixed(2)
            });
          }
        });
        
        saveOrderToHistory(orderData);
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
