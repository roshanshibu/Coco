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

import { useState, useRef, useEffect, forwardRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getSongDetails } from "../../api/song";
import { getLyrics } from "../../api/lyrics";

const AlbumArtLyric = (props) => {
    return(
        <div className="albumArtLyric">
            <img className="albumArt" 
                src={props.isAlbumArt ? (props.albumArtUrl ? props.albumArtUrl : LoadingAlbumArt) 
                                        : albumArtBg} />
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
            {!props.isAlbumArt && <img className="albumArt gradient" src={lyricGradient} />}
        </div>
    )
}

const SongDetailRow = (props) => {
    const navigate = useNavigate()
    return(
        <div className="songDetailContainer">
            <FavouriteIcon style={{color: (props.isFavourite ? "#ea4444" : "#F0F0F0"), width: "30px"}}
                onClick={props.toggleFavourite} />
            <div className="p_songDetails">
                <p>{props.songName}</p>
                <p className="artistName" 
                    style={{color: props.accentColor}}
                    onClick={() => { navigate("../bio/somename");}} >{props.artist}</p>
            </div>
            <LyricsIcon style={{color: (props.showAlbumArt ? "#F0F0F0" : props.accentColor), 
                                width: "30px",
                            opacity: (props.isLyricsAvailable ? 1 : 0.1)}}
                onClick={props.isLyricsAvailable ? props.toggleAlbumArtLyric : null} />
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
        <div className="controlContainer">
            <PreviousIcon className="controlIcon"
                onClick={()=> {props.updatePlayerSong(+props.currentSongId - 1)}}/>
            {!props.isPlaying ? 
                (
                    !props.isSongLoaded?
                        <CircleLoad className="playPauseIcon" style={{height: "73px"}} />
                    :
                        <PlayIcon style={{color: props.accentColor}} 
                        className="playPauseIcon" onClick={props.togglePlay} />
                )
                :
                <PauseIcon style={{color: props.accentColor}} 
                    className="playPauseIcon" onClick={props.togglePlay} />
            }
            <NextIcon className="controlIcon" 
                onClick={()=> {props.updatePlayerSong(+props.currentSongId + 1)}} />
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

const UpNext = (props) => {
    return(
        <div className="upNextContainer">
            <PullUpIcon className="pullUpIcon" />
        </div>
    )
}


const Player = () => {

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

    const [isPlaying, SetPlaying] = useState(true)
    
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

    const updateLyric = (currentTime) => {
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

    const [songParams, setSongParams] = useSearchParams()
    let songid = songParams.get("songid")

    const updatePlayerSong = (newSongId) => {
        setSongParams({"songid": newSongId})
        SetPlaying(true)
    }
    useEffect(() => {
        setDuration(audioRef.current.duration)
    })
    useEffect(() => {
        getSongDetails(songid)
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
                            updatePlayerSong(songid > 1 ? 1 : 9)
                });
        
        getLyrics(songid)
        .then((res) => {
            // console.log(res.data)
            SetLyrics(res.data)
            SetLyricsAvailable(true)
        })
        .catch((err) => {console.error(err)
            SetLyricsAvailable(false)});
            SetShowAlbumArt(true)
    }, [songid])

    return(
        <div className="playerContainer">
            <audio src={songUrl} ref={audioRef} 
                autoPlay
                onTimeUpdate={onMusicTimeUpdate}
                onLoad={() => {setDuration(audioRef.current.duration)}} >
            </audio>
            <AlbumArtLyric isAlbumArt={showAlbumArt} 
                albumArtUrl={albumArtUrl}
                accentColor={accentColor}
                previousLine={previousLine}
                currentLine={currentLine} lyricKey={lyricKey}
                nextLine={nextLine}
                />
            <SongDetailRow songName={songName} artist={artist} accentColor={accentColor}
                showAlbumArt={showAlbumArt} toggleAlbumArtLyric={toggleAlbumArtLyric}
                isFavourite={isFavourite} toggleFavourite={toggleFavourite}
                isLyricsAvailable={isLyricsAvailable} />
            <Timeline duration={duration} timeProgress={timeProgress} 
                ref={audioRef} setTimeProgress={setTimeProgress}/>
            <ControlRow accentColor={accentColor} 
                isPlaying={isPlaying} togglePlay={togglePlay}
                isSongLoaded={isSongLoaded} 
                updatePlayerSong={updatePlayerSong}
                currentSongId={songid} />
            <OptionsRow />
            <UpNext />
        </div>
    )
}

export default Player