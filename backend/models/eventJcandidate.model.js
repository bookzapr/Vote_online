const mongoose = require('mongoose');

const counterEventJCandidateSchema = mongoose.Schema({
    _id: { type: String, required: false },
    sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('CounterEventJCandidate', counterEventJCandidateSchema);




const EventJCandidateSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    event_id: {
        type: String,
        unique: false
    },
    candidate_id: {
        type: String,
        unique: true
    },
   
}, {
    collection: 'eventAndcandidate',
});

EventJCandidateSchema.pre('save', function (next) {
    const doc = this;
    const prefix = 'EJC';

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
EventJCandidateSchema.index({ id: 1 }, { unique: true });

const EventACandidateSchema = mongoose.model('eventAndcandidate', EventJCandidateSchema);

module.exports = EventACandidateSchema;


