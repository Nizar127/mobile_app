import { db } from './config';
//import { Actions } from 'react-native-router-flux';




export const updatePost =  (uid, name, description, imgURL) => {
    db.ref('/items').child(uid).update({
        uid: uid,
        name: name,
        description: description,
        imgURL: imgURL,
    }, () => Actions.Feed());
}

export const removePost =  (uid) => {
    db.ref('/items').child(uid).remove();
    Actions.Feed();
}