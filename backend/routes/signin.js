const { Router } = require("express")
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const router = Router()
const key = 'MY_KEY';

var Schema = require('mongoose').Schema;

const compareHash = async (plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) => {
            if (err) {
                reject(new Error('Error bcrypt compare'))
            } else {
                resolve({ status: data });
            }
        })
    })
}

router.route('/signin')
    .post(async (req, res) => {
        const playload = {
            username: req.body.username,
            password: req.body.password,
        }
        console.log(playload)

        try {
            const result = await findUser(playload.username);
            const loginStatus = await compareHash(playload.password, result.password);

            const status = loginStatus.status;
            console.log(status)
            if (status) {
                //const {_id} = await result.toJSON()
                const token = jwt.sign(result,key, { expiresIn: 24 * 60 * 60 * 1000 });
                res.cookie('jwt', token, { httpOnly:true })
                console.log(token)
                console.log(result)
                res.status(200).json({ result, token, status,});
                console.log("login seccusfully")
                
            } else {
                res.status(200).json({ status });
            }

        } catch (error) {
            res.status(404).send(error);
        }
    })

const findUser = (username) => {
    return User.findOne({ username: username })
        .then((data) => {
            if (data) {
                return {
                    _id: data._id, 
                    id: data.id,                   
                    username: data.username,
                    password: data.password,
                    role: data.role,                   
                    firstname: data.firstname,
                    lastname: data.lastname,
                    age: data.age,
                    gender: data.gender,
                    phone: data.phone,
                    //image: data.image,
                    //file: data.file,
                    role: data.role
                };
            } else {
                throw new Error('User not found');
            }
        })
        .catch((error) => {
            throw error;
        });
}

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    //console.log(res.cookie('jwt', '', { maxAge: 0 }))
    res.send({
        message: 'logout success'
    })
})

module.exports = router