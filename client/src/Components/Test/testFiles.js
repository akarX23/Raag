import React, { useState } from "react";
import { storage } from "../../firebase";

const TestFiles = () => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const nameToUpload = image.name + Date.now();
    const uploadTask = await storage.ref(`images/${nameToUpload}`).put(image);
    console.log(uploadTask);
    await storage
      .ref("images")
      .child(nameToUpload)
      .getDownloadURL()
      .then((url) => console.log(url));
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {},
    //   (error) => {
    //     console.log(error);
    //   },
    //   async () => {
    //     await storage
    //       .ref("images")
    //       .child(nameToUpload)
    //       .getDownloadURL()
    //       .then((url) => console.log(url));
    //   }
    // );
  };

  console.log("Image : " + image);

  return (
    <div className="bg-white">
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default TestFiles;
