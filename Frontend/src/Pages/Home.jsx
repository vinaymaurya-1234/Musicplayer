import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../Style/Home.css";

const API = "http://localhost:3000";

const mediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API}/${url.replace(/^\/+/, "")}`;
};

function Home() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState(null);
  const audioRefs = useRef({});

  useEffect(() => {
    axios
      .get(`${API}/api/music/playall`)
      .then((res) => setSongs(res.data.musics || []))
      .catch((err) => console.log(err));
  }, []);

  const filtered = songs.filter((song) =>
    song.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const playSong = async (id) => {
    const audio = audioRefs.current[id];

    if (!audio) return;

    Object.entries(audioRefs.current).forEach(([key, item]) => {
      if (key !== String(id)) {
        item?.pause();
        if (item) item.currentTime = 0;
      }
    });

    if (playing === id) {
      audio.pause();
      setPlaying(null);
      return;
    }

    try {
      await audio.play();
      setPlaying(id);
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  const featured = songs[0];

  return (
    <main className="home-page">
      <div className="home-glow" />

      <section className="home-content">
        <div className="hero">
          <div className="hero-text">
            <span className="eyebrow">WELCOME TO MYMUSIC</span>

            <h1>
              Your music.
              <span>Your mood.</span>
            </h1>

            <p>Discover, play and enjoy your favourite tracks anytime.</p>

            <div className="search-box">
              <span>⌕</span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your music..."
              />

              {search && <button onClick={() => setSearch("")}>×</button>}
            </div>

            <div className="stats">
              <div>
                <b>{songs.length}</b>
                <span>Tracks</span>
              </div>

              <div>
                <b>♪</b>
                <span>Library</span>
              </div>

              <div>
                <b>∞</b>
                <span>Listening</span>
              </div>
            </div>
          </div>

          {featured && (
            <div className="featured">
              <div className="featured-cover">
                {featured.thumbnail ? (
                  <img
                    src={mediaUrl(featured.thumbnail)}
                    alt={featured.title}
                  />
                ) : (
                  <span>♪</span>
                )}

                <div className="disc" />
              </div>

              <span className="featured-label">FEATURED TRACK</span>

              <h2>{featured.title}</h2>

              <p>MyMusic Library</p>

              <button onClick={() => playSong(featured._id)}>
                {playing === featured._id ? "Ⅱ Pause" : "▶ Play Now"}
              </button>
            </div>
          )}
        </div>

        <div className="collection-head">
          <div>
            <span className="eyebrow">YOUR COLLECTION</span>
            <h2>All Songs</h2>
          </div>

          <span>{filtered.length} Tracks</span>
        </div>

        {filtered.length ? (
          <div className="music-grid">
            {filtered.map((song, index) => {
              const isPlaying = playing === song._id;

              return (
                <article
                  className={`music-card ${isPlaying ? "playing" : ""}`}
                  key={song._id}
                >
                  <div className="cover">
                    {song.thumbnail ? (
                      <img src={mediaUrl(song.thumbnail)} alt={song.title} />
                    ) : (
                      <span>♪</span>
                    )}

                    <button onClick={() => playSong(song._id)}>
                      {isPlaying ? "Ⅱ" : "▶"}
                    </button>

                    <audio
                      ref={(el) => {
                        if (el) audioRefs.current[featured._id] = el;
                      }}
                      src={mediaUrl(featured.uri)}
                      onEnded={() => setPlaying(null)}
                      preload="metadata"
                    />

                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </div>

                  <div className="song-info">
                    <h3>{song.title || "Untitled Song"}</h3>
                    <span>MyMusic</span>
                  </div>

                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[song._id] = el;
                    }}
                    src={mediaUrl(song.uri)}
                    onEnded={() => setPlaying(null)}
                    preload="metadata"
                  />
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty">
            <span>♪</span>
            <h3>No songs found</h3>
            <p>Try another search.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
