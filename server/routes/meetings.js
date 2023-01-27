const express = require('express');
const meetingsRouter = express.Router();
const { createMeeting, getAllFromDatabase, deleteAllFromDatabase, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db.js');

// Route /api/meetings

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings);
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
    const model = deleteAllFromDatabase('meetings');
    res.status(204).send(model);
});

module.exports = meetingsRouter;