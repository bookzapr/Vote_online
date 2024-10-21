var expressFunction = require('express');
const router = expressFunction.Router();
const DashBoards = require("../models/dashboard.medel");



    router.route('/testGet').get((req, res) => {
      DashBoards.find()
      .then((result) => {
          console.log("Find All Event Sucess !");
          res.json(result)
        })
        .catch((err) => {
          res.send(err)
        }) 
  
      });

      router.route('/getCountEvent').get((req, res) => {
        DashBoards.countDocuments()
    .then((count) => {
      console.log("Counted all records in DashBoards:", count);
      res.json({ count }); // Send the count as JSON response
    })
    .catch((err) => {
      res.status(500).send(err); // Sending a status code and the error message
    });
    
        });

      router.route('/addEvent').post((req, res) => {
        DashBoards.create(req.body)
                    .then((result) => {
                        console.log("Create Event Sucess!!");
                        res.json(result)
                      })
                      .catch((err) => {
                        res.send(err)
                      })   
        });

        router.route('/deleteEvent/:id').delete((req, res) => {
          DashBoards.findByIdAndDelete(req.params.id)
          .then((result) => {
              console.log("Delete Event Sucess!!");
              res.json(result)
            })
            .catch((err) => {
              res.send(err)
            }) 
          
  
      });

    
module.exports = router;
