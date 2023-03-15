require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send('Welcome to my favourite movie list');
};

app.get('/', welcome);

const { validateMovie, validateUser } = require('./validators');
const movieHandlers = require('./movieHandlers');
const userHandlers = require('./userHandlers');

app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);
app.get('/api/users', userHandlers.getUsers);
app.get('/api/users/:id', userHandlers.getUserById);
app.post('/api/movies', validateMovie, movieHandlers.postMovie);
app.post('/api/users', validateUser, userHandlers.postCreateUser);
app.put('/api/movies/:id', validateMovie, movieHandlers.putMovie);
app.put('/api/users/:id', validateUser, userHandlers.putUser);
app.delete('/api/movies/:id', movieHandlers.deleteMovie);
app.delete('/api/users/:id', userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
