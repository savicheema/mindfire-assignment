export const analytics = () => {
  firebase.analytics();
};

export const initFireBaseApp = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  firebase.initializeApp(firebaseConfig);
};

export const getDatabase = () => {
  return firebase.database();
};
