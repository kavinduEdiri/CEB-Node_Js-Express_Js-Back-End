const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controller');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//=========== Rest API ============

// Fetch all users
app.get('/users', (req, res) => {
    controller.getUsers((req,res,next) => {
        res.send();
    });
});

// create data users
app.post('/createuser', (req, res) => {
    controller.addUser(req.body,(callback)=>{
        res.send();
    })

    });


// update data users
app.post('/updateuser', (req, res) => {
    controller.updateUser(req.body,(callback)=>{
        res.send(callback);
    })

    });

// delete data users
app.post('/deleteuser', (req, res) => {
        controller.deleteUser(req.body,(callback)=>{
            res.send(callback);
        })
    
        });

// show unit oldValue and newValue
app.get('/getbilldata', (req, res) => {
        controller.getBilldata(req.body,(callback)=>{
                res.send(callback);
            })
        
            });        

// post unit oldValue and newValue to database
app.post('/addbilldata', (req, res) => {
                controller.addBillData(req.body,(callback)=>{
                        res.send(callback);
                    })
                
                    });
                    
 // calculation process                  
app.get('/calculatebilldata', (req, res) => {
                        controller.calculateBill(req.body,(callback)=>{
                                res.send(callback);
                            })
                        
                            });                    
//=========== Rest API ============

app.use('/api', router);
module.exports = app;
