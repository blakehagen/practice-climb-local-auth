'use strict';

module.exports = function (app, passport) {

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


};