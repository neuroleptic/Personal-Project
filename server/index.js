const mongoose = require('mongoose');
const server = require('./server');

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/project',
  { useMongoClient: true },
  () => {
    console.log('connected to mongo');
  }
);

server.listen(5000, () => {
  console.log('server is listening on port 5000');
})