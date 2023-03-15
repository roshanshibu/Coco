import React, { useState } from "react";
import musicData from "../../data/musicData.json";
import "./Library.css";
import playIcon from "../../assets/padded_play.svg"


const LibraryHeader = ({profile, onChange}) => {
  return (
    <>
      <div className="library-title">Library</div>
      <div className="library-profile-select">
        <label htmlFor="select-profile">Switch Profile:  </label>
        <select id="select-profile" value={profile} onChange={onChange}>
          <option value="profile1">Suma</option>
          <option value="profile2">Satish</option>
        </select>
      </div>
    </>
  );
};


const Playlist = ({ playlist, isSelected, onClick }) => {
  return (
    <div className={`library-playlist ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <div className="library-playlist-name">{playlist.name}</div>
      <div className="library-playlist-length">{playlist.songs.length} songs</div>
    </div>
  );
};

const Song = ({ song }) => {
  return (
    <div className="library-playlist-song">
      <img className="play-icon" src={playIcon} alt="Play Icon"/>
      <div className="song-details">
        <div className="library-playlist-song-title">{song.title}</div>
        <div className="library-playlist-song-artist">{song.artist}</div>
      </div>
    </div>
  );
};


const PlaylistSongs = ({ playlist }) => {
  return (
    <div className="library-Playlist-songs">
      {playlist.songs.map((song) => (
        <Song song={song} key={song.id} />
      ))}
    </div>
  );
};


const Download = ({ download }) => {
  return (
    <div className="library-download">
      <img className="play-icon" src={playIcon} alt="Play Icon"/>
      <div className="song-details"></div>
        <div className="library-download-name">{download.name}
        <div className="library-download-artist">{download.artist}</div>
      </div>
    </div>
  );
};


const HistoryItem = ({ historyItem }) => {
  return (
    <div className="library-history-item">
      <img className="play-icon" src={playIcon} alt="Play Icon"/>
      <div className="song-details">
        <div className="library-history-song">{historyItem.song}</div>
        <div className="library-history-artist">{historyItem.artist}</div>
      </div>
    </div>
  );
};


const Library = () => {
  const [profile, setProfile] = useState("profile1");
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleChangeProfile = (event) => {
    setProfile(event.target.value);
  };

  const handleDownloadsClick = () => {
    setDownloadsOpen(!downloadsOpen);
  };

  const handleHistoryClick = () => {
    setHistoryOpen(!historyOpen);
  };

  const handlePlaylistClick = (playlistId) => {
    if (selectedPlaylist === playlistId) {
      setSelectedPlaylist(null);
    } else {
      setSelectedPlaylist(playlistId);
    }
  };

  return (
    <div className="library">

      <div className="library-header">       
        <LibraryHeader profile={profile} onChange={handleChangeProfile}/> 
      </div>

      <div className="library-content">

        <div className="library-tab-content">
          <div className="library-tab-header">Playlists</div>
            <div className="library-tab-playlist-body">
              {musicData[profile].playlists.map((playlist) => (
                <Playlist 
                  playlist={playlist} 
                  key={playlist.id} i
                  sSelected={selectedPlaylist === playlist.id} 
                  onClick={() => handlePlaylistClick(playlist.id)}
                />
            ))}
          </div>
          {selectedPlaylist !== null && (
            <PlaylistSongs playlist={musicData[profile].playlists.find(p => p.id === selectedPlaylist)} />
          )}
        </div>

        <div className="library-tab-content">
          <div className="library-tab-header" onClick={handleDownloadsClick}>
            <div className="title">Downloads</div>
            <div className="arrows">  {downloadsOpen ? "▼" : "►"}</div>
          </div>
          {downloadsOpen && (
            <div className="library-tab-body">
              {musicData[profile].downloads.map((download) => (
                <Download download={download} key={download.id} />
              ))}
            </div>
          )}
        </div>

        <div className="library-tab-content">
          <div className="library-tab-header" onClick={handleHistoryClick}>
            <div className="title">History</div>
            <div className="arrows">  {historyOpen ? "▼" : "►"}</div>
          </div>
          {historyOpen && (
            <div className="library-tab-body">
              {musicData[profile].history.map((historyItem) => (
                <HistoryItem historyItem={historyItem} key={historyItem.id} />
              ))}
            </div>
          )}
        </div>
        
      </div>

    </div>
  );
};



export default Library;