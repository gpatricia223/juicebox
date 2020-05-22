const express = require('express');
const usersRouter = express.Router();
const { JWT_SECRET } = process.env;
const { getAllUsers } = require('../db');
const { getUserByUsername } = require('../db');


//Middleware attached matches route users api/users
usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); // THIS IS DIFFERENT
});

//GET /api/users
usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();

    res.send({
    users
  });
});

// POST /api/users/login
// usersRouter.post('/login', async (req, res, next) => {
//   console.log(req.body);
//   res.end();
// });

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }
  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
      console.log('token', token)
      res.send({ message: "you're logged in!", token: `${token}` });
      return token;

    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});
                                                                                    
module.exports = usersRouter;