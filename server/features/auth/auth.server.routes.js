'use strict';

module.exports = function (app, passport) {


  //======================//
  // USER SIGN UP ROUTES //
  //=====================//

  // USER SIGN UP //
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/registerSuccess',
      failureRedirect: '/registerFailure'
    })
  );

  // USER SIGN UP FAILURE ROUTE //
  app.get('/registerFailure', function (req, res) {
    res.send('Unable to create new user');
  });

  // USER SIGN UP SUCCESS ROUTE //
  app.get('/registerSuccess', function (req, res) {
    console.log('**** ==== CREATE NEW USER SUCCESS! ==== ****');
    res.status(200).json({user: req.user});
  });

  //====================//
  // USER LOGIN ROUTES //
  //===================//

  app.post('/login',
    passport.authenticate('local-login', {
      successRedirect: '/loginSuccess',
      failureRedirect: '/loginFailure'
    })
  );

  // USER LOGIN FAILURE ROUTE //
  app.get('/loginFailure', function (req, res) {
    res.send('Failed to authenticate');
  });

  // USER LOGIN SUCCESS ROUTE //
  app.get('/loginSuccess', function (req, res) {
    console.log('**** ==== LOGIN SUCCESS! ==== ****');
    res.status(200).json(req.user);
  });

  //===================//
  // USER LOGOUT ROUTES //
  //==================//
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


};