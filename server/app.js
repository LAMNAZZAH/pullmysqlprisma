const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const { verifyToken } = require('./middlewares/Authentication');

const apiRouter = require('./routes/api.route')


require('dotenv').config();

const App = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));

  // Check who is making the request : (authentication)
  // And it should be used before handling ever request
  app.use(verifyToken)
  
  app.get('/', async (req, res) => {
    res.send({ message: 'Awesome it works' });
  });
  
  app.use('/api', apiRouter);
  
  app.use('*', (req, res, next) => {
    next(createError.NotFound());
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message || 'Something went wrong please try again.',
    });
  });

  return app
}



module.exports = App;