const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { usersRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');
const handleNotFound = require('./controllers/notFound');
const auth = require('./utils/fakeAuth');

const app = express();

const { PORT = 3000, DB = 'mongodb://localhost:27017/aroundb' } = process.env;

app.use(helmet());
app.use(bodyParser.json());
app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);
app.use(handleNotFound);

mongoose.connect(DB);

app.listen(PORT, 'localhost');
