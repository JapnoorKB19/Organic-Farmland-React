const express = require('express');
const { getAllConsumers, getMyOrders } = require('../controllers/consumerController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', getAllConsumers); // for farmers or admin
router.get('/my-orders', auth(), getMyOrders);

module.exports = router;
