const express = require('express');
const router = express.Router();
const StringModel = require('../models/stringModel');
const Review = require('../models/reviewModel');
const middleware = require('../middleware');

router.post('/', middleware.isLoggedIn, (req, res) => {
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

router.get('/', (req, res) => {
  StringModel.find()
    .exec() 
    .then((strings) => {
      res.json(strings)
    })
    .catch((error) => {
      res.json({ error });
    });
});

router.get('/:id', (req, res) => {
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

router.put('/:id', middleware.checkUserString, (req, res) => { 
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

router.delete('/:id', middleware.checkUserString, (req, res) => { 
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

module.exports = router;