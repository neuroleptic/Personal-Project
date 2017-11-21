const bodyParser = require('body-parser');
const express = require('express');
const session = require("express-session");
const mongoose = require('mongoose');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userModel");
const StringModel = require("./models/stringModel");
const Review = require("./models/reviewModel");
const cors = require('cors');
const middleware = require("./middleware");

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

const corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  credentials: true,
  "optionsSuccessStatus": 204
};

server.use(cors(corsOptions));

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost:27017/project',
  { useMongoClient: true }
);

server.use(require("express-session")({
  secret: '0dhjzFkz91aNOp1xqOmx',
  resave: false,
  saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

server.post('/strings', middleware.isLoggedIn, (req, res) => {
  const { title, content } = req.body;
  const author = req.user;
  const newString = new StringModel({title, content, author});
  newString.save()
    .then((string) => {
      res.json(string)
    })
    .catch((error) => {
      res.json({ error });
  });
});

server.get('/strings', (req, res) => {
  StringModel.find()
    .exec() 
    .then((strings) => {
      res.json(strings)
    })
    .catch((error) => {
      res.json({ error });
    });
});

server.get('/strings/:id', (req, res) => {
  const { id } = req.params;
  StringModel.findById(id)
    .populate('author', 'username')
    .populate({
      path: 'reviews',
      populate: { path: 'author', select: 'username' }
    })
    .exec()
    .then((string) => {
      res.json(string)
    })
    .catch((error) => {
      res.json({ error });
    });
});

server.put('/strings/:id', middleware.checkUserString, (req, res) => { 
  const { id } = req.params;  
  const { title, content } = req.body;  
  StringModel.findByIdAndUpdate(id, {$set: {title, content}}, {new:true})
    .exec()
    .then((string) => {
      res.json(string)
    })
    .catch((error) => {
      res.json({ error });
    });
});

server.delete('/strings/:id', middleware.checkUserString, (req, res) => { 
  const { id } = req.params;  
  StringModel.findByIdAndRemove(id)
    .exec()
    .then((string) => {
      Review.remove({ _parent: id } , function (err) {
        if (err) {
          res.json({ error });
        }     
        res.json(string)
      });
    })
    .catch((error) => {
      res.json({ error });
    });
});

server.post('/strings/:id/reviews', middleware.isLoggedIn, (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const author = req.user;
  const newReview = new Review({ text, author, _parent: id});
  newReview.save()
    .catch((error) => {
      res.json({ error });
    });  
  StringModel.findByIdAndUpdate(id, { $push: { reviews: newReview._id }})
    .exec()
    .then((updatedString) => {
      res.json(updatedString)
    })
    .catch((error) => {
      res.json({ error });
  });   
});

server.put('/strings/:id/reviews/:reviewId', middleware.checkUserReview, (req, res) => {
  const id = req.params.reviewId;
  const { text } = req.body;
  Review.findByIdAndUpdate(id,{$set: {text}}, {new:true})
    .exec()
    .then((updatedReview) => {
      res.json(updatedReview)
    })
    .catch((error) => {
      res.json({ error });
    });   
});

server.delete('/strings/:id/reviews/:reviewId', middleware.checkUserReview, (req, res) => {
  const { id, reviewId } = req.params;
  StringModel.findById(id)
    .populate('reviews')
    .exec()
    .then((string) => {
      const index = string.reviews.findIndex(review => review._id == req.params.reviewId);
      const review = string.reviews.splice(index, 1)[0];
      string.save()
        .then(() => {
          review.remove()
            .then(() => {
              res.json(review);
            })
        })
    })
    .catch((error) => {
      res.json({ error });
    }); 
});

server.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username });
  User.register(newUser, password, (err, user) => {
    if(err){
      res.json({ err });
    }
    passport.authenticate("local")(req, res, function(){
       res.json({ user });
    });
  });
});

server.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.send(req.user);
});

server.get('/logout', (req, res) => {
  req.logout();
  res.send('logged out');
});

connect.then(() => {
  server.listen(5000);
  console.log('Server Listening on port 5000');
}, (error) => {
  console.log(error);
});
