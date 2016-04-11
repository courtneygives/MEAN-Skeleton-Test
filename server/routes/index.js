var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/mean-skeleton-test');

router.get('/', function(request, response){
  console.log('Router test');
  response.sendFile(path.join(__dirname, '../views/index.html'));
console.log('Here is a console log');
});

var dog = mongoose.model('dog', {name:String});

router.post('/add', function(request, response, next){
  var puppy= new dog({name: request.body.name});
  puppy.save(function(err){
    if(err){
      console.log('Grrrr!', err);
    } response.send(puppy.toJSON());
    next();
  });
});

router.get('/dogs', function(request, response, next){
   return dog.find({}).exec(function(err, dogs){
       if(err) throw new Error(err);
       response.send(JSON.stringify(dogs));
       next();
   });
});


module.exports = router;
