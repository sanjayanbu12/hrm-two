// UploadForm.jsx

import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "./Constant";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    for (let key in videos) {
      formData.append("videos", videos[key]);
    }

    formData.append("name", name);

    axios
      .post(`${BACKEND_URI}/api/v1/learn/create`, formData)
      .then((response) => {
        console.log(response)
        // getAllMedias(); // Call the function to update media list
        alert("Submitted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="videos">Upload Videos</label>
        <input
          type="file"
          name="videos"
          id="videos"
          multiple
          className="form-control"
          accept=".mp4, .mkv"
          onChange={(e) => {
            setVideos(e.target.files);
          }}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
    </form>
  );
};

export default UploadForm;
