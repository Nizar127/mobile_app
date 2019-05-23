import Firebase from 'firebase';



const config = {
    apiKey: "AIzaSyCFLR3mTX1VDFSVfaVhOcyf0u1Hcfn6of8",
    authDomain: "pictr-239508.firebaseapp.com",
    databaseURL: "https://pictr-239508.firebaseio.com",
    projectId: "pictr-239508",
    storageBucket: "pictr-239508.appspot.com",
    messagingSenderId: "278814298815",
    appId: "1:278814298815:web:948c901f3aa6040e"
};
//firebase.initializeApp(config);

let app = Firebase.initializeApp(config);
export const db = app.database()