// router.js

const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/users', controller.getUsers);
router.post('/createuser', controller.addUser);
router.post('/updateuser', controller.updateUser);
router.post('/deleteuser', controller.deleteUser);

router.get('/getbilldata', controller.getBilldata);
router.post('/addbilldata', controller.addBillData);
router.get('/calculatebilldata', controller.calculateBill);

router.get('/getpay', controller.getPay);
router.post('/addpay', controller.addPay);
router.post('/deletepay', controller.deletePay);

module.exports = router;
