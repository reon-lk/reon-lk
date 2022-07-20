const express = require('express')
const UserController = require('../../app/controllers/User')
const router = express.Router();

router.post('/', UserController.create);
router.get('/:email', UserController.findOne);

module.exports = router