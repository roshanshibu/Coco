import "./Player.css";
import albumArtBg from "../../assets/albumArt_bg.svg"
import lyricGradient from "../../assets/lyricGradient.svg"
import { ReactComponent as FavouriteIcon } from "../../assets/favourite.svg"
import { ReactComponent as LyricsIcon } from '../../assets/lyrics.svg';

import LoadingAlbumArt from '../../assets/loading_album_art.svg';
import { ReactComponent as CircleLoad} from "../../assets/circle_load.svg"
import PlayingIndicator from "../../assets/playing_indicator.gif"

import { ReactComponent as PlayIcon } from '../../assets/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/pause.svg';
import { ReactComponent as NextIcon } from '../../assets/next.svg';
import { ReactComponent as PreviousIcon } from '../../assets/previous.svg';

import { ReactComponent as ShuffleIcon } from '../../assets/shuffle.svg';
import { ReactComponent as RepeatIcon } from '../../assets/repeat.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import { ReactComponent as MoreOptionsIcon } from '../../assets/more options.svg';

import { ReactComponent as PullUpIcon } from '../../assets/Pull up.svg';

import React, { useState, useRef, useEffect, forwardRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSongDetails } from "../../api/song";
import { getLyrics } from "../../api/lyrics";
import { PlayerContext } from "../../MainRoutes";

const AlbumArtLyric = (props) => {
    return(
        <div className={props.miniplayer ? "" : "albumArtLyric"} 
            onClick={props.miniplayer ? props.openBigPlayer : () => {}}>
            <img className={props.miniplayer ? "albumArtSmall" : "albumArt"} 
                src={props.isAlbumArt ? (props.albumArtUrl ? props.albumArtUrl : LoadingAlbumArt) 
                                        : albumArtBg} />
            {!props.miniplayer &&
                <div className={"lyricContainer " + (props.isAlbumArt ? "hidden" : "")}>
                    <p className="lyricNonFocus">{props.previousLine}</p>
                    {
                        props.currentLine === "MUSIC_ICON" ?
                        <img src={PlayingIndicator} style={{width:'60px', opacity:'0.7',animation: 'fadeIn 0.5s forwards'}}/>
                        :
                        <p key={props.lyricKey} className="lyricFocus" style={{color: props.accentColor}} >{props.currentLine}</p>
                    }
                    <p className="lyricNonFocus">{props.nextLine}</p>
                </div>
            }
            {!props.isAlbumArt && <img className="albumArt gradient" src={lyricGradient} />}
        </div>
    )
}

const SongDetailRow = (props) => {
    const navigate = useNavigate()
    return(
        <div className={"songDetailContainer " + (props.miniplayer && "miniDetails")}
        onClick={props.miniplayer ? props.openBigPlayer : () => {}}>
            {!props.miniplayer &&
                <FavouriteIcon style={{color: (props.isFavourite ? "#ea4444" : "#F0F0F0"), width: "30px"}}
                onClick={props.toggleFavourite} />
            }
            <div className={props.miniplayer ? "p_miniSongDetails" : "p_songDetails"}>
                <p>{props.songName}</p>
                <p className={props.miniplayer ? "miniArtistName" : "artistName"} 
                    style={{color: props.accentColor}}
                    onClick={!props.miniplayer ?
                                    () => { props.minimizePlayer()
                                            navigate("../bio/somename");} 
                                : 
                                    () =>{}}
                    >
                    {props.artist}
                </p>
            </div>
            {!props.miniplayer &&
                <LyricsIcon style={{color: (props.showAlbumArt ? "#F0F0F0" : props.accentColor), 
                                width: "30px",
                            opacity: (props.isLyricsAvailable ? 1 : 0.1)}}
                onClick={props.isLyricsAvailable ? props.toggleAlbumArtLyric : null} />
            }
        </div>
    )
}

const Timeline =  forwardRef((props, ref) => {
    function sToTime(t) {
        if (isNaN(parseInt((t / (60)) % 60)))
            return "00:00"
        return padZero(parseInt((t / (60)) % 60)) + ":" + 
                padZero(parseInt((t) % 60));
    }
    function padZero(v) {
        return (v < 10) ? "0" + v : v;
    }

    return (
        <div className="timelineContainer">
            <input
                type="range" min="0"
                max={props.duration} 
                default="0" 
                value={props.timeProgress}
                onChange={(e) => {
                    props.setTimeProgress(e.target.value)
                    ref.current.currentTime = e.target.value
                }}
            />
            <div className="timelineInfo">
                <p className="playbackTime">{sToTime(props.timeProgress)}</p>
                <p className="playbackTime">{sToTime(props.duration)}</p>
            </div>
        </div>
    )
})

