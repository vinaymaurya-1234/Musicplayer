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
  const [showAll, setShowAll] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRefs = useRef({});
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    axios
      .get(`${API}/api/music/playall`)
      .then((res) => setSongs(res.data.musics || []))
      .catch((err) => console.log(err));
  }, []);

  const filtered = songs.filter((song) =>
    song.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const visibleSongs = search || showAll ? filtered : filtered.slice(0, 8);

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
      setCurrentIndex(songs.findIndex((song) => song._id === id));
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  const nextSong = () => {
    if (!songs.length) return;

    const next = currentIndex >= songs.length - 1 ? 0 : currentIndex + 1;
    setProgress(0);
    playSong(songs[next]._id);
  };

  const previousSong = () => {
    if (!songs.length) return;

    const prev = currentIndex <= 0 ? songs.length - 1 : currentIndex - 1;
    setProgress(0);
    playSong(songs[prev]._id);
  };

  const seekSong = (e) => {
    const audio = audioRefs.current[currentSong?._id];
    if (!audio) return;

    audio.currentTime = Number(e.target.value);
    setProgress(audio.currentTime);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${String(sec).padStart(2, "0")}`;
  };

  const currentSong = currentIndex >= 0 ? songs[currentIndex] : null;
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

        {visibleSongs.length ? (
          <>
            <div className="music-grid">
              {visibleSongs.map((song, index) => {
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
                      onTimeUpdate={(e) => {
                        if (playing === song._id) {
                          setProgress(e.target.currentTime);
                        }
                      }}
                      onLoadedMetadata={(e) => {
                        if (playing === song._id) {
                          setDuration(e.target.duration);
                        }
                      }}
                      onEnded={nextSong}
                      preload="metadata"
                    />
                  </article>
                );
              })}
            </div>

            {!search && filtered.length > 8 && (
              <button
                className="view-all-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "Show All Songs"}
              </button>
            )}
          </>
        ) : (
          <div className="empty">
            <span>♪</span>
            <h3>No songs found</h3>
            <p>Try another search.</p>
          </div>
        )}
      </section>

      {currentSong && (
        <div className="music-player">
          <div className="player-song">
            {currentSong.thumbnail ? (
              <img
                src={mediaUrl(currentSong.thumbnail)}
                alt={currentSong.title}
              />
            ) : (
              <div className="player-placeholder">♪</div>
            )}

            <div>
              <strong>{currentSong.title}</strong>
              <span>MyMusic</span>
            </div>
          </div>

          <div className="player-center">
            <div className="player-controls">
              <button onClick={previousSong}>⏮</button>

              <button
                className="main-play"
                onClick={() => playSong(currentSong._id)}
              >
                {playing === currentSong._id ? "Ⅱ" : "▶"}
              </button>

              <button onClick={nextSong}>⏭</button>
            </div>

            <div className="progress-area">
              <span>{formatTime(progress)}</span>

              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={seekSong}
                className="progress"
                style={{
                  "--progress": duration
                    ? `${(progress / duration) * 100}%`
                    : "0%",
                }}
              />

              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="player-status">
            {playing === currentSong._id ? "NOW PLAYING" : "PAUSED"}
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
