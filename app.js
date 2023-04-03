require('dotenv').config();

const express = require('express');

const app = express();
const { hashPassword, verifyPassword, verifyToken } = require('./auth.js');

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send('Welcome to my favourite movie list');
};

app.get('/', welcome);
const userHandlers = require('./userHandlers');
const movieHandlers = require('./movieHandlers');
// the public routes
app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);
app.get('/api/users', userHandlers.getUsers);
app.get('/api/users/:id', userHandlers.getUserById);
app.post(
  '/api/login',
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
app.post('/api/users', hashPassword, userHandlers.postUser);

//private route for Movie
app.use(verifyToken);
app.post('/api/movies', movieHandlers.postMovie);
app.put('/api/movies/:id', movieHandlers.updateMovie);
app.delete('/api/movies/:id', movieHandlers.deleteMovie);

//private route for Users
app.put('/api/users/:id', hashPassword, userHandlers.updateUser);
app.delete('/api/users/:id', userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
