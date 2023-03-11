import "./Player.css";
import albumArtBg from "../../assets/albumArt_bg.svg"
import lyricGradient from "../../assets/lyricGradient.svg"
import favouriteIcon from "../../assets/favourite.svg"
import lyricsIcon from "../../assets/lyrics.svg"
import { useState } from "react";

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
            <img className="songDetailIcon" src={favouriteIcon} />
            <div className="songDetails">
                <p>{props.songName}</p>
                <p className="artistName">{props.artist}</p>
            </div>
            <img className="songDetailIcon" src={lyricsIcon} />
        </div>
    )
}

const Player = () => {

    const [toggleAlbumArt, SetToggleAlbum] = useState(false)
    const [albumArtUrl, SetAlbumArtUrl] = useState("https://raw.githubusercontent.com/roshanshibu/CocoBackend/master/images/matoma.jpg")
    const [accentColor, SetAccentColor] = useState("#EA7C44")
    const [previousLine, SetPreviousLine] = useState("Pull me close, show me, baby, where the light is")
    const [currentLine, SetCurrentLine] = useState("I was scared of a heart I couldn't silence")
    const [nextLine, SetNextLine] = useState("But you make me, you make me feel good")

    const [songName, SetSongName] = useState("Feel Good")
    const [artist, SetArtist] = useState("Gryffin")

    return(
        <div className="playerContainer">
            <AlbumArtLyric isAlbumArt={toggleAlbumArt} 
                albumArtUrl={albumArtUrl}
                accentColor={accentColor}
                previousLine={previousLine}
                currentLine={currentLine}
                nextLine={nextLine}
                />
            <SongDetailRow songName={songName} artist={artist} />
        </div>
    )
}

export default Player