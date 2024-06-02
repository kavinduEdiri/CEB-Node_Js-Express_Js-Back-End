// controller.js

const { User1, User2 } = require('./model');

// For form
const getUsers = (req, res, next) => {
  User1.find()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error });
    });
};

const addUser = (req, res, next) => {
  const user = new User1({
    area: req.body.area,
    account: req.body.account,
    name: req.body.name,
    address: req.body.address,
  });
  user.save()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error });
    });
};

const updateUser = (req, res, next) => {
  const account = req.body.account;

  User1.updateOne({ account: account }, { $set: { name: req.body.name } })
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error });
    });
};

const deleteUser = (req, res, next) => {
  const account = req.body.account;
  User1.deleteOne({ account: account })
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error });
    });
};

// For billing
const getBilldata = (req, res, next) => {
  User2.find()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error });
    });
};

const addBillData = (req, res, next) => {
  const bill = new User2({
    newValue: req.body.newValue,
    oldValue: req.body.oldValue,
  });
  bill.save()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error });
    });
};

const calculateBill = async (req, res, next) => {
  try {
    const bills = await User2.find();
    const totalBill = bills.map(bill => ({
      ...bill._doc,
      total: bill.newValue + bill.oldValue,
    }));
    res.json({ totalBill });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getBilldata,
  addBillData,
  calculateBill,
};


