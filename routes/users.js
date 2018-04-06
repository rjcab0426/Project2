var express = require('express');
var router = express.Router();
var Q = require('q');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var User = require('../models/User');
var _ = require('lodash');

router.post('/register', (req, res) => {
    create(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

router.post('/login', (req, res) => {
  //get the username and password from 'req.body'

  //query the databse for validity of the username and password
    //If the username and password is invalid return err with 400 status
    //else generate a token and send it as response along with certain user data

  authenticate(req.body.username, req.body.password)
    .then( function (user) {
      if(user) {
        res.send(user)
      } else {
        res.status(400).send('Username or password is incorrect')
      }
    })
    .catch(function (err) {
      res.status(400).send(err)
    })
})

function create(userParam) {
  var deferred = Q.defer();

  // validation
  User.findOne(
      { username: userParam.username },
      function (err, user) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          if (user) {
              // username already exists
              deferred.reject('Username "' + userParam.username + '" is already taken');
          } else {
              createUser();
          }
      });

  function createUser() {
      // set user object to userParam without the cleartext password
      var user = _.omit(userParam, 'password');

      // add hashed password to user object
      user.hash = bcrypt.hashSync(userParam.password, 10);

      User.create(
          user,
          function (err, doc) {
              if (err) deferred.reject(err.name + ': ' + err.message);

              deferred.resolve();
          });
  }

  return deferred.promise;
}

function authenticate(username, password) {
  var deferred = Q.defer();
 
    User.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // if(user) {
        //   deferred.resolve({
        //       _id: user._id,
        //       username: user.username,                
        //       token: jwt.sign({ sub: user._id }, 'abcd123secret')
        //   });
        // } else {
        //   deferred.resolve();
        // }        

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,                
                token: jwt.sign({ sub: user._id }, 'abcd123secret')
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

module.exports = router;
