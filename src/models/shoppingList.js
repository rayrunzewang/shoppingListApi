const mongoose = require('mongoose');

const shoppingItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const shoppingListSchema = new mongoose.Schema({
  items: {
    type: [shoppingItemSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ShoppingItem = mongoose.model('ShoppingItem', shoppingItemSchema);
const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports = { ShoppingItem, ShoppingList};
