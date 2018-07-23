var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  const db = req.app.locals.db;

  db.collection('students').find({}).toArray(function(error, result) {
    console.log(result);
    res.render('index', {students: result});
  });
});

router.post('/add', function(req, res, next) {

  const db = req.app.locals.db;

  db.collection('students').insertOne({
    name: req.body.name,
    age: +req.body.age
  });

  res.redirect('/');
});

module.exports = router;
