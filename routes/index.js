var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('sign-up', { title: 'Express' });
  console.log(req.session);
  console.log(req.sessionID);
  res.send("This is the default page")
});

module.exports = router;
