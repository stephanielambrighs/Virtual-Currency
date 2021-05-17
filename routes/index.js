var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('test');
});

/* GET transfer page. */
router.get('/transfer', function(req, res, next) {
  res.render('transfer');
});

/* GET history page. */
router.get('/history', function(req, res, next) {
  res.render('history');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/leaderboard', function(req, res, next) {
  res.render('leaderboard');
});

router.get('/transferDetail', function(req, res, next) {
  res.render('transferDetail');
});

module.exports = router;
