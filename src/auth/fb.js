import passport from 'passport';
import * as JWT from '../auth/jwt';
import keys from '../config/keys';
var FacebookTokenStrategy = require('passport-facebook-token');


export const setStrategy = () => {
    passport.use(new FacebookTokenStrategy(
        {
            clientID: keys.FB_APP_ID,
            clientSecret: keys.FB_APP_SECRET
        },
        verify_callback));
}

export const verify_callback = async (profile, done) => {
    let err = null;
    let user;
    let user_snapshot = await firebase.users.where('profileId', '==', profile.id).get();
    console.log(user_snapshot.empty);
    if (user_snapshot.empty) {
        // //setting user for now
        user = {
            'profileId': profile.id,
            'firstName': profile.name.givenName,
            'lastName': profile.name.familyName,
            'email': profile.emails[0].value,
            'profilePic': profile.photos[0].value,
            'signUpComplete': false
        };
        console.log("User Does Not Exist. Forwarding to signup...");
        err = null;
    }
    else if (user_snapshot.size > 1) {
        user = null;
        err = new Error("Same profile ID for more than one user in database");
    }
    else {
        user = user_snapshot.docs[0].data();
        err = null;
    }
    return done(err, user);
}
