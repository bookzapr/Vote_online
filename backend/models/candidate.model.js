const mongoose = require('mongoose');

const counterCandidateSchema = mongoose.Schema({
    _id: { type: String, required: false },
    sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('CounterCandidate', counterCandidateSchema);

const CandidateSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    image : {
        type: String,
    },
    file : {
        type: String,
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    age: {
        type:Number
    },
    gender: {
        type:String
    },
  
    intro: {
        type: String,
    
    }
}, {
    collection: 'candidates'
});

CandidateSchema.pre('save', function (next) {
    const doc = this;
    const prefix = 'CD';

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
CandidateSchema.index({ id: 1 }, { unique: true });

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;


