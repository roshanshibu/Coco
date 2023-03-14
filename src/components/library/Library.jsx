import React, { useState } from "react";
import musicData from "../../data/musicData.json";
import "./Library.css";


const LibraryHeader = ({profile, onChange}) => {
  return (
    <>
      <div className="library-title">Library</div>
      <div className="library-profile-select">
        <label htmlFor="select-profile">Switch Profile:</label>
        <select id="select-profile" value={profile} onChange={onChange}>
          <option value="profile1">Suma</option>
          <option value="profile2">Satish</option>
        </select>
      </div>
    </>
  );
};


const Playlist = ({ playlist }) => {
  return (
    <div className="library-playlist">
      <div className="library-playlist-name">{playlist.name}</div>
      <div className="library-playlist-length">{playlist.songs.length} songs</div>
      <div className="library-playlist-songs">
        {playlist.songs.map((song) => (
          <div className="library-playlist-song" key={song.id}>
            <div className="library-playlist-song-title">{song.title}</div>
            <div className="library-playlist-song-artist">{song.artist}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


const Download = ({ download }) => {
  return (
    <div className="library-download">
      <div className="library-download-name">{download.name}</div>
      <div className="library-download-size">{download.size} MB</div>
    </div>
  );
};


const HistoryItem = ({ historyItem }) => {
  return (
    <div className="library-history-item">
      <div className="library-history-song">{historyItem.song}</div>
      <div className="library-history-artist">{historyItem.artist}</div>
      <div className="library-history-date">{historyItem.date}</div>
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
    <div className="library">

      <div className="library-header">       
        <LibraryHeader profile={profile} onChange={handleChangeProfile}/> 
      </div>

      <div className="library-content">

        <div className="library-tab-content">
          <div className="library-tab-header" onClick={() => setActiveTab("playlists")}>Playlists</div>
          <div className="library-tab-body">
            {activeTab === "playlists" &&
              musicData[profile].playlists.map((playlist) => (
                <Playlist playlist={playlist} key={playlist.id} />
              ))}
          </div>
        </div>

        <div className="library-tab-content">
          <div className="library-tab-header" onClick={() => setActiveTab("downloads")}>Downloads</div>
          <div className="library-tab-body">
            {activeTab === "downloads" &&
              musicData[profile].downloads.map((download) => (
                <Download download={download} key={download.id} />
              ))}
          </div>
        </div>

        <div className="library-tab-content">
          <div className="library-tab-header" onClick={() => setActiveTab("history")}>History</div>
          <div className="library-tab-body">
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