const ControlRow = (props) => {
    return(
        <div className={props.miniplayer ? "miniPauseContainer" : "controlContainer"}>

            {!props.miniplayer &&
                <PreviousIcon className="controlIcon"
                onClick={()=> {props.updatePlayerSong(+props.currentSongId - 1)}}/>
            }
            {!props.isPlaying ? 
                (
                    !props.isSongLoaded?
                        <CircleLoad className="playPauseIcon" style={{height: "73px"}} />
                    :
                        <PlayIcon style={{color: props.accentColor}} 
                            className={props.miniplayer ? "miniPlayPauseIcon" : "playPauseIcon"} 
                            onClick={props.togglePlay} />
                )
                :
                <PauseIcon style={{color: props.accentColor}} 
                    className={props.miniplayer ? "miniPlayPauseIcon" : "playPauseIcon"} 
                    onClick={props.togglePlay} />
            }
            {!props.miniplayer &&
                <NextIcon className="controlIcon" 
                    onClick={()=> {props.updatePlayerSong(+props.currentSongId + 1)}} />
            }
        </div>
    )
}

const OptionsRow = (props) => {
    return(
        <div className="moreOptions">
            <ShuffleIcon className="optionsIcon" />
            <RepeatIcon className="optionsIcon" />
            <ShareIcon className="optionsIcon" />
            <MoreOptionsIcon className="optionsIcon" />
        </div>
    )
}

const Minimize = (props) => {
    return(
        <div className="upNextContainer"
            onClick={props.minimizePlayer}>
            <PullUpIcon className="pullUpIcon" />
        </div>
    )
}


