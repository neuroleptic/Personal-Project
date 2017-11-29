const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const server = require('../server');
const User = require('../models/userModel');
const StringModel = require('../models/stringModel');
const Review = require('../models/reviewModel');

chai.use(chaiHTTP);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

const agent = chai.request.agent(server);

describe('/strings', () => {
  let stringId;
  let user;
  const newUser = {
    username: 'nick',
    password: 'nick'
  };
  beforeEach((done) => {
    chai.request(server)
      .post('/register')
      .send(newUser)
      .end((err, res) => {
        user = res.body
        const string1 = new StringModel({
          title: 'aaaa',
          content: 'aaaa',
          imageURL: 'aaaa',
          manufacturer: 'aaaa',
          coreMaterial: 'aaaa',
          outerMaterial: 'aaaa',
          tonalTraits: 'aaaa',
          author: user
        });
        string1.save()
          .then((newString) => {
            stringId = newString.id;
            const string2 = new StringModel({
              title: 'bbbb',
              content: 'bbbb',
              imageURL: 'bbbb',
              manufacturer: 'bbbb',
              coreMaterial: 'bbbb',
              outerMaterial: 'bbbb',
              tonalTraits: 'bbbb',
              author: user
            });
            string2.save()
             .then(() => {
                done();
             });
          });
      });
  });

  describe('[GET] /strings', () => {
    it('should return all strings', (done) => {
      chai.request(server)
        .get('/strings')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });

  describe('[GET] /strings/:id', () => {
    it('should return the string with the specified id', (done) => {
      chai.request(server)
        .get(`/strings/${stringId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body._id).to.equal(stringId);
          expect(res.body.title).to.equal('aaaa');
          expect(res.body.content).to.equal('aaaa');
          expect(res.body.imageURL).to.equal('aaaa');
          expect(res.body.manufacturer).to.equal('aaaa');
          expect(res.body.coreMaterial).to.equal('aaaa');
          expect(res.body.outerMaterial).to.equal('aaaa');
          expect(res.body.tonalTraits).to.equal('aaaa');
          expect(res.body.author.id).to.equal(user.id);
          expect(res.body.author.username).to.equal(user.username);              
          done();
        });
    });
  });

  describe('[POST] /strings', () => {
    it('should add a new string', (done) => {
      const string3 = {
        title: 'cccc',
        content: 'cccc',
        imageURL: 'cccc',
        manufacturer: 'cccc',
        coreMaterial: 'cccc',
        outerMaterial: 'cccc',
        tonalTraits: 'cccc'
      };
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .post('/strings')
        .send(string3)
        .end((err, res) => {
          expect(res.body.title).to.equal('cccc');
          expect(res.body.content).to.equal('cccc');
          expect(res.body.imageURL).to.equal('cccc');
          expect(res.body.manufacturer).to.equal('cccc');
          expect(res.body.coreMaterial).to.equal('cccc');
          expect(res.body.outerMaterial).to.equal('cccc');
          expect(res.body.tonalTraits).to.equal('cccc');
          expect(res.body.author.id).to.equal(user.id);
          expect(res.body.author.username).to.equal(user.username);
          
          StringModel.find()
          .exec() 
          .then((strings) => {
            expect(strings.length).to.equal(3);
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
        });
      });
    });  
    it('should only allow authenticated users to create a string', (done) => {
      const string3 = {
        title: 'cccc',
        content: 'cccc',
        imageURL: 'cccc',
        manufacturer: 'cccc',
        coreMaterial: 'cccc',
        outerMaterial: 'cccc',
        tonalTraits: 'cccc'
      };
      agent
        .get('/logout')
        .end((err, res) => {
          agent
          .post('/strings')
          .send(string3)
          .end((err, res) => {
            expect(res.text).to.equal('not logged in');
            done();
          });
        });
    });
  });

  describe('[PUT] /strings/:id', () => {
    it('should update the string with the given id', (done) => {
      const updatedString = {
        title: 'dddd',
        content: 'dddd',
        imageURL: 'dddd',
        manufacturer: 'dddd',
        coreMaterial: 'dddd',
        outerMaterial: 'dddd',
        tonalTraits: 'dddd'
      };
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
          .put(`/strings/${stringId}`)
          .send(updatedString)
          .end((err, res) => {
            expect(res.body.title).to.equal('dddd');
            expect(res.body.content).to.equal('dddd');
            expect(res.body.imageURL).to.equal('dddd');
            expect(res.body.manufacturer).to.equal('dddd');
            expect(res.body.coreMaterial).to.equal('dddd');
            expect(res.body.outerMaterial).to.equal('dddd');
            expect(res.body.tonalTraits).to.equal('dddd');
            expect(res.body.author.id).to.equal(user.id);
            done();
          });
      });
    });
    it('should only allow a user to edit his own string', (done) => {
      const updatedString = {
        title: 'dddd',
        content: 'dddd',
        imageURL: 'dddd',
        manufacturer: 'dddd',
        coreMaterial: 'dddd',
        outerMaterial: 'dddd',
        tonalTraits: 'dddd'
      };
      const alex = {
        username: 'alex',
        password: 'alex'
      };
      chai.request(server)
        .post('/register')
        .send(alex)
        .end((err, res) => {
          agent
          .post('/login')
          .send(alex)
          .end((err, res) => {
            agent
            .put(`/strings/${stringId}`)
            .send(updatedString)
            .end((err, res) => {
              expect(res.text).to.equal('you are not authorized!');
              done();
            });
          });
        });
    });
  });

  describe('[DELETE] /strings/:id', () => {
    it('should delete the string with the specified id', (done) => {
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
          .delete(`/strings/${stringId}`)
          .end((err, res) => {
            expect(res.body.title).to.equal('aaaa');
            expect(res.body.content).to.equal('aaaa');
            expect(res.body.imageURL).to.equal('aaaa');
            expect(res.body.manufacturer).to.equal('aaaa');
            expect(res.body.coreMaterial).to.equal('aaaa');
            expect(res.body.outerMaterial).to.equal('aaaa');
            expect(res.body.tonalTraits).to.equal('aaaa');
            expect(res.body.author.id).to.equal(user.id);
            
            StringModel.find()
            .exec() 
            .then((strings) => {
              expect(strings.length).to.equal(1);
              StringModel.findById(stringId)
                .exec()
                .then((deletedString) => {
                  expect(deletedString).to.equal(null);
                  done();
                })
            })
            .catch((error) => {
              console.log(error);
              done();
            });
          });
      });
    });

    it('should only allow a user to delete his own string', (done) => {
      const alex = {
        username: 'alex',
        password: 'alex'
      };
      chai.request(server)
        .post('/register')
        .send(alex)
        .end((err, res) => {
          agent
          .post('/login')
          .send(alex)
          .end((err, res) => {
            agent
            .delete(`/strings/${stringId}`)
            .end((err, res) => {
              expect(res.text).to.equal('you are not authorized!');
              done();
            });  
          });
        });
    });
  });

  afterEach((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err);
      StringModel.remove({}, (err) => {
        if (err) console.log(err);
        done();        
      });
    });
  });
});