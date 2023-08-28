const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/', expenseController.createExpense);

// Implement other routes for expense-related actions

module.exports = router;
