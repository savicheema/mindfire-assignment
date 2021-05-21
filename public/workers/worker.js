// const pi = (n) => {
//   var v = 0;
//   for (let i = 1; i <= n; i += 4) {
//     // increment by 4
//     v += 1 / i - 1 / (i + 2); // add the value of the series
//   }
//   return 4 * v; // apply the factor at last
// };
const initFireBaseApp = () => {
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

const updateData = () => {
  return new Promise((resolve, reject) => {
    initFireBaseApp().then(() => {
      const db = firebase.firestore();

      console.log("UPDATE DATA", data);
      db.collection("users")
        .doc(doc)
        .set(data)
        .then(resolve)
        .catch((error) => {
          console.error("Error adding document: ", error);
          reject();
        });
    });
  });
};

const uploadVideo = ({ file, profile }) => {
  const propertyFilename = `property/${encodeURIComponent(file.name)}`;
  fetch(`/api/upload/s3?file=${propertyFilename}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { url, fields } = data;

      const formData = new FormData();

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      fetch(url, {
        method: "POST",
        body: formData,
      }).then((upload) => {
        if (upload.ok) {
          postMessage("uploaded!");

          // if (profile.userProperty && profile.userProperty.videos) {
          //   profile.userProperty.videos.push(propertyFilename);
          //   updateData(profile.email, { ...profile });
          // } else if (!profile.userProperty) {
          //   const property = {
          //     videos: [],
          //   };
          //   property.videos.push(propertyFilename);
          //   profile.userProperty = property;
          //   updateData(profile.email, { ...profile });
          // } else if (!profile.userProperty.videos) {
          //   const videos = [];
          //   videos.push(propertyFilename);
          //   profile.userProperty.videos = videos;
          //   updateData(profile.email, { ...profile });
          // } else {
          //   console.error("Don't know what to upload");
          // }
        } else {
          console.error("Upload failed.");
        }
      });
    });
};

addEventListener("message", (event) => {
  uploadVideo(event.data);
});
