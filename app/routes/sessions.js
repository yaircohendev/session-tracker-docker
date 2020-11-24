const express = require('express');
const router = express.Router();

const Session = require('../models/sessions')
const ObjectId = require('mongoose').Types.ObjectId

router.get('/sessions', async (req, res) => {
    try {
        const results = await Session.find();
        return res.send(results)
    } catch (e) {
        console.error(e)
        return res.status(500).send({error: 'Internal Error'});
    }
});

router.get('/sessions/:sessionId', async (req, res) => {
    try {
        const results = await Session.findOne(ObjectId(req.params.sessionId));
        return res.send(results)
    } catch (e) {
        console.error(e)
        return res.status(500).send({error: 'Internal Error'});
    }
});

router.post('/sessions', async (req, res) => {
    try {
        const Sessions = new Session();
        const results = await Sessions.collection.insertOne({ sessionDate: req.body.sessionDate })
        return res.send(results.insertedId)
    } catch (e) {
        console.error(e)
        return res.status(500).send({error: 'Internal Error'});
    }
});

router.put('/sessions/:sessionId', async (req, res) => {
    try {
        const Sessions = new Session();
        const results = await Sessions.collection.findOneAndUpdate(
            {_id: ObjectId(req.params.sessionId)},
            {$addToSet: {sessions: {$each: req.body.sessions}}}
        )
        return res.send(results)
    } catch (e) {
        console.error(e)
        return res.status(500).send({error: 'Internal Error'});
    }
});


router.delete('/sessions', async (req, res) => {
    try {
        const Sessions = new Session();
        const results = await Sessions.collection.deleteMany()
        return res.send(results)
    } catch (e) {
        console.error(e)
        return res.status(500).send({error: 'Internal Error'});
    }
});

router.delete('/sessions/:sessionId', async (req, res) => {
    try {
        const Sessions = new Session();
        const results = await Sessions.collection.deleteOne({_id: ObjectId(req.params.sessionId)})
        return res.send(results)
    } catch (e) {
        console.error(e)
        return res.status(500).send({error: e});
    }
});


module.exports = router;
