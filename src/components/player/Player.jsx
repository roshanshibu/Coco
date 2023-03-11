import "./Player.css";
import albumArtBg from "../../assets/albumArt_bg.svg"
import lyricGradient from "../../assets/lyricGradient.svg"
import { ReactComponent as FavouriteIcon } from "../../assets/favourite.svg"
import { ReactComponent as LyricsIcon } from '../../assets/lyrics.svg';

import { ReactComponent as PlayIcon } from '../../assets/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/pause.svg';
import { ReactComponent as NextIcon } from '../../assets/next.svg';
import { ReactComponent as PreviousIcon } from '../../assets/previous.svg';
import { useState, useRef, useEffect } from "react";

const AlbumArtLyric = (props) => {
    return(
        <div className="albumArtLyric">
            <img className="albumArt" 
                src={props.isAlbumArt ? props.albumArtUrl : albumArtBg} />
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
    return(
        <div className="songDetailContainer">
            <FavouriteIcon style={{color: (props.isFavourite ? "#ea4444" : "#F0F0F0")}}
                onClick={props.toggleFavourite} />
            <div className="p_songDetails">
                <p>{props.songName}</p>
                <p className="artistName" style={{color: props.accentColor}} >{props.artist}</p>
            </div>
            <LyricsIcon style={{color: (props.showAlbumArt ? "#F0F0F0" : props.accentColor)}}
                onClick={props.toggleAlbumArtLyric} />
        </div>
    )
}

const Timeline = (props) => {
    function sToTime(t) {
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
                default="50" 
                value={props.timeProgress}
            />
            <div className="timelineInfo">
                <p className="playbackTime">{sToTime(props.timeProgress)}</p>
                <p className="playbackTime">{sToTime(props.duration)}</p>
            </div>
        </div>
    )
}

const ControlRow = (props) => {
    return(
        <div className="controlContainer">
            <PreviousIcon className="controlIcon" />
            {!props.isPlaying ? 
                <PlayIcon style={{color: props.accentColor}} 
                    className="playPauseIcon" onClick={props.togglePlay} />
                :
                <PauseIcon style={{color: props.accentColor}} 
                    className="playPauseIcon" onClick={props.togglePlay} />
            }
            <NextIcon className="controlIcon"/>
        </div>
    )
}


const Player = () => {

    const [showAlbumArt, SetShowAlbumArt] = useState(true)
    const [albumArtUrl, SetAlbumArtUrl] = useState("https://raw.githubusercontent.com/roshanshibu/CocoBackend/master/images/matoma.jpg")
    const [accentColor, SetAccentColor] = useState("#b55fec")
    const [previousLine, SetPreviousLine] = useState("Pull me close, show me, baby, where the light is")
    const [currentLine, SetCurrentLine] = useState("I was scared of a heart I couldn't silence")
    const [nextLine, SetNextLine] = useState("But you make me, you make me feel good")

    const [songName, SetSongName] = useState("Slow (R3hab remix)")
    const [artist, SetArtist] = useState("Matoma")
    const [isFavourite, SetFavourite] = useState(false)

    const [isPlaying, SetPlaying] = useState(false)

    var mp3file = "https://github.com/roshanshibu/CocoBackend/raw/master/songs/matoma%20slow%20r3hab%20remix.mp3"
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(new Audio(mp3file));
    const play = () => {
        SetPlaying(true);
        audioRef.current.play();
        console.log(audioRef)
    };
    const pause = () => {
        SetPlaying(false);
        audioRef.current.pause();
    };
    audioRef.current.ontimeupdate = () => {
        setTimeProgress(audioRef.current.currentTime)
    }
    
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

    useEffect(() => {
        setDuration(audioRef.current.duration)
    })

    return(
        <div className="playerContainer">
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
            <Timeline duration={duration} timeProgress={timeProgress}/>
            <ControlRow accentColor={accentColor} 
                isPlaying={isPlaying} togglePlay={togglePlay} />
        </div>
    )
}

export default Player