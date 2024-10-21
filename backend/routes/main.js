var expressFunction = require('express');
const router = expressFunction.Router();
const Main = require("../models/user.model");



    router.route('/testGet').get((req, res) => {
        Main.findById("6525132a1c466f33c83215c1")
      .then((result) => {
        console.log(result.id);
          res.json(result)
        })
        .catch((err) => {
          res.send(err)
        }) 
  
      });

      



    
module.exports = router;
