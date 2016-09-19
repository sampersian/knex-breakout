var express = require('express');
var router = express.Router();

var queries = require('../db/query.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {
  queries.getAllPosts()
  .then(function(data) {
    res.render('posts', {posts: data})
  })
})

router.get('/posts/:id', function(req, res, next) {
  queries.getSinglePost(req.params.id)
  .then(function(data) {
    res.render('post', {post: data[0]})
  })
})

router.get('/user/:id', function(req, res, next) {
  queries.getAllUserInteraction(req.params.id)
  .then(function(data) {
    console.log(data);
    res.render('user', {user: data})
  })
})

module.exports = router;
