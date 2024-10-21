var expressFunction = require('express');
const router = expressFunction.Router();
const Candidate = require("../models/candidate.model");
var expressApp = expressFunction();


const bodyParser = require("body-parser");
const multer = require("multer");


expressApp.use(bodyParser.json());


    router.route('/testGet').get((req, res) => {
        Candidate.find()
      .then((result) => {
          console.log("Find All DashBoards Sucess !");
          res.json(result)
        })
        .catch((err) => {
          res.send(err)
        }) 
  
      });

      router.route('/addCandidate').post((req, res) => {
        Candidate.create(req.body)
                    .then((result) => {
                        console.log("Create Candidate Sucess!!");
                        res.json(result.id)
                      })
                      .catch((err) => {
                        res.send(err)
                      })   
        });

        router.route('/deleteCandidate/:id').delete((req, res) => {
            Candidate.findByIdAndDelete(req.params.id)
          .then((result) => {
              console.log("Delete Candidate Sucess!!");
              res.json(result.id)
            })
            .catch((err) => {
              res.send(err)
            }) 
          
  
      });

      router.route('/editCandidate/:id').put((req, res) => {
        Candidate.findByIdAndUpdate(req.params.id,req.body)
        .then((result) => {
            console.log("Update Candidate Sucess!!");
            res.json(result)
          })
          .catch((err) => {
            res.send(err)
          }) 
        

    });

 

    router.route('/getCandidateBy/:id').get((req, res) => {
        Candidate.findById(req.params.id)
      .then((result) => {
          console.log("FindId Candidate Sucess!!")
          res.json(result)
        })
        .catch((err) => {
          res.send("cant find id")
        }) 


  });


  const storage = multer.diskStorage({
    destination: (req,file,callBack) => {
        callBack(null,'uploads')
    },
    filename: (req,file,callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
})


router.route('/getCountCandidate').get((req, res) => {
  Candidate.countDocuments()
.then((count) => {
console.log("Counted all records in Candidate:", count);
res.json({ count }); // Send the count as JSON response
})
.catch((err) => {
res.status(500).send(err); // Sending a status code and the error message
});

  });
var upload = multer({ storage: storage})

// let upload = multer({ dest:'uploads/'})


module.exports = router;
