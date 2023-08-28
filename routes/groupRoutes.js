const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/', groupController.createGroup);
router.get('/', groupController.getGroups);
router.post('/:groupId/add-member', groupController.addMemberToGroup);

module.exports = router;
