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

describe('/strings/:id/reviews', () => {
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
              done();
          });
      });
  });

  describe('[POST] /strings/:id/reviews', () => {
    it('should add a review to the specified string', (done) => {
      const review = {
        text: 'bbbb',
        rating: 3
      };
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .post(`/strings/${stringId}/reviews`)
        .send(review)
        .end((err, res) => {
          expect(res.body.title).to.equal('aaaa');
          expect(res.body.content).to.equal('aaaa');
          expect(res.body.imageURL).to.equal('aaaa');
          expect(res.body.manufacturer).to.equal('aaaa');
          expect(res.body.coreMaterial).to.equal('aaaa');
          expect(res.body.outerMaterial).to.equal('aaaa');
          expect(res.body.tonalTraits).to.equal('aaaa');
          expect(res.body.rating).to.equal(3);
          expect(res.body.author).to.equal(user._id);
          expect(res.body.reviews.length).to.equal(1);   
          expect(res.body.reviews[0].text).to.equal('bbbb');
          expect(res.body.reviews[0].rating).to.equal(3);
          expect(res.body.reviews[0].author).to.equal(user._id);      
          expect(res.body.reviews[0]._parent).to.equal(stringId);                
          done();
        });
      });
    });

    it('should only allow authenticated users to create a review', (done) => {
      const review = {
        text: 'bbbb',
        rating: 3
      };
      agent
      .get('/logout')
      .end((err, res) => {
        agent
        .post(`/strings/${stringId}/reviews`)
        .send(review)
        .end((err, res) => {
          expect(res.text).to.equal('not logged in');
          done();
        });
      });
    });

    it('should update the string\'s rating', (done) => {
      const review1 = {
        text: 'aaaa',
        rating: 1
      };
      const review2 = {
        text: 'bbbb',
        rating: 5
      };
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .post(`/strings/${stringId}/reviews`)
        .send(review1)
        .end((err, res) => {
          agent
          .post(`/strings/${stringId}/reviews`)
          .send(review2)
          .end((err, res) => {
            expect(res.body.rating).to.equal(3);
            done();        
          });
        });
      });
    });
  });

  describe('[PUT] /strings/:id/reviews/:reviewId', () => {
    let reviewId;          
    beforeEach((done) => {
      const review1 = {
        text: 'bbbb',
        rating: 2
      };
      const review2 = {
        text: 'yyyy',
        rating: 4
      };
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .post(`/strings/${stringId}/reviews`)
        .send(review1)
        .end((err, res) => {
          reviewId = res.body.reviews[0]._id;
          agent
          .post(`/strings/${stringId}/reviews`)
          .send(review2)    
          .end((err, res) => {
            done();
          });
        });
      });
    });
    
    it('should update the review with the given reviewId', (done) => {
      const updatedReview = {
        text: 'cccc',
        rating: 5
      };
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .put(`/strings/${stringId}/reviews/${reviewId}`)
        .send(updatedReview)
        .end((err, res) => {
          expect(res.body.reviews[0].text).to.equal('cccc');
          expect(res.body.reviews[0].rating).to.equal(5);
          done();
        });
      });
    });

    it('should only allow a user to update his own review', (done) => {
      const alex = {
        username: 'alex',
        password: 'alex'
      };
      const updatedReview = {
        text: 'cccc',
        rating: 5
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
          .put(`/strings/${stringId}/reviews/${reviewId}`)
          .send(updatedReview)
          .end((err, res) => {
            expect(res.text).to.equal('you are not authorized!');            
            done();
          });
        });
      });
    });

    it('should update the string\'s rating', (done) => {
      const updatedReview = {
        text: 'cccc',
        rating: 5
      };
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .put(`/strings/${stringId}/reviews/${reviewId}`)
        .send(updatedReview)
        .end((err, res) => {
          expect(res.body.rating).to.equal(4.5);
          done();
        });
      });
    });
  });

  describe('[DELETE] /strings/:id/reviews/:reviewId', () => {
    let reviewId;          
    beforeEach((done) => {
      const review1 = {
        text: 'bbbb',
        rating: 2
      };
      const review2 = {
        text: 'yyyy',
        rating: 4
      };
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .post(`/strings/${stringId}/reviews`)
        .send(review1)
        .end((err, res) => {
          reviewId = res.body.reviews[0]._id;
          agent
          .post(`/strings/${stringId}/reviews`)
          .send(review2)    
          .end((err, res) => {
            done();
          });
        });
      });
    });

    it('should delete the review with the given id', (done) => {
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .delete(`/strings/${stringId}/reviews/${reviewId}`)
        .end((err, res) => {
          Review.findById(reviewId)
            .exec()
            .then((deletedReview) => {
              expect(deletedReview).to.equal(null);
              done();
            });
        });
      });
    });

    it('should only allow a user to delete his own review', (done) => {
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
          .delete(`/strings/${stringId}/reviews/${reviewId}`)
          .end((err, res) => {
            expect(res.text).to.equal('you are not authorized!');            
            done();
          });
        });
      });
    });

    it('should remove the review from the parent string', (done) => {
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .delete(`/strings/${stringId}/reviews/${reviewId}`)
        .end((err, res) => {
          expect(res.body.reviews.length).to.equal(1);
          done();
        });
      });
    });

    it('should update the string\'s rating', (done) => {
      agent
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        agent
        .delete(`/strings/${stringId}/reviews/${reviewId}`)
        .end((err, res) => {
          expect(res.body.rating).to.equal(4);
          done();
        });
      });
    });

  });

  afterEach((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err);
      StringModel.remove({}, (err) => {
        if (err) console.log(err);
        Review.remove({}, (err) => {
          if (err) console.log(err);
          done();
        });      
      });
    });
  });
});