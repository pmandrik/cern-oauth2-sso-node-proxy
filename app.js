const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('./passport-oauth2');
const app = express();
const port = 3000;

passport.use(
    new OAuth2Strategy(
        {
            authorizationURL: 'https://oauth.web.cern.ch/OAuth/Authorize',
            tokenURL: 'https://oauth.web.cern.ch/OAuth/Token',
            clientID: 'cmsdqmrunregistry',
            clientSecret: 'fOR1Xy8gmrPZ0kxtTt05eIQbrwaUyPIZc0VXYh5cuWY1',
            callbackURL: 'https://cmsrunregistry.web.cern.ch/'
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log('made it');
            console.log('accesstoken', accessToken);
            console.log('refreshtoken', refreshToken);
            console.log('profile', profile);
            cb(null, profile);
        }
    )
);

// app.get('/', (req, res) => {
//     console.log('get /');
//     res.send('SSO Hello world');
// });
app.get(
    '/callback',
    passport.authenticate('oauth2', {
        failureRedirect: '/error'
    }),
    function(req, res) {
        console.log('success');
        console.log(req.user);
        res.redirect('/something');
    }
);
app.get('/something', passport.authenticate('oauth2'), (req, res) => {
    res.send('made it');
});

app.post('/callback', (req, res) => {
    console.log(req);
    console.log(res);
});
app.listen(port, () => console.log('SSO Hello world started'));
