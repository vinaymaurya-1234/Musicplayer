import { useEffect, useState } from "react";
import axios from "axios";
import "../Style/Home.css";

function Home() {

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/music/playall")
      .then(res => setSongs(res.data.musics))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-container">

      <h1>All Songs</h1>

      <div className="music-grid">

        {songs.map(song => (
          <div className="music-card" key={song._id}>

            <img src={song.thumbnail} alt="thumb"/>

            <h3>{song.title}</h3>

            <audio controls src={song.audio}></audio>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;