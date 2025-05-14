const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/group', groupController.createGroup);
router.get('/groups', groupController.getAllGroups);
router.put('/group/:group_ID', groupController.updateGroup);
router.delete('/group/:group_ID', groupController.deleteGroup);

module.exports = router;
