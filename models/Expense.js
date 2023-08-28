const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  participants: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, share: Number }],
});

module.exports = mongoose.model('Expense', expenseSchema);
