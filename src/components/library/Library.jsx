import React, { useState } from "react";
import musicData from "../../data/musicData.json";
import "./Library.css";

const Playlist = ({ playlist }) => {
  return (
    <div className="music-library-playlist">
      <div className="music-library-playlist-name">{playlist.name}</div>
      <div className="music-library-playlist-length">
        {playlist.songs.length} songs
      </div>
      <div className="music-library-playlist-songs">
        {playlist.songs.map((song) => (
          <div className="music-library-playlist-song" key={song.id}>
            <div className="music-library-playlist-song-title">{song.title}</div>
            <div className="music-library-playlist-song-artist">{song.artist}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Download = ({ download }) => {
  return (
    <div className="music-library-download">
      <div className="music-library-download-name">{download.name}</div>
      <div className="music-library-download-size">{download.size} MB</div>
    </div>
  );
};

const HistoryItem = ({ historyItem }) => {
  return (
    <div className="music-library-history-item">
      <div className="music-library-history-song">{historyItem.song}</div>
      <div className="music-library-history-artist">{historyItem.artist}</div>
      <div className="music-library-history-date">{historyItem.date}</div>
    </div>
  );
};

const Library = () => {
  const [activeTab, setActiveTab] = useState("playlists");
  const [profile, setProfile] = useState("profile1");

  const handleChangeProfile = (event) => {
    setProfile(event.target.value);
  };

  return (
    <div className="music-library">
      <div className="music-library-header">
        <div className="music-library-title">Library</div>
        <div className="music-library-profile-select">
          <label htmlFor="profile-select">Switch Profile:</label>
          <select
            id="profile-select"
            value={profile}
            onChange={handleChangeProfile}
          >
            <option value="profile1">Suma</option>
            <option value="profile2">Satish</option>
          </select>
        </div>
      </div>

      <div className="music-library-content">
        <div className="music-library-tab-content">
          <div className="music-library-tab-header" onClick={() => setActiveTab("playlists")}>Playlists</div>
          <div className="music-library-tab-body">
            {activeTab === "playlists" &&
              musicData[profile].playlists.map((playlist) => (
                <Playlist playlist={playlist} key={playlist.id} />
              ))}
          </div>
        </div>

        <div className="music-library-tab-content">
          <div className="music-library-tab-header" onClick={() => setActiveTab("downloads")}>Downloads</div>
          <div className="music-library-tab-body">
            {activeTab === "downloads" &&
              musicData[profile].downloads.map((download) => (
                <Download download={download} key={download.id} />
              ))}
          </div>
        </div>

        <div className="music-library-tab-content">
          <div className="music-library-tab-header" onClick={() => setActiveTab("history")}>History</div>
          <div className="music-library-tab-body">
            {activeTab === "history" &&
              musicData[profile].history.map((historyItem) => (
                <HistoryItem historyItem={historyItem} key={historyItem.id} />
              ))}
          </div>
        </div>
      </div>

    </div>
  );
};


export default Library;