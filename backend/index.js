const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const cookieParser = require('cookie-parser')
const cors = require('cors');

const url = 'mongodb://127.0.0.1:27017/votes_online';

const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};


expressApp.use(cookieParser())
expressApp.use(cors({
    credentials:true,
    origin:['http://localhost:3000','http://localhost:4200']
}))
expressApp.use(expressFunction.json());
expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
    return next();
});

expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
    .then(() => {
        console.log('Connected to MongoDB...');
        next();
    })
    .catch(err => {
        console.log('Cannot connect to MongoDB');
        res.status(501).send('Cannot connect to MongoDB')
    })
})
expressApp.use('/userJcandidate', require('./routes/userJcandidate'))

expressApp.use('/getuser',require('./routes/user'))
expressApp.use('/user',require('./routes/user'))

expressApp.use('/candidate', require('./routes/candidate'))


expressApp.use('/dashboard', require('./routes/dashboard'))
expressApp.use('/main', require('./routes/main'))



expressApp.use('/manageEvent', require('./routes/manageEvent'))
expressApp.use('/editevent', require('./routes/manageEvent'))
expressApp.use('/editevent', require('./routes/eventAndcandidate'))

expressApp.use('/login', require('./routes/signin'))
expressApp.use('/signout', require('./routes/signin'))

expressApp.listen(3000, function(){
    console.log('Listening on port 3000')
})