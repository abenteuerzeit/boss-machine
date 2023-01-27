const express = require('express');
const workRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('../db');

workRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send('Work not found');
    }
});

// GET /api/minions/:minionId/work to get an array of all work for the specified minon.
workRouter.get('/', (req, res, next) => {
    const minionWork = getAllFromDatabase('work').filter(work => work.minionId === req.minion.id);
    res.status(200).send(minionWork);
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
workRouter.post('/', (req, res, next) => {
    const { title, description, hours } = req.body;
    const minionId = req.minion.id;
    const workToAdd = {
        title,
        description,
        hours,
        minionId
    };
    addToDatabase('work', workToAdd);
    res.status(201).send(workToAdd);
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
workRouter.put('/:workId', (req, res, next) => {
    if (req.work.minionId !== req.minion.id) {
        res.status(400).send('Work not found');
    } else {
    const updateWork = Object.assign(req.work, req.body);
    const updated = updateInstanceInDatabase('work', updateWork);
    res.status(200).send(updated);
    }
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
workRouter.delete('/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
});

module.exports = workRouter;