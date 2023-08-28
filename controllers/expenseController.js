const Expense = require('../models/Expense');
const User = require('../models/User');

exports.createExpense = async (req, res) => {
  try {
    const { description, amount, participants } = req.body;
    const expense = new Expense({ description, amount, participants });
    await expense.save();

    // Update user expenses
    for (const participant of participants) {
      const user = await User.findById(participant.user);
      if (user) {
        user.expenses.push(expense);
        await user.save();
      }
    }

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

// Implement other controllers for expense-related actions
