// var firebase;
/* global firebase */
import firebase from "firebase";

export const analytics = () => {
  firebase.analytics();
};

export const initFireBaseApp = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  return new Promise((resolve) => {
    var firebaseConfig = {
      apiKey: "AIzaSyD6-Zxkwv69JqTtvSvxgmbwu1MA2LJA4CY",
      authDomain: "mindfire-1.firebaseapp.com",
      databaseURL:
        "https://mindfire-1-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "mindfire-1",
      storageBucket: "mindfire-1.appspot.com",
      messagingSenderId: "793335194559",
      appId: "1:793335194559:web:a51309b218c4dc3ed5770a",
      measurementId: "G-1FSZYD8HNC",
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    console.log("init firebase");
    resolve();
  });
};

// initFireBaseApp();

export const googleAuthFirebase = (googleUser) => {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();

    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.getAuthResponse().id_token
      );

      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((response) => {
          console.log("Firebase auth response", response);
          window.location = "/user/profile";
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...

          console.error(
            "Firebase error",
            errorCode,
            errorMessage,
            email,
            credential
          );
        });
    } else {
      window.location = "/user/profile";
    }
  });
};

export const getDatabase = () => {
  return firebase.firestore();
};

export const addData = (userInfo) => {
  return new Promise((resolve) => {
    initFireBaseApp().then(() => {
      const db = firebase.firestore();

      console.log("ADD DATA", userInfo);
      db.collection("users")
        .doc(userInfo.email)
        .set(userInfo)
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      resolve();
    });
  });
};

export const getData = (userId) => {
  return new Promise((resolve, reject) => {
    initFireBaseApp().then(() => {
      const db = firebase.firestore();

      var docRef = db.collection("users").doc(userId);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            console.log("Document data:", data);
            resolve(data);
            return;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          reject(1);
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          reject(2);
        });
    });
  });
};

export const updateData = (doc, data) => {
  const db = firebase.firestore();

  console.log("UPDATE DATA", data);
  db.collection("users")
    .doc(doc)
    .set({ ...data, basketball: "game" })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}
