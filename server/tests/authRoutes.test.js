const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const server = require('../server');
const User = require('../models/userModel');

chai.use(chaiHTTP);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

describe('/register', () => {
  it('should create a new user', (done) => {
    const user = {
      username: 'nick',
      password: 'nick'
    };
    chai.request(server)
      .post('/register')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('nick');
        done();
      });
  });

  after((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });
});

describe('/login', () => {
  before((done) => {
    const user = {
      username: 'nick',
      password: 'nick'
    };
    chai.request(server)
      .post('/register')
      .send(user)
      .end((err, res) => {
        chai.request(server)
          .get('/logout')
          .end((err, res => {
            done();  
          }))
      });
  });

  it('should login user', (done) => {
    const user = {
      username: 'nick',
      password: 'nick'
    };
    chai.request(server)
      .post('/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('nick');
        done();
      });
  });

  it('should not login a user with the wrong password', (done) => {
    const user = {
      username: 'nick',
      password: 'hans'
    };
    chai.request(server)
      .post('/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.text).to.equal('Unauthorized');
        expect(res.body.username).to.be.undefined;
        done();
      });
  });

  after((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });
});

describe('/logout', () => {
  before((done) => {
    const user = {
      username: 'nick',
      password: 'nick'
    };
    chai.request(server)
      .post('/register')
      .send(user)
      .end((err, res) => {
        done();  
      });
  });

  it('should logout user', (done) => {
    chai.request(server)
      .get('/logout')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.be.undefined;
        done();
      });
  })

  after((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });
});