var expressFunction = require('express');
const router = expressFunction.Router();
const Event = require("../models/dashboard.medel");



    router.route('/testGet').get((req, res) => {
      Event.find()
      .then((result) => {
          console.log("Find All DashBoards Sucess !");
          res.json(result)
        })
        .catch((err) => {
          res.send(err)
        }) 
  
      });

      router.route('/addEvent').post((req, res) => {
        Event.create(req.body)
                    .then((result) => {
                        console.log("Create Event Sucess!!");
                        res.json(result)
                      })
                      .catch((err) => {
                        res.send(err)
                      })   
        });

        router.route('/deleteEvent/:id').delete((req, res) => {
          Event.findByIdAndDelete(req.params.id)
          .then((result) => {
              console.log("Delete Event Sucess!!");
              res.json(result)
            })
            .catch((err) => {
              res.send(err)
            }) 
          
  
      });

      router.route('/editEvent/:id').put((req, res) => {
        Event.findByIdAndUpdate(req.params.id,req.body)
        .then((result) => {
            console.log("Update Event Sucess!!");
            res.json(result)
          })
          .catch((err) => {
            res.send(err)
          }) 
        

    });

    router.route('/getEventBy/:id').get((req, res) => {
      Event.findById(req.params.id)
      .then((result) => {
          console.log("FindId Event Sucess!!")
          res.json(result)
        })
        .catch((err) => {
          res.send("cant find id")
        }) 


  });

  router.route('/getEventBy2/:id').get((req, res) => {
    console.log(req.params.id);
    Event.aggregate([{$match:{id:req.params.id}}])    
    .then((result) => {
        console.log("FindId Event Sucess!!")
        res.json(result)
      })
      .catch((err) => {
        res.send("cant find id")
      }) 


});

    
module.exports = router;
