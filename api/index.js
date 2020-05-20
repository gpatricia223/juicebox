const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const postsRouter = require('./post');
apiRouter.use('/post', postsRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);

module.exports = apiRouter;