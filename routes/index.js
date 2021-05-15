var express = require('express');
var router = express.Router();
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

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
  // const token = req.headers.authorization

  // function verifyToken(req, res, next) {
  //   var token = req.header('token');
  //   if(!token) return res.status(401).send('Access Denied');
  //   try {
  //       token = jwt.verify(token, process.env.TOKEN_SECRET);
  //       res.accessToken = token.accessToken;
  //       next();
  //   } catch {
  //       res.status(400).send('Invalid Token');
  //   }
  // // }

  // verifyToken();
  // console.log(token);

  // var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDljZWEwYjY3ZmM3MzA2MWM1NDNjZmYiLCJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2MjEwMjI3Njd9.rIoh6ClDRyqiLD8IesYS6qwX1MrEq-7B2eczmsPPXPg";
  // console.log(req);
  // res.render('leaderboard', res);
  // var decoded = jwt_decode(token);
  // console.log(decoded);
  // const { user } = jwt.verify(token, 'MyVerySecretWord')
  // if(req.user = user){

  // }
  // else{
  //   res.render('login');
  // }

  // const { token } = req.params
  // res.json({ jwt: token });

  // jwt.verify(uid, username, "MyVerySecretWord",(err, verifiedJwt) => {
  //   if(err){
  //     res.send(err.message)
  //   }else{
  //     res.send(verifiedJwt)
  //   }
  // })
  // if(localStorage.getItem('token')){
  // }else{
  //   res.render('login');
  // }
});


// try {
//   const token = req.headers.authorization || req.cookies.auth
//   const { user } = await jwt.verify(token, 'MyVerySecretWord')
//   req.person = user
//   return req.next()
// } catch (e) {
//   return req.next()
// }

module.exports = router;
