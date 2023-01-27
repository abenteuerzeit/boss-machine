const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./routes/minions.js');
const meetingsRouter = require('./routes/meetings.js');
const ideasRouter = require('./routes/ideas.js');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;