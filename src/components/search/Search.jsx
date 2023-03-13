import React, { useState } from "react";
import "./Search.css";
import musicData from "../../data/songData.json";
import playIcon from "../../play.png";
import pauseIcon from "../../pause.png";
import artistIcon from "../../artist.png";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songResults, setSongResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [lyricResults, setLyricResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    const filteredSongs = musicData.songs.filter((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSongResults(filteredSongs);

    const filteredArtists = musicData.artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setArtistResults(filteredArtists);

    const filteredLyrics = musicData.lyrics.filter((lyric) =>
      lyric.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setLyricResults(filteredLyrics);

    setShowResults(true);
  };

  return (
    <div className="search">     
      <input type="text" placeholder="Search a Song" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {showResults && (
        <div className="results-container">
          <div className="toggle-button" onClick={() => setShowResults(false)}>
            Hide Results
          </div>
          <div className="results">
            <SongResults songs={songResults} />
            <ArtistResults artists={artistResults} />
            <LyricResults lyrics={lyricResults} />
          </div>
        </div>
      )}
    </div>
  );
};

const SongResults = ({ songs }) => {
    const [showSongs, setShowSongs] = useState(true);
    const [playStates, setPlayStates] = useState({});
  
    const handlePlayPause = (id) => {
      setPlayStates((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };

  return (
    <div className="song-results">
      <div className="toggle-button" onClick={() => setShowSongs(!showSongs)}>
        {showSongs ? "Hide Songs" : "Show Songs"}
      </div>
      {showSongs && (
        <ul>
              {songs.map((song) => (
              <li key={song.id}>
                <button onClick={() => handlePlayPause(song.id)}>
                  {playStates[song.id] ? (
                    <img src={pauseIcon} alt="pause" />
                  ) : (
                    <img src={playIcon} alt="play" />
                  )}
                </button>
                {song.image && (
                  <img src={song.image} alt={song.title} />
                )}
                {song.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

const ArtistResults = ({ artists }) => {
  const [showArtists, setShowArtists] = useState(false);

  return (
    <div className="artist-results">
      <div className="toggle-button" onClick={() => setShowArtists(!showArtists)}>
        <h2>{showArtists ? "Hide Artists" : "Show Artists"}</h2>
      </div>
      {showArtists && (
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>
              {artistIcon && (
                <img src={artistIcon} alt={artist.name} style={{ paddingRight: '10px' }}/>
              )}
              {artist.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const LyricResults = ({ lyrics }) => {
  const [showLyrics, setShowLyrics] = useState(false);

  return (
    <div className="lyric-results">
      <div className="toggle-button" onClick={() => setShowLyrics(!showLyrics)}>
      <h2> {showLyrics ? "Hide Lyrics" : "Show Lyrics"} </h2> 
      </div>
      {showLyrics && (
        <ul>
          {lyrics.map((lyric) => (
            <li key={lyric.id}>{lyric.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
