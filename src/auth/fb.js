import passport from "passport";
import * as JWT from "../auth/jwt";
import keys from "../config/keys";
import unless from "express-unless";
import * as Users from "../db/userFunctions";
const FacebookTokenStrategy = require("passport-facebook-token");

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
    let user, err;
    user = await Users.getProfileFromId(profile.id);
    if (!user) {
        // If User exists in database, set to `user`, otherwise set user to:
        user = {
            profileId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            bio: "I'm a chump",
            dateCreated: Date.now(),
            signupComplete: true,
            lastLogin: Date.now(),
            myBucketedItems: [],
            friends: []
        };
        try {
            await Users.createNewUser(user);
        } catch (error) {
            err = new Error("Database error!");
        }
    }
    Users.timestampProfile(user.profileId, "lastLogin");
    return next(err, user);
};
