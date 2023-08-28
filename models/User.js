const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
});

module.exports = mongoose.model('User', userSchema);
