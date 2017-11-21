const express = require('express');
const router = express.Router({mergeParams: true});
const StringModel = require('../models/stringModel');
const Review = require('../models/reviewModel');
const middleware = require('../middleware');

router.post('/', middleware.isLoggedIn, (req, res) => {
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

router.put('/:reviewId', middleware.checkUserReview, (req, res) => {
  const id = req.params.reviewId;
  const { text } = req.body;
  Review.findByIdAndUpdate(id, {$set: {text}}, {new:true})
    .exec()
    .then((updatedReview) => {
      res.json(updatedReview)
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

module.exports = router;