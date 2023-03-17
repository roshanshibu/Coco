import React, { useContext, useState } from "react";
import musicData from "../../data/musicData.json";
import "./Library.css";
import playIcon from "../../assets/padded_play.svg"
import { PlayerContext, UserContext } from '../../MainRoutes';
import myHomeIcon from "../../assets/coco-logo.png"
import user1Image from "../../assets/steve.jpg"
import user2Image from "../../assets/linda.jpg"


const LibraryHeader = ({product}) => {
  const userContext = useContext(UserContext);
  
  return (
      <div className='library-header' >
          <img className='library-header-logo' src={myHomeIcon} alt="coco logo" />
          <p className='library-header-productName'>{product}</p>
          <img className='library-header-dashUserImage' src={userContext.currentUserId == 1 ? user1Image : user2Image} alt="user image" 
              onClick={() => {
                  if(userContext.currentUserId == 1)
                      userContext.setCurrentUserId(2)
                  else
                  userContext.setCurrentUserId(1)
              }}
          />
      </div>
  )    
};


const Playlist = ({ playlist, isSelected, onClick }) => {
  return (
    <div className={`library-playlist ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <img className="PlaylistIcon" src={playlist.playlistArt} alt="Play Icon"/>
        <div className="library-playlist-name">{playlist.name}</div>
        <div className="library-playlist-length">{playlist.songs.length} songs</div>
    </div>

  );
};

const Song = ({ song, playMusic }) => {
  return (
    <div className="library-playlist-song" onClick={playMusic ? ()=>{playMusic(song.songId)} : () => {}}>
      <img className="play-icon" src={playIcon} alt="Play Icon" style={{backgroundImage: `url(${song.albumArt})`}}/>
      <div className="song-details">
        <div className="library-playlist-songname">{song.songName}</div>
        <div className="library-playlist-artist">{song.artist}</div>
      </div>
    </div>
  );
};


const PlaylistSongs = ({ playlist, playMusic}) => {
  return (
    <div className="library-Playlist-songs">
      {playlist.songs.map((song) => (
        <Song song={song} key={song.id} playMusic={playMusic}/>
      ))}
    </div>
  );
};


const Download = ({ download, playMusic }) => {
  return (
    <div className="library-download" onClick={playMusic ? ()=>{playMusic(download.songId)} : () => {}}>
      <img className="play-icon" src={playIcon} alt="Play Icon" style={{backgroundImage: `url(${download.albumArt})`}}/>
      <div className="song-details"></div>
        <div className="library-download-songname">{download.songName}
        <div className="library-download-artist">{download.artist}</div>
      </div>
    </div>
  );
};


const HistoryItem = ({ historyItem, playMusic }) => {
  return (
    <div className="library-history-item" onClick={playMusic ? ()=>{playMusic(historyItem.songId)} : () => {}}>
      <img className="play-icon" src={playIcon} alt="Play Icon" style={{backgroundImage: `url(${historyItem.albumArt})`}}/>
      <div className="song-details">
        <div className="library-history-songname">{historyItem.songName}</div>
        <div className="library-history-artist">{historyItem.artist}</div>
      </div>
    </div>
  );
};


const Library = () => {
  const userContext = useContext(UserContext);
  const [userImage, SetUserImage] = useState(null)
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

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

  const playerContext = useContext(PlayerContext)

  const playMusic = (songId) => {
      playerContext.setPlayingSongId(songId)
      playerContext.setGMiniPlayer(false)
  }

  return (
    <>     
      <LibraryHeader product={"coco"}/> 
      <div className="library-content">
        <div className="library-tab-content">
          <div className="library-tab-header">Playlists</div>
            <div className="library-tab-playlist-body">
              {musicData["profile"+userContext.currentUserId].playlists.map((playlist) => (
                <Playlist 
                  playlist={playlist} 
                  key={playlist.id} i
                  isSelected={selectedPlaylist === playlist.id} 
                  onClick={() => handlePlaylistClick(playlist.id)}
                />
            ))}
          </div>
          {selectedPlaylist !== null && (
            <PlaylistSongs playlist={musicData["profile"+userContext.currentUserId].playlists.find(p => p.id === selectedPlaylist)} playMusic={playMusic} />
          )}
        </div>
        <div className="library-tab-content">
          <div className="library-tab-header" onClick={handleDownloadsClick}>
            <div className="title">Downloads</div>
            <div className="arrows">  {downloadsOpen ? "▼" : "►"}</div>
          </div>
          {downloadsOpen && (
            <div className="library-tab-body">
              {musicData["profile"+userContext.currentUserId].downloads.map((download) => (
                <Download download={download} key={download.id} playMusic={playMusic}/>
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
              {musicData["profile"+userContext.currentUserId].history.map((historyItem) => (
                <HistoryItem historyItem={historyItem} key={historyItem.id} playMusic={playMusic}/>
              ))}
            </div>
          )}
        </div>        
      </div>
    </>
  );
};



export default Library;