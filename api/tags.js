const express = require('express');
const tagsRouter = express.Router();
const { getAllTags } = require('../db');
const { getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get('/', async (req, res) => {
  try {  
    const tags = await getAllTags();

    // const tags =Alltags.filter(tag => {
    //   return tag.active || (req.user && post.author.id === req.user.id);
    // });

    res.send({
    tags
  });
} catch ({ name, message }) {
  next({ name, message });
}
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
   
    // console.log(req.params)
    // console.log(req.params.tagName)
  try {
    const tagName = req.params.tagName
    const posts = await getPostsByTagName(tagName);
    res.send({
      posts
    })
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    next({ name, message }); // forward the name and message to the error handler
  }
});

module.exports = tagsRouter;