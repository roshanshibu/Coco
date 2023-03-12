import "./Player.css";
import albumArtBg from "../../assets/albumArt_bg.svg"
import lyricGradient from "../../assets/lyricGradient.svg"
import { ReactComponent as FavouriteIcon } from "../../assets/favourite.svg"
import { ReactComponent as LyricsIcon } from '../../assets/lyrics.svg';

import LoadingAlbumArt from '../../assets/loading_album_art.svg';
import { ReactComponent as CircleLoad} from "../../assets/circle_load.svg"

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
import { useParams, useNavigate } from "react-router-dom";
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
                <p className="lyricFocus" style={{color: props.accentColor}} >{props.currentLine}</p>
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
            <LyricsIcon style={{color: (props.showAlbumArt ? "#F0F0F0" : props.accentColor), width: "30px"}}
                onClick={props.toggleAlbumArtLyric} />
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
            <PreviousIcon className="controlIcon" />
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
            <NextIcon className="controlIcon"/>
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
        SetPlaying(!isPlaying)
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
        updateLyric(audioRef.current.currentTime)
    }

    const updateLyric = (currentTime) => {
        let lyricsTillNow = lyrics.filter((lrc) => {return (currentTime+1.2 >= lrc.endTime)})
        if (currentLine !== lyricsTillNow.slice(-1)[0].lyric)
            SetCurrentLine(lyricsTillNow.slice(-1)[0].lyric)
        let currentLine_ = lyricsTillNow.slice(-1)[0] 
        console.log( currentLine_  )
    } 

    const { songid } = useParams()

    useEffect(() => {
        setDuration(audioRef.current.duration)
    })
    useEffect(() => {
        getSongDetails(songid)
        .then((res) => {
            SetSongLoaded(false)
            console.log(res.data.url)
            SetSongName(res.data.songName)
            SetArtist(res.data.artist)
            SetAlbumArtUrl(res.data.albumArt)
            SetAccentColor(res.data.color)
            updateSong(res.data.url)
        })
        .catch((err) => console.error(err));
        
        getLyrics(songid)
        .then((res) => {
            console.log(res.data)
            SetLyrics(res.data)
        })
        .catch((err) => console.error(err));
    }, [])

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
                currentLine={currentLine}
                nextLine={nextLine}
                />
            <SongDetailRow songName={songName} artist={artist} accentColor={accentColor}
                showAlbumArt={showAlbumArt} toggleAlbumArtLyric={toggleAlbumArtLyric}
                isFavourite={isFavourite} toggleFavourite={toggleFavourite} />
            <Timeline duration={duration} timeProgress={timeProgress} 
                ref={audioRef} setTimeProgress={setTimeProgress}/>
            <ControlRow accentColor={accentColor} 
                isPlaying={isPlaying} togglePlay={togglePlay}
                isSongLoaded={isSongLoaded} />
            <OptionsRow />
            <UpNext />
        </div>
    )
}

export default Player