import { useEffect, useState } from "react";
import axios from "axios";
import "../Style/Allmusic.css";

function AllMusic() {

  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/music/Playall")
      .then(res => {
        setSongs(res.data.musics);
      });
  }, []);


  const filteredSongs = songs.filter(song =>
    song.title &&
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="music-page">

      {/* Search Bar */}

      <input
        className="search-bar"
        type="text"
        placeholder="🔍 Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {/* Songs List */}

      <div className="songs-list">

        {filteredSongs.map(song => (

          <div className="song-card" key={song._id}>

            <p className="song-title">{song.title}</p>

            <audio controls src={song.uri}></audio>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AllMusic;