const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { usersRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');
const handleNotFound = require('./controllers/notFound');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

const { PORT = 3001, DB = 'mongodb://localhost:27017/aroundb' } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(usersRouter);
app.use(cardsRouter);
app.use(handleNotFound);
app.use(errorHandler);

mongoose.connect(DB);

app.listen(PORT, 'localhost');
