window.onload = () => {
  // Initialize first item
  const firstSelect = document.querySelector('.item-select');
  if (firstSelect) populateMenuSelect(firstSelect);
};



let menuItems = [
  { "name": "Extra Cheese", "category": "Add-ons", "price": 20 },

  { "name": "Shahi Paneer", "category": "Main Course", "price_half": 120, "price_full": 200 },
  { "name": "Kadhai Paneer", "category": "Main Course", "price_half": 120, "price_full": 210 },
  { "name": "Butter Paneer Masala", "category": "Main Course", "price_half": 120, "price_full": 210 },
  { "name": "Dal Makhni", "category": "Main Course", "price_half": 70, "price_full": 140 },
  { "name": "Aloo Jeera", "category": "Main Course", "price_half": 50, "price_full": 90 },
  { "name": "Dal Fry", "category": "Main Course", "price_half": 60, "price_full": 110 },
  { "name": "Chola Bhatura", "category": "Main Course", "price_half": 35, "price_full": 60 },
  { "name": "Chola Puri", "category": "Main Course", "price_half": 20, "price_full": 35 },

  { "name": "Tawa Roti", "category": "Roti", "price": 8 },
  { "name": "Butter Tawa Roti", "category": "Roti", "price": 12 },
  { "name": "Tandoori Roti", "category": "Roti", "price": 8 },
  { "name": "Butter Tandoori Roti", "category": "Roti", "price": 12 },

  { "name": "Aloo Paratha", "category": "Paratha", "price": 40 },
  { "name": "Pyaz Paratha", "category": "Paratha", "price": 50 },
  { "name": "Paneer Paratha", "category": "Paratha", "price": 70 },

  { "name": "Normal Thali", "category": "Thali", "description": "Dal, Plain Rice, Sabji, 4 Roti, Sweet, Salad, Raita", "price": 120 },
  { "name": "Deluxe Thali", "category": "Thali", "description": "Paneer, Jeera Rice, Sabji, 4 Roti, Sweet, Salad, Raita", "price": 180 },

  { "name": "Veg Steam Momo", "category": "Momo", "price_half": 35, "price_full": 65 },
  { "name": "Paneer Steam Momo", "category": "Momo", "price_half": 50, "price_full": 80 },
  { "name": "Fry Veg Momo", "category": "Momo", "price_half": 45, "price_full": 75 },
  { "name": "Fry Paneer Momo", "category": "Momo", "price_half": 60, "price_full": 90 },
  { "name": "Veg Kurkure Momo", "category": "Momo", "price_half": 60, "price_full": 100 },

  { "name": "Spring Roll", "category": "Spring Roll", "price_half": 50, "price_full": 90 },
  { "name": "Kurkure Spring Roll", "category": "Spring Roll", "price_half": 60, "price_full": 120 },

  { "name": "Arrabiata (Red Sauce)", "category": "Pasta", "price": 100 },
  { "name": "Alfredo (White Sauce)", "category": "Pasta", "price": 120 },

  { "name": "Veggie Noodles", "category": "Noodles", "price_half": 50, "price_full": 100 },
  { "name": "Paneer Noodles", "category": "Noodles", "price_half": 70, "price_full": 140 },
  { "name": "Schezwan Veggie Noodles", "category": "Noodles", "price_half": 60, "price_full": 120 },

  { "name": "Shikanji Soda", "category": "Mocktails", "price": 50 },
  { "name": "Mint Mojito", "category": "Mocktails", "price": 70 },
  { "name": "Masala Mojito", "category": "Mocktails", "price": 70 },
  { "name": "Blue Haven", "category": "Mocktails", "price": 70 },
  { "name": "Green Apple", "category": "Mocktails", "price": 70 },
  { "name": "Watermelon", "category": "Mocktails", "price": 70 },
  { "name": "Strawberry", "category": "Mocktails", "price": 70 },
  { "name": "Blueberry", "category": "Mocktails", "price": 70 },

  { "name": "Vanilla", "category": "Ice Cream", "price": 50 },
  { "name": "Butterscotch", "category": "Ice Cream", "price": 50 },
  { "name": "Strawberry", "category": "Ice Cream", "price": 50 },
  { "name": "Raj Bhog", "category": "Ice Cream", "price": 60 },
  { "name": "Chocolate", "category": "Ice Cream", "price": 60 },
  { "name": "Mix Flavour (4 Scoops)", "category": "Ice Cream", "price": 70 },

  { "name": "Cold Drink with Ice", "category": "Soft Drink", "price": 30 },
  { "name": "HELL Energy Drink with Ice", "category": "Soft Drink", "price": 80 },
  { "name": "Red Bull with Ice", "category": "Soft Drink", "price": 150 },

  { "name": "Veggie Fried Rice", "category": "Fried Rice", "price_half": 50, "price_full": 100 },
  { "name": "Paneer Fried Rice", "category": "Fried Rice", "price_half": 60, "price_full": 120 },

  { "name": "Chilli Potato", "category": "Chilli", "price_half": 50 },

  { "name": "Honey Chilli Potato", "category": "Chilli", "price_half": 60, "price_full": 110 },
  { "name": "Chilli Manchurian", "category": "Chilli", "price_half": 70, "price_full": 110 },
  { "name": "Chilli Paneer", "category": "Chilli", "price_half": 80, "price_full": 150 },

  { "name": "Classic Salt Fries", "category": "French Fries", "price": 40 },
  { "name": "Peri-Peri Fries", "category": "French Fries", "price": 60 },
  { "name": "Loaded Fries", "category": "French Fries", "price": 80 },

  { "name": "Plain Maggi", "category": "Maggi", "price": 40 },
  { "name": "Veggie Maggi", "category": "Maggi", "price": 60 },
  { "name": "Cheese Corn Maggi", "category": "Maggi", "price": 60 },
  { "name": "Veggie Butter Maggi", "category": "Maggi", "price": 70 },

  { "name": "Red Velvet", "category": "Pastry", "price": 50 },
  { "name": "Black Forest", "category": "Pastry", "price": 35 },
  { "name": "Pineapple", "category": "Pastry", "price": 30 },
  { "name": "Butterscotch", "category": "Pastry", "price": 35 },

  { "name": "Veggie Fresh Pizza", "category": "Pizza", "price": 120 },
  { "name": "Margherita Special Pizza", "category": "Pizza", "price": 120 },
  { "name": "Paneer Cheese Pizza", "category": "Pizza", "price": 140 },
  { "name": "Corn Pizza", "category": "Pizza", "price": 120 },
  { "name": "Tandoori Paneer Pizza", "category": "Pizza", "price": 160 },
  { "name": "Farmhouse Pizza", "category": "Pizza", "price": 200 },
  { "name": "Garlic Bread", "category": "Pizza", "price": 100 },
  { "name": "Paneer Burger Pizza", "category": "Pizza", "price": 80 },
  { "name": "Pineapple Pizza", "category": "Pizza", "price": 130 },
  { "name": "Masala Pizza", "category": "Pizza", "price": 120 },

  { "name": "Veg Burger", "category": "Burger", "price": 50 },
  { "name": "Paneer Burger", "category": "Burger", "price": 90 },
  { "name": "Vada Pav", "category": "Burger", "price": 40 },
  { "name": "Special Vada Pav", "category": "Burger", "price": 50 },

  { "name": "Veg Grill Sandwich (2 pcs)", "category": "Sandwich", "price": 50 },
  { "name": "Veg Grill Sandwich (4 pcs)", "category": "Sandwich", "price": 90 },
  { "name": "Paneer Grilled Sandwich (2 pcs)", "category": "Sandwich", "price": 80 },
  { "name": "Paneer Grilled Sandwich (4 pcs)", "category": "Sandwich", "price": 120 },

  { "name": "Black Coffee", "category": "Hot & Cold Coffee", "price": 30 },
  { "name": "Hot Coffee", "category": "Hot & Cold Coffee", "price": 35 },
  { "name": "Cappuccino", "category": "Hot & Cold Coffee", "price": 50 },
  { "name": "Espresso", "category": "Hot & Cold Coffee", "price": 50 },
  { "name": "Hot Chocolate", "category": "Hot & Cold Coffee", "price": 70 },
  { "name": "Hazelnut Cappuccino", "category": "Hot & Cold Coffee", "price": 90 },

  { "name": "Kulhad Chai", "category": "Chai", "price": 20 },
  { "name": "Masala Chai", "category": "Chai", "price": 25 },
  { "name": "Lemon Tea", "category": "Chai", "price": 25 },
  { "name": "Special Tea (Malai)", "category": "Chai", "price": 30 },

  { "name": "Cold Coffee", "category": "Cold Drinks & Shakes", "price": 50 },
  { "name": "Hazelnut Cold Coffee", "category": "Cold Drinks & Shakes", "price": 80 },
  { "name": "Mango Shake", "category": "Cold Drinks & Shakes", "price": 100 },
  { "name": "Strawberry Shake", "category": "Cold Drinks & Shakes", "price": 70 },
  { "name": "Oreo Shake", "category": "Cold Drinks & Shakes", "price": 70 },
  { "name": "Chocolate Shake", "category": "Cold Drinks & Shakes", "price": 80 },
  { "name": "Butterscotch Shake", "category": "Cold Drinks & Shakes", "price": 80 },
  { "name": "KitKat Milkshake", "category": "Cold Drinks & Shakes", "price": 80 },
  { "name": "Vanilla Milkshake", "category": "Cold Drinks & Shakes", "price": 90 },
  { "name": "Mango Lassi", "category": "Cold Drinks & Shakes", "price": 70 },
  { "name": "Strawberry Lassi", "category": "Cold Drinks & Shakes", "price": 70 },
  { "name": "Sweet Lassi", "category": "Cold Drinks & Shakes", "price": 70 },

  { "name": "Paneer Tikka Wrap", "category": "Wrap", "price": 120 },
  { "name": "Veggie Wrap", "category": "Wrap", "price": 100 },
  { "name": "Simply Veg Wrap", "category": "Wrap", "price": 80 },

  { "name": "French Fries + Hot Coffee", "category": "Combo Offers", "price": 70 },
  { "name": "Veg Burger + French Fries + Cold Drink", "category": "Combo Offers", "price": 110 },
  { "name": "Veg Burger + Cold Drink", "category": "Combo Offers", "price": 75 },
  { "name": "Veg Burger + French Fries + Cold Coffee", "category": "Combo Offers", "price": 160 },
  { "name": "Veg Burger + Onion Pizza + Cold Drink", "category": "Combo Offers", "price": 200 },
  { "name": "Fried Rice + Chilli Paneer", "category": "Combo Offers", "price": 120 },
  { "name": "Veg Manchurian + Paneer Noodle", "category": "Combo Offers", "price": 120 },
  { "name": "Veg Pizza + Cold Drink", "category": "Combo Offers", "price": 160 },
  { "name": "Margherita Pizza + Onion Pizza + Corn Pizza", "category": "Combo Offers", "price": 300 },
  { "name": "Veg Pizza + Cold Coffee", "category": "Combo Offers", "price": 180 },
  { "name": "2 Pyaz Paratha + 2 Chai", "category": "Combo Offers", "price": 140 },
  { "name": "2 Aloo Paratha + 2 Chai", "category": "Combo Offers", "price": 120 },
  { "name": "2 Slice Veg Sandwich + French Fries", "category": "Combo Offers", "price": 80 }
]
