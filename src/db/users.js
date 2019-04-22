import { USERS } from "../config/firebase";

export const getProfile = async (req, res) => {
    var err, User, userSnapshot;
    try {
        userSnapshot = await USERS.where('profileId', '==', req.id).get();
        if (userSnapshot.empty) {
            User = null;
        } else {
            User = userSnapshot.docs[0].data();
        }
    } catch (error) {
        err = error;
    }

    return(err, User);
}