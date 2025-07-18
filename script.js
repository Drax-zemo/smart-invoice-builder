    // Add new order item
    function addOrderItem() {
      const container = document.getElementById('orderItemsContainer');
      const newItem = document.createElement('div');
      newItem.className = 'order-item';
      newItem.innerHTML = `
        <input type="text" class="item-name" placeholder="Item name">
        <input type="number" class="price-input" placeholder="Price" min="0">
        <input type="number" class="qty-input" placeholder="Qty" min="1" value="1">
        <button class="remove-item-btn" onclick="removeOrderItem(this)"><i class="fas fa-times"></i></button>
      `;
      container.appendChild(newItem);
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
      // Generate Invoice
      document.getElementById('generateInvoice').addEventListener('click', function() {
        const invoiceItems = document.getElementById('invoiceItems');
        invoiceItems.innerHTML = '';
        
        let total = 0;
        let hasItems = false;
        
        // Process all order items
        document.querySelectorAll('.order-item').forEach(item => {
          const itemName = item.querySelector('.item-name').value;
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
        firstItem.querySelector('.item-name').value = '';
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
