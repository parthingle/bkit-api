import passport from "passport";
import * as JWT from "../auth/jwt";
import keys from "../config/keys";
import unless from "express-unless";
var FacebookTokenStrategy = require("passport-facebook-token");

JWT.authenticateUser.unless = unless;

export const setStrategy = () => {
    passport.use(
        new FacebookTokenStrategy(
            {
                clientID: keys.FB_APP_ID,
                clientSecret: keys.FB_APP_SECRET
            },
            verify_callback
        )
    );
};

export const verify_callback = async (
    accessToken,
    refreshToken,
    profile,
    next
) => {
    // Use `profile` to get facebook data (profile.id, profile.givenName, etc.)
    let err = null;
    let user;

    // If User exists in database, set to `user`, otherwise set user to:
    user = {
        profileId: profile.id,
        firstName: profile.givenName,
        lastName: profile.familyName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0].value,
        signupComplete: false
    };
    return next(err, user);
};