const Player = (props) => {

    const [showAlbumArt, SetShowAlbumArt] = useState(true)
    const [albumArtUrl, SetAlbumArtUrl] = useState("")
    const [accentColor, SetAccentColor] = useState("grey")

    const [lyrics, SetLyrics] = useState(null)
    const [previousLine, SetPreviousLine] = useState(null)
    const [currentLine, SetCurrentLine] = useState(null)
    const [nextLine, SetNextLine] = useState(null)
    const [lyricKey, SetLyricKey] = useState(1)
    const [isLyricsAvailable, SetLyricsAvailable] = useState(true)

    const [songName, SetSongName] = useState("-")
    const [artist, SetArtist] = useState("-")
    const [isFavourite, SetFavourite] = useState(false)
    const [isSongLoaded, SetSongLoaded] = useState(false)

    const [isPlaying, SetPlaying] = useState(false)

    const [isAutoplayEnabled, SetAutoPlay] = useState(false)
    
    const [isShuffle, SetShuffle] = useState(false)
    const [isRepeat, SetRepeat] = useState(false)
    const [isShare, SetShare] = useState(false)
    const [isMoreOptions, SetMoreOptions] = useState(false)

    const [songUrl, setSongUrl] = useState("")
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    // const audioRef = useRef(new Audio(songUrl));
    const audioRef = useRef();
    const play = () => {
        SetPlaying(true);
        audioRef.current.play();
    };
    const pause = () => {
        SetPlaying(false);
        audioRef.current.pause();
    };
    
    const toggleAlbumArtLyric = () => {
        SetShowAlbumArt(!showAlbumArt)
    }
    const toggleFavourite = () => {
        SetFavourite(!isFavourite)
    }
    const togglePlay = () => {
        if(isPlaying)
            pause()
        else
            play()
    }

    const updateSong = (source) => {
        setSongUrl(source);
        if(audioRef.current){
            audioRef.current.load();
            SetSongLoaded(true)
        }
    }

    const onMusicTimeUpdate = () => {
        setTimeProgress(audioRef.current.currentTime)
        if (isLyricsAvailable)
            updateLyric(audioRef.current.currentTime)
    }

    const ColorHelper = (color, percent) => {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);
    
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  
    
        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)
    
        var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
    }

    const updateLyric = (currentTime) => {
        if(lyrics){
            let lyricsTillNow = lyrics.filter((lrc) => {return (currentTime >= lrc.startTime)})
            if (currentLine !== lyricsTillNow.slice(-1)[0].lyric){
                SetCurrentLine(lyricsTillNow.slice(-1)[0].lyric)
                SetLyricKey(lyricKey+1)
                // SetPreviousLine(lyricsTillNow[lyricsTillNow.length-2].lyric)
                // SetNextLine(lyrics[lyricsTillNow.length].lyric)
            }
            // console.log( "last", lyricsTillNow[lyricsTillNow.length-2]  )
            // console.log( "current", lyricsTillNow[lyricsTillNow.length-1]  )
            // console.log( "next", lyrics[lyricsTillNow.length]  )
        }
    } 

    const playerContext = useContext(PlayerContext)
    // const [songid, SetSongId] = useState (props.songid)
    const [miniplayer, SetMiniPlayer] = useState(props.miniplayer)
    const [hideMiniPlayer, SetHideMiniPlayer] = useState(true)
    
    const openBigPlayer = () => {
        console.log("opening Big Player")
        SetMiniPlayer(false)
    }
    const minimizePlayer = () => {
        //if lyrics is on, switch to album art
        SetShowAlbumArt(true)
        SetMiniPlayer(true)
    }

    const updatePlayerSong = (newSongId) => {
        SetAutoPlay(true)
        playerContext.setPlayingSongId(newSongId)
        SetPlaying(true)
    }
    useEffect(() => {
        setDuration(audioRef.current.duration)
    })
    useEffect(() => {
        // if pressing next or previous button, we shouldnt save all that
        // to browser history. If we do, then the user will have to navigate
        // through all the played songs in order to get back to the previous screen
        let stateObj = {
            foo: "bar",
        };
        // we should ideally push the url of the screen that naviagted to this
        // player screen. We have used the "\\" dash screen here for simplicity
        // reasons. Fix later.
        window.history.pushState(stateObj, "", "\\");
        console.log(window.history)

        getSongDetails(playerContext.playingSongId)
        .then((res) => {
            SetSongLoaded(false)
            // console.log(res.data.url)
            SetSongName(res.data.songName)
            SetArtist(res.data.artist)
            SetAlbumArtUrl(res.data.albumArt)
            SetAccentColor(res.data.color)
            updateSong(res.data.url)
        })
        .catch((err) => {
                            console.error(err);
                            updatePlayerSong(playerContext.playingSongId)
                });
        
        getLyrics(playerContext.playingSongId)
        .then((res) => {
            // console.log(res.data)
            SetLyrics(res.data)
            SetLyricsAvailable(true)
        })
        .catch((err) => {console.error(err)
            SetLyricsAvailable(false)});
            SetShowAlbumArt(true)
        // when app starts, the miniplayer is hidden
        // when the first song is played, it should be made visible
        if(playerContext.playingSongId !== null){
            SetHideMiniPlayer(false)
            if(isAutoplayEnabled){
                play()
            }
        }else{
            pause()
            minimizePlayer()
            SetHideMiniPlayer(true)
        }
        if(playerContext.g_miniplayer){
            minimizePlayer()
        }else{
            openBigPlayer()
        }
    }, [playerContext.playingSongId, playerContext.g_miniplayer])

    return(
        <div className={"playerContainer " + (miniplayer ? "miniplayer" : "") + (hideMiniPlayer ? " hideMiniPlayer" : "")}
            style={{backgroundColor: (miniplayer ? `${ColorHelper(accentColor, -50)}` : "#252525")}}>
            <audio src={songUrl} ref={audioRef} 
                autoPlay={isAutoplayEnabled}
                onTimeUpdate={onMusicTimeUpdate}
                onLoad={() => {setDuration(audioRef.current.duration)}} >
            </audio>
            <AlbumArtLyric miniplayer={miniplayer}
                openBigPlayer={openBigPlayer}
                isAlbumArt={showAlbumArt} 
                albumArtUrl={albumArtUrl}
                accentColor={accentColor}
                previousLine={previousLine}
                currentLine={currentLine} lyricKey={lyricKey}
                nextLine={nextLine}
                />
            <SongDetailRow miniplayer={miniplayer}
                openBigPlayer={openBigPlayer}
                songName={songName} artist={artist} accentColor={accentColor}
                showAlbumArt={showAlbumArt} toggleAlbumArtLyric={toggleAlbumArtLyric}
                isFavourite={isFavourite} toggleFavourite={toggleFavourite}
                isLyricsAvailable={isLyricsAvailable}
                minimizePlayer={minimizePlayer} />
            
            {!miniplayer &&
                <Timeline duration={duration} timeProgress={timeProgress} 
                ref={audioRef} setTimeProgress={setTimeProgress}/>
            }
            <ControlRow miniplayer={miniplayer}
                accentColor={accentColor} 
                isPlaying={isPlaying} togglePlay={togglePlay}
                isSongLoaded={isSongLoaded} 
                updatePlayerSong={updatePlayerSong}
                currentSongId={playerContext.playingSongId} />
            {!miniplayer &&
                <>
                    <OptionsRow />
                    <Minimize minimizePlayer={minimizePlayer} />
                </>
            } 
        </div>
    )
}

export default Player