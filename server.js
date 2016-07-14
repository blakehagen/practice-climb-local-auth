'use strict';

// MODULES & CONFIG //
var app      = require('./server/config/express.config.js')();
var passport = require('passport');
require('./server/config/db.config.js')();
require('./server/config/passport.config')(passport);

var port = 3400;

// INITIALIZE PASSPORT //
app.use(passport.initialize());
app.use(passport.session());


// ROUTES //
require('./server/features/auth/auth.server.routes')(app, passport);

app.get('/api/v1/test', function (req, res) {
  res.status(200).send('HELLO WORLD!')
});


// LISTEN //
app.listen(port, function () {
  console.log('Listening on port', port);
});