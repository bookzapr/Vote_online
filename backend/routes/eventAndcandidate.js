var expressFunction = require('express');
const router = expressFunction.Router();
const Event = require("../models/eventJcandidate.model");




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

      //เช็คว่าผู้สมัครคนนี้สมัครกิจกรรมไหน
      router.route('/getOnlyEvent/:id').get((req, res) => {
        Event.aggregate([{$lookup:{from:"candidates",localField:"candidate_id",foreignField:"id",as:"EventACandidate"}},{$match:{event_id:req.params.id}},{$project:{EventACandidate:1}}]) 
     
        .then((result) => {
            console.log("Find Only Event Sucess !");
            res.json(result)
          })
          .catch((err) => {
            res.send(err)
          }) 
    
        });


      router.route('/addEventAcandidate').post((req, res) => {
        Event.create(req.body)
                    .then((result) => {
                        console.log("Create EventAcandidate Sucess!!");
                        res.json(result)
                      })
                      .catch((err) => {
                        res.send(err)
                      })   
        });

        router.route('/deleteEventAcandidate/:id').delete((req, res) => {
          Event.deleteOne({candidate_id:req.params.id})
          .then((result) => {
              console.log("Delete EventAcandidate Sucess!!");
              res.json(result)
            })
            .catch((err) => {
              res.send(err)
            }) 
          
  
      });

      router.route('/editEventAcandidate/:id').put((req, res) => {
        Event.findByIdAndUpdate(req.params.id,req.body)
        .then((result) => {
            console.log("Update EventAcandidate Sucess!!");
            res.json(result)
          })
          .catch((err) => {
            res.send(err)
          }) 
        

    });

    router.route('/getEventAcandidateBy/:id').get((req, res) => {
      Event.findById(req.params.id)
      .then((result) => {
          console.log("FindId EventAcandidate Sucess!!")
          res.json(result)
        })
        .catch((err) => {
          res.send("cant find id")
        }) 


  });

    
module.exports = router;
