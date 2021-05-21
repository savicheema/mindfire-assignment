const uploadVideo = (file) => {
  return new Promise((resolve, reject) => {
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
          console.log("UPLOAD RESPONSE", upload);
          if (upload.ok) {
            console.log("UPLOADED!");
            resolve();
          } else {
            console.error("Upload failed.");
            reject();
          }
        });
      });
  });
};

const uploadAll = ({ files }) => {
  const allUploadPromise = files.map((file) => uploadVideo(file));

  Promise.all(allUploadPromise)
    .then(() => {
      postMessage("done!");
    })
    .catch(() => {
      postMessage("Failed!");
    });
};

addEventListener("message", (event) => {
  console.log("GOT IT");
  uploadAll(event.data);
});
