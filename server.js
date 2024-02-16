const fs = require('fs');
const path = require('path');
const https = require('https');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const { Strategy } = require('passport-google-oauth20');
// const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
// const ensureLoggedIn = ensureLogIn();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const config = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    COOKIE_KEY1: process.env.COOKIE_KEY1,
    COOKIE_KEY2: process.env.COOKIE_KEY2,
}
const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
}
// the verifyCallback function allow to save profile information
const verifyCallback = (accessToken, refreshToken, profile, done) => {
    // console.log("Google profile: ", profile);
    done(null, profile); // first argument if any error exists, second argument - ggogle profile
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

//Save a session into a cookie
passport.serializeUser((user, done) => {
    done(null, user.id);  //setting cookie
})
//Read a session from a cookie
passport.deserializeUser((id, done) => {
    done(null, id); // extract from cookie
})

const app = express();

app.use(helmet());
app.use(cookieSession({
    name: 'mysession',
    maxAge: 24 * 60 * 60 * 1000, // seconds
    keys: [ config.COOKIE_KEY1, config.COOKIE_KEY2 ], // secret key for sign a cookie
}));

// this piece of code required to ensure `cookie-session` will correctly work with `passport.session`
app.use((req, res, next) => {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb();
        }
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb();
        }
    }
    next();
})
// end of the code

app.use(passport.initialize());
app.use(passport.session()); // setting `req.user` object. The user is from passport.deserializeUser function

const checkLoggedIn = (req, res, next) => { // receives req.user from passport.session
    // console.log('current user: ', req.user);
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        return res.status(401).json({
            error: "You have to log in"
        });
    }
    next();
}

app.get("/auth/google", passport.authenticate('google', {
    scope: ['email']
}));

app.get("/auth/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/',
        session: true,
    })
);

app.get("/auth/logout", (req, res, next) => {
    req.logout((err) => { //remove req.user and clear any logged in session
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

app.get("/secret", checkLoggedIn, (req, res) => {
    res.send("This is your secret value: 42");
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/failure", (req, res) => {
    res.send("The use failed to log in");
})

const server = https.createServer({
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem'),
}, app);

server.listen(PORT, () => {
    console.log(`The app listening on port ${PORT}`);
})