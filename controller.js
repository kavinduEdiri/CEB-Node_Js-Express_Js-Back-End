// controller.js

const { User1, User2, User3, User4 } = require('./model');

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
    // Step 1: Get data from User2
    const bills = await User2.find();

    // Step 2: Calculate the unit
    const totalUnits = bills.map(bill => ({
      ...bill._doc,
      unit: bill.newValue - bill.oldValue,
    }));

    // Step 3: Save the unit in User3
    const unitsToSave = totalUnits.map(bill => new User3({ total: bill.unit })); // Assuming User3 model stores 'total' as 'unit'
    await User3.insertMany(unitsToSave);

    // Step 4: Retrieve the saved data from User3
    const savedUnits = await User3.find();

    // Step 5: Calculation bill using savedUnit
    const c = 650;
    const d = 100;
    const other = c + d;
    let payToSave = [];

    savedUnits.forEach(async (unitDoc) => {
      const savedUnit = unitDoc.total; // Assuming 'total' is where 'unit' is stored
      let amount, pay;

      if (savedUnit < 27) {
        amount = savedUnit * 42;
        pay = amount + other;
        payToSave.push(new User4({ pay }));
      } else if (savedUnit >= 27 && savedUnit < 54) {
        amount = 27 * 42 + (savedUnit - 27) * 62;
        pay = amount + other;
        payToSave.push(new User4({ pay }));
      } else if (savedUnit >= 54) {
        amount = 27 * 42 + 27 * 62 + (savedUnit - 54) * 82;
        pay = amount + other;
        payToSave.push(new User4({ pay }));
      } else {
        res.json({ error: "Invalid unit value" });
        return;
      }
    });

    // Save all calculated pays in User4
    await User4.insertMany(payToSave);

    // Step 6: Get saved data
    const savedPays = await User4.find();

    // Respond with the saved payments
    res.json({ savedPays });
  } catch (error) {
    res.json({ error });
  }
};



//==============pay============
const getPay = (req, res, next) => {
  User4.find()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error });
    });
};

const addPay = (req, res, next) => {
  const user = new User4({
    pay: req.body.pay,
    
  });
  user.save()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error });
    });
};


const deletePay = (req, res, next) => {
  const pay = req.body.pay;
  User4.deleteOne({ pay: pay })
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.json({ error });
    });
};

//==============pay============
module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getBilldata,
  addBillData,
  calculateBill,
  getPay,
  addPay,
  deletePay
};


