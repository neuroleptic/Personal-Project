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
mongoose.connect('mongodb://localhost/test');

describe('/strings', () => {
  beforeEach((done) => {
    const user = {
      username: 'nick',
      password: 'nick'
    };

    // const string2 = {
    //   title: 'bbbb',
    //   content: 'bbbb',
    //   imageURL: 'bbbb',
    //   manufacturer: 'bbbb',
    //   coreMaterial: 'bbbb',
    //   outerMaterial: 'bbbb',
    //   tonalTraits: 'bbbb'
    // };

    chai.request(server)
      .post('/register')
      .send(user)
      .end((err, res) => {
        const string1 = new StringModel({
          title: 'aaaa',
          content: 'aaaa',
          imageURL: 'aaaa',
          manufacturer: 'aaaa',
          coreMaterial: 'aaaa',
          outerMaterial: 'aaaa',
          tonalTraits: 'aaaa',
          author: res.body
        });
        string1.save()
          .then(() => {
            const string2 = new StringModel({
              title: 'bbbb',
              content: 'bbbb',
              imageURL: 'bbbb',
              manufacturer: 'bbbb',
              coreMaterial: 'bbbb',
              outerMaterial: 'bbbb',
              tonalTraits: 'bbbb',
              author: res.body
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