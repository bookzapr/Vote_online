const mongoose = require('mongoose');

const counterUserSchema = mongoose.Schema({
    _id: { type: String, required: false },
    sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('CounterUser', counterUserSchema);

const userSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    image : {
        type: String,
    },
    file:{
        type:String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    age: {
        type:String
    },
    gender: {
        type:String
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type :String
    },
    role:{
        type:String
    }
  
}, {
    collection: 'users'
});

userSchema.pre('save', function (next) {
    const doc = this;
    const prefix = 'US';

    // Check if this is a new dashboard or an update to an existing one
    if (!doc.id) {
        Counter.findByIdAndUpdate(
            { _id: 'dashboardId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        )
        .then(counter => {
            const paddedNumber2 = counter.sequence_value.toString().padStart(2, '0');
            doc.id = `${prefix}${paddedNumber2}`;
            
            next();
        })
        .catch(err => {
            return next(err);
        });
    } else {
        // If it's an update, simply proceed with the save
        next();
    }
});

// Ensure that the 'dashboard' collection uses the 'id' field for unique indexing
userSchema.index({ id: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

