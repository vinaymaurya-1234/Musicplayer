import { useState } from "react";
import axios from "axios";
import "../Style/Musicupload.css";

const UploadMusic = () => {
  const [music, setMusic] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (!music || !title.trim()) {
      alert("Please add music and title");
      return;
    }

    const formData = new FormData();

    formData.append("music", music);
    formData.append("title", title.trim());

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const res = await axios.post(
        "https://musicplayer-1-hc8h.onrender.com/api/music/upload",
        formData,
        {
          withCredentials: true,
        },
      );

      console.log(res.data);

      alert("Music uploaded successfully!");

      setMusic(null);
      setThumbnail(null);
      setTitle("");
    } catch (error) {
      console.log("Upload error:", error.response?.data || error);
      alert("Upload failed");
    }
  };

  return (
    <main className="upload-page">
      <div className="upload-card">
        <div className="upload-heading">
          <span>MYMUSIC</span>
          <h1>Upload your track</h1>
          <p>Add a song to your personal music library.</p>
        </div>

        {/* Music */}
        <label className="file-box">
          <div className="file-icon">♫</div>

          <div className="file-content">
            <strong>{music ? music.name : "Choose music"}</strong>
            <small>MP3, WAV or other audio files</small>
          </div>

          <input
            type="file"
            accept="audio/*"
            hidden
            onChange={(e) => setMusic(e.target.files[0] || null)}
          />
        </label>

        {/* Thumbnail */}
        <label className="file-box">
          <div className="file-icon">▣</div>

          <div className="file-content">
            <strong>{thumbnail ? thumbnail.name : "Add cover image"}</strong>
            <small>JPG, PNG or WEBP • Optional</small>
          </div>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setThumbnail(e.target.files[0] || null)}
          />
        </label>

        {/* Title */}
        <div className="input-group">
          <label>Track title</label>

          <input
            type="text"
            placeholder="Enter song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!music || !title.trim()}
        >
          Upload Track <span>→</span>
        </button>
      </div>
    </main>
  );
};

export default UploadMusic;
