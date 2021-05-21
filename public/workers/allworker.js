const uploadVideo = (file) => {
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
          console.log("UPLOADED!");
        } else {
          console.error("Upload failed.");
        }
      });
    });
};

uploadAll = ({ thumbRefs }) => {
  thumbRefs.forEach((ref) => {
    uploadVideo(ref.file);
  });
};

addEventListener("message", (event) => {
  console.log("GOT IT");
  postMessage(uploadVideo(event.data));
});
