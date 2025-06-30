//ce fichier va dans plugins
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'
// import { firebase } from "firebase/firestore";

// export default defineNuxtPlugin(() => {
//     const firebaseConfig = {
//         apiKey: "AIzaSyDyGtsOSLSyUdszfp_xXQSi76bQFuHFQuQ",
//       authDomain: "staging-tcso.firebaseapp.com",
//       databaseURL: "https://staging-tcso.firebaseio.com",
//       projectId: "staging-tcso",
//       storageBucket: "staging-tcso.firebasestorage.app",
//       messagingSenderId: "638341825999",
//       appId: "1:638341825999:web:6e9caf22bea2ac7e49beba"
//     };

    // initialize firebase
//     const app = initializeApp(firebaseConfig);
//     const db = getFirestore(app)



//     return {
//         provide: {
//             firebaseAppli: app,
//             db
//         }
//     }
// })

// plugins/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
  };

  let app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  const db = getFirestore(app);
  console.log('Plugin firebase.js - Firestore instance:', db);

  return {
    provide: {
      firestore: db, // Injecter l'instance Firestore sous la clé 'firestore'
    },
  };
});