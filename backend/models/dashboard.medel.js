const mongoose = require('mongoose');
const moment = require('moment');

const counterSchema = mongoose.Schema({
    _id: { type: String, required: false },
    sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const dashboardSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    title: {
        type: String
    },
    describe: {
        type: String
    },
    status: {
        type:String
    },
    open: {
        type: Date,
    },
    end: {
        type: Date,
    },
    createdAt: {
        type: String
    }
}, {
    collection: 'dashboard'
});

dashboardSchema.pre('save', function (next) {
    const doc = this;
    const prefix = 'ET';

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
            
            doc.createdAt = moment().format('MM/DD/YYYY');
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
dashboardSchema.index({ id: 1 }, { unique: true });

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;


