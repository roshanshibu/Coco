import "./Dashboard.css"
import playIcon from "../../assets/padded_play.svg"
import playlistBg from "../../assets/playlist_bg.svg"

const SongArtistSuggestion = (props) => {
    return (
        <div className="songSuggestion" onClick={props.playMusic ? ()=>{props.playMusic(props.songId)} : () => {}}>
            <div className='songIconContainer' style = {props.playlistType ? {backgroundImage: `url(${playlistBg})`, paddingRight:"14px", backgroundSize:"contain"} : {padding: "0px 11px 0px 3px"}}>
                <div className={`songIcon   ${props.artistType ? "artistBorder" : ""}`} style={{backgroundImage: `url(${props.image})`}}>
                    <img className={`playIcon  ${props.artistType ? "hidden" : ""}`} src={playIcon}/>
                </div>
            </div>
            <div className="songDetails">
                <div className='trialclass'>
                    {props.songName}
                </div>
                <p className="ssArtistName">{props.artist}</p>
            </div>
        </div>
    )
}

export default SongArtistSuggestion