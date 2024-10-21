const mongoose = require('mongoose');

const UserJSchema = mongoose.Schema({

    user_id: {
        type: String,
        unique: true
    },
    eventJcandidate_id: {
        type: String,
        unique: false
    },
    event_id: {
        type:String
    }


}, {
    collection: 'userJeventJcandidate',
});

const userJeventJcandidate = mongoose.model('userJeventJcandidate', UserJSchema);

module.exports = userJeventJcandidate;
