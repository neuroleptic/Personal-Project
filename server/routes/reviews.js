const express = require('express');
const router = express.Router({mergeParams: true});
const StringModel = require('../models/stringModel');
const Review = require('../models/reviewModel');
const middleware = require('../middleware');

router.post('/', middleware.isLoggedIn, (req, res) => {
  const { id } = req.params;
  const { text, rating } = req.body;
  const author = req.user;
  const newReview = new Review({ text, rating, author, _parent: id});
  newReview.save()
    .catch((error) => {
      res.json({ error });
    });  
  StringModel.findByIdAndUpdate(id, { $push: { reviews: newReview._id }})
    .exec()
    .then((updatedString) => {
      StringModel.findById(id)
        .populate('reviews')
        .exec()
        .then((string) => {
          let sum = 0;
          for(let i = 0; i < string.reviews.length; i++){
            sum += string.reviews[i].rating;
          }
          const average = string.reviews.length != 0 ? sum / string.reviews.length : 0;
          string.rating = average;
          string.save();
          res.json(string);
        })
    })
    .catch((error) => {
      res.json({ error });
  });   
});

router.put('/:reviewId', middleware.checkUserReview, (req, res) => {
  const { id, reviewId } = req.params;
  const { text, rating  } = req.body;
  Review.findByIdAndUpdate(reviewId, {$set: {text, rating}}, {new:true})
    .exec()
    .then((updatedReview) => {          
      StringModel.findById(id)
      .populate('reviews')
      .exec()
      .then((string) => {
        let sum = 0;
        for(let i = 0; i < string.reviews.length; i++){
          sum += string.reviews[i].rating;
        }
        const average = string.reviews.length != 0 ? sum / string.reviews.length : 0;
        string.rating = average;
        string.save();
        res.json(string);        
      })
    })
    .catch((error) => {
      res.json({ error });
    });   
});

router.delete('/:reviewId', middleware.checkUserReview, (req, res) => {
  const { id, reviewId } = req.params;
  StringModel.findById(id)
    .populate('reviews')
    .exec()
    .then((string) => {
      const index = string.reviews.findIndex(review => review._id == req.params.reviewId);
      const review = string.reviews.splice(index, 1)[0];
      let sum = 0;
      for(let i = 0; i < string.reviews.length; i++){
        sum += string.reviews[i].rating;
      }
      const average = string.reviews.length != 0 ? sum / string.reviews.length : 0;
      string.rating = average;
      string.save()
        .then(() => {
          review.remove()
            .then(() => {
              res.json(string);
            })
        })
        .catch((error) => {
          res.json({ error });
        }); 
    })
    .catch((error) => {
      res.json({ error });
    }); 
});

module.exports = router;