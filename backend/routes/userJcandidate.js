var expressFunction = require('express');
const router = expressFunction.Router();
const Result = require("../models/userJeventJcandidate.model");
const Result2 = require("../models/userJeventJcandidate.model");
var expressApp = expressFunction();



router.route('/test/:id/:user_id').get((req, res) => {

    Result.aggregate([
        {
            $match: {
                "user_id": req.params.user_id, // Corrected the field name
                "event_id" : req.params.id
            }
        },

    ])
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.send(err)
    })

});


router.route('/testGet').get((req, res) => {
    Result.find()
        .then((result) => {
            console.log("Find All Result Sucess !");
            res.json(result)
        })
        .catch((err) => {
            res.send(err)
        })

});

router.route('/countScore2').get((req, res) => {
    let countscore = 0; // Initialize the counter variable

    Result.aggregate([
        {
            $lookup: {
                from: "eventAndcandidate",
                localField: "eventJcandidate_id",
                foreignField: "candidate_id",
                as: "result"
            }
        },
        {
            $match: {
                "result.event_id": "ET01" // Corrected the field name
            }
        },
        {
            $lookup: {
                from: "candidates",
                localField: "result.candidate_id",
                foreignField: "id",
                as: "resultnew"
            },

        }
    ])
        .then((result) => {
            console.log("Find All Result Success!");
            countscore = result.length; // Update the countscore based on the result length
            res.json({ countscore, result }); // Return countscore and result as JSON
        })
        .catch((err) => {
            res.send(err);
        });
});







router.route('/countScore/:id').get((req, res) => {
    Result.aggregate([
        {
            $lookup: {
                from: "eventAndcandidate",
                localField: "eventJcandidate_id",
                foreignField: "candidate_id",
                as: "result"
            }
        },
        {
            $match: {
                "result.event_id": req.params.id // Corrected the field name
            }
        },

        {
            $lookup: {
                from: "candidates",
                localField: "result.candidate_id",
                foreignField: "id",
                as: "resultnew" // Updated the as field to "resultnew"
            }
        },

        {
            $group: {
                _id: '$eventJcandidate_id',
                uniqueEventJcandidateIds: { $last: '$eventJcandidate_id' },
                resultnew: { $addToSet: '$resultnew' }  // Use $addToSet to avoid duplicates in resultnew
            }
        },



        {
            $project: {
                _id: 0,
                eventJcandidate_id: '$uniqueEventJcandidateIds',
                resultnew: 1 // Include the "resultnew" field in the projection
            }
        },

        {
            $sort: {
                eventJcandidate_id: 1
            }
        }
    ])
        .then((result) => {
            console.log("Find All Result Success!");

            const promises = result.map(item => {
                return Result2.aggregate([
                    { $match: { eventJcandidate_id: item.eventJcandidate_id } },
                    { $count: "score" }
                ]);
            });

            Promise.all(promises)
                .then(counts => {                    
                    const response = counts.map((count, index) => ({
                        eventJcandidate_id: result[index].eventJcandidate_id,
                        scoreCount: count[0] ? count[0].score : 0,
                        resultnew: result[index].resultnew // Include the "resultnew" field in the response
                    }));
                    res.json(response);
                    console.log(response);
                })
                .catch((err) => {
                    res.status(500).json({ error: err.message });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
        



});





router.route('/addUserJcandidate').post((req, res) => {
    Result.create(req.body)
        .then((result) => {
            console.log("Create Result Sucess!!");
            res.json(result)
        })
        .catch((err) => {
            res.send(err)
        })
});












module.exports = router;
