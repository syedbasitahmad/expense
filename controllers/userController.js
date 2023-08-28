const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = new User({ firstName, lastName });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// ...

exports.calculateBalances = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('expenses');
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      let owedAmount = 0;
      let owesAmount = 0;
  
      // Calculate how much the user is owed and owes to others
      user.expenses.forEach((expense) => {
        expense.participants.forEach((participant) => {
          if (participant.user.toString() === userId) {
            owedAmount += (participant.share - (expense.amount / expense.participants.length));
          } else {
            owesAmount += (expense.amount / expense.participants.length - participant.share);
          }
        });
      });
  
      res.json({ owed: owedAmount, owes: owesAmount });
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate balances' });
    }
  };
  
  // ...
  