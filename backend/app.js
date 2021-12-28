require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { usersRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');
const handleNotFound = require('./controllers/notFound');
const { errorHandler } = require('./middlewares/errorHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000, DB = 'mongodb://localhost:27017/aroundb' } = process.env;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(requestLogger);

/*
    Crach test:
*/
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
/* Remove after the project is aproved */

app.use(usersRouter);
app.use(cardsRouter);
app.use(handleNotFound);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB);

app.listen(PORT, 'localhost');
