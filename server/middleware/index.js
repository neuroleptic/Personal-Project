const StringModel = require("../models/stringModel");
const Review = require("../models/reviewModel");

module.exports = {
  isLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()){
      return next();
    }
    res.send('not logged in');
  },
  checkUserString: (req, res, next) => {
    if(req.isAuthenticated()){
      StringModel.findById(req.params.id)
        .exec()
        .then((string) => {
          if(string.author.equals(req.user._id)){
            next();
          } else {
            res.send('you are not authorized!');
          }
        })
        .catch((error) => {
          res.json({ error });
        });
    } else {
      res.send('you must be logged in!');
    }
  },
  checkUserReview: (req, res, next) => {
    if(req.isAuthenticated()){
      Review.findById(req.params.reviewId)
        .exec()
        .then((review) => {
          if(review.author.equals(req.user._id)){
            next();
          } else {
            res.send('you are not authorized!');
          }
        })
        .catch((error) => {
          res.json({ error });
        });
    } else {
      res.send('you must be logged in!');
    }
  }
}