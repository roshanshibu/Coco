import React, { useState } from "react";
import musicData from "../../data/musicData.json";
import "./Library.css";

const Library = () => {
  const [activeTab, setActiveTab] = useState("playlists");

  return (
    <div className="music-library">
      <div className="music-library-tabs">
        <div
          className={`music-library-tab ${
            activeTab === "playlists" ? "active" : ""
          }`}
          onClick={() => setActiveTab("playlists")}
        >
          Playlists
        </div>
        <div
          className={`music-library-tab ${
            activeTab === "downloads" ? "active" : ""
          }`}
          onClick={() => setActiveTab("downloads")}
        >
          Downloads
        </div>
        <div
          className={`music-library-tab ${
            activeTab === "history" ? "active" : ""
          }`}
          onClick={() => setActiveTab("history")}
        >
          History
        </div>
      </div>
      <div className="music-library-content">
        {activeTab === "playlists" && (
          <div className="music-library-playlists">
            {musicData.playlists.map((playlist) => (
              <div className="music-library-playlist" key={playlist.id}>
                <div className="music-library-playlist-name">
                  {playlist.name}
                </div>
                <div className="music-library-playlist-length">
                  {playlist.songs.length} songs
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "downloads" && (
          <div className="music-library-downloads">
            {musicData.downloads.map((download) => (
              <div className="music-library-download" key={download.id}>
                <div className="music-library-download-name">
                  {download.name}
                </div>
                <div className="music-library-download-size">
                  {download.size} MB
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "history" && (
          <div className="music-library-history">
            {musicData.history.map((history) => (
              <div className="music-library-history-item" key={history.id}>
                <div className="music-library-history-song">
                  {history.song}
                </div>
                <div className="music-library-history-artist">
                  {history.artist}
                </div>
                <div className="music-library-history-date">
                  {history.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
