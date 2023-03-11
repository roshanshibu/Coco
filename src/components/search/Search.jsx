import React, { useState } from "react";
import "./Search.css";
import musicData from "../../data/musicData.json";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songResults, setSongResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [lyricResults, setLyricResults] = useState([]);

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
  };

  return (
    <div className="music-search">
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <div className="results-container">
        <SongResults songs={songResults} />
        <ArtistResults artists={artistResults} />
        <LyricResults lyrics={lyricResults} />
      </div>
    </div>
  );
};

const SongResults = ({ songs }) => {
  return (
    <div className="song-results">
      <h2>Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

const ArtistResults = ({ artists }) => {
  return (
    <div className="artist-results">
      <h2>Artists</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

const LyricResults = ({ lyrics }) => {
  return (
    <div className="lyric-results">
      <h2>Lyrics</h2>
      <ul>
        {lyrics.map((lyric) => (
          <li key={lyric.id}>{lyric.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
