var expressFunction = require('express');
const router = expressFunction.Router();
const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
var expressApp = expressFunction();
const bodyParser = require("body-parser");
const multer = require("multer");
const { hash } = require('bcryptjs');
const key = 'MY_KEY';
const jwt = require('jsonwebtoken');
expressApp.use(bodyParser.json());

const makeHash = async (plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}
router.route('/getCountMember').get((req, res) => {
    User.countDocuments()
        .then((count) => {
            console.log("Counted all records in Member:", count);
            res.json({ count }); // Send the count as JSON response
        })
        .catch((err) => {
            res.status(500).send(err); // Sending a status code and the error message
        });

});


router.route('/testGet').get((req, res) => {
    User.find()
        .then((result) => {
            console.log("Find All Users Sucess !");
            res.json(result)
        })
        .catch((err) => {
            res.send(err)
        })

});

router.route('/getUser/').get(async (req, res) => {
    console.log('get user');
    try {
        const cookie = req.cookies['jwt'];
        console.log(cookie);

        if (!cookie) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const claims = jwt.verify(cookie, key);

        if (!claims) {
            console.log('claims');
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const user = await User.findOne({
            _id: claims._id
        });

        if (!user) {
            console.log('!user');
            return res.status(404).send({
                message: "User not found"
            });
        }

        const { password, ...data } = user.toJSON(); // Use toJSON() to convert user to a JSON object
        res.send(data);
    } catch (err) {
        console.log('!user');
        console.error(err);
        res.status(401).send({
            message: "unauthenticated"
        });
    }
});



router.route('/addUser').post((req, res) => { //อันนี้เอาไว้ใช้สมัครสมาชิก ยังไม่ได้ทำเข้ารหัส + token
    console.log("Add user")
    makeHash(req.body.password)
        .then(async (hashText) => {
            console.log("playload")
            const playload = {
                username: req.body.username,
                password: hashText,
                _id: req.body._id,                               
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                gender: req.body.gender,
                phone: req.body.phone,
                image: req.body.image,
                file: req.body.file,
                role: req.body.role
            }
           // console.log(playload);
           User.create(playload)
                        .then((result) => {                  
                                      
                        res.status(200).json(result)                        
                        //console.log(result);
                        //const token = jwt.sign(result, key,{});
                        //res.cookie('jwt', token, { httpOnly: true })  
                        console.log("Create User Sucess!!");
                })
                .catch((err) => {
                    res.send(err)
                })
                
                
        })
        .catch(err => {
            res.send(err)
        })


});

router.route('/deleteUser/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((result) => {
            console.log("Delete User Sucess!!");
            res.json(result)
        })
        .catch((err) => {
            res.send(err)
        })


});

router.route('/editUser/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            console.log("Update User Sucess!!");
            res.json(result)
        })
        .catch((err) => {
            res.send(err)
        })


});

router.route('/editPassword/:id').put((req, res) => {
    makeHash(req.body.password)
        .then(hashText => {
            console.log("playload")
            const playload = {
                password: hashText
            }
            console.log(playload);
            User.findByIdAndUpdate(req.params.id, playload)
                .then((result) => {
                    console.log("Update Password Sucess!!");
                    res.json(result)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch(err => {
            res.send(err)
        })

});

router.route('/getUserBy/:id').get((req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            console.log("FindId User Sucess!!")
            res.json(result)
        })
        .catch((err) => {
            res.send("cant find id")
        })


});


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
})

var upload = multer({ storage: storage })

// let upload = multer({ dest:'uploads/'})

router.route('/checkUserBy').put((req, res) => {


    console.log(req.body.username)
    User.aggregate([
        {
            $match: {
                "username": req.body.username, // Corrected the field name
            }
        },

    ])
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.send(err)
    })

})



module.exports = router;