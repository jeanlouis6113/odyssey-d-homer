const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require("./db.js");
const bcrypt = require('bcrypt');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function (email, password, cb) {
        connection.query("SELECT * FROM  users WHERE email = ? ", email, (err, results) => {
            if (err) {
                return cb(err);
            } else if (results.length === 0) {
                return cb(null, false, {
                    message: "Email or password wrong"
                });
            } else {
                if (bcrypt.compareSync(password, results[0].password)) {
                    const user = { email: email };
                    return cb(null, user, { message: "User Signed in" })
                } else {
                    return cb(null, false, {
                        message: "Email or password wrong"
                    });
                }
            }
        });

    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "password"
},

    function (jwtPayload, cb) {
        return cb(null, jwtPayload);
    }

));

module.exports = passport;