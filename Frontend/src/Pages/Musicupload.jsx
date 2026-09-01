import { useState } from "react";
import "../Style/Musicupload.css";
import axios from "axios";

const UploadMusic = () => {
  const [music, setMusic] = useState(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setMusic(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!music) {
      alert("Please add music and title");
      return;
    }

    const formData = new FormData();
    formData.append("music", music);
    formData.append("title", title);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/music/upload",
        formData,
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      alert("Music uploaded successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
    <div className="Upload-Container">
      <label className="music-box">
        Input Music
        <input
          type="file"
          accept="audio/*"
          hidden
          onChange={handleFileChange}
        />
      </label>

      <input
        className="title-input"
        type="text"
        placeholder="Input title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
    </div>
  );
};

export default UploadMusic;
