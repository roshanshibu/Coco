import React,{useState} from 'react';
import "./Dashboard.css"
import myHomeIcon from "../../../coco-logo.png"
import albumArt from "../../assets/rect-album.jpg"
import playIcon from "../../assets/padded_play.svg"
import playlistBg from "../../assets/playlist_bg.svg"
import moodScrollIcon from "../../assets/moodScrollIcon.svg"
import albumArt2 from "../../assets/albumartsnowman.jpg"
import albumCover from "../../assets/music2.jpg"
import playlistCover from "../../assets/playlistCover.jpg"
import artistCover from "../../assets/artist1.jpg"

const Header = (props) => {
    return (
        <div className='header' >
            <img className='logo' src={myHomeIcon} alt="coco logo" />
            <p className='productName'>{props.product}</p>
        </div>
    )      
}

const SongArtistSuggestion = (props) => {
    return (
        <div className="songSuggestion">
            <div className='songIconContainer' style = {props.playlistType ? {backgroundImage: `url(${playlistBg})`, paddingRight:"19px", backgroundSize:"contain"} : {padding: "0px 11px 0px 3px"}}>
                <div className={`songIcon   ${props.artistType ? "artistBorder" : ""}`} style={{backgroundImage: `url(${props.image})`}}>
                    <img className={`playIcon  ${props.artistType ? "hidden" : ""}`} src={playIcon}/>
                </div>
            </div>
            <div className="songDetails">
                <p>{props.songName}</p>
                <p className="ssArtistName">{props.artist}</p>
            </div>
        </div>
    )
}

const Foryou = () => {
    return (
        <div className='forYou'>
            <p className='forYouLabel'>For You</p>
            <div className='suggestions'>
                <SongArtistSuggestion songName="Some Song" artist="Jane" image={albumCover} />
                <SongArtistSuggestion artist="Jane" image={artistCover} artistType={true}/>
                <SongArtistSuggestion artist="Jane" image={artistCover} artistType={true}/>
                <SongArtistSuggestion songName="Some Song" artist="Jane" image={albumArt} />
                <SongArtistSuggestion songName="Playlist" image={playlistCover} playlistType={true}/>
                <SongArtistSuggestion songName="Playlist" image={playlistCover} playlistType={true}/>
            </div>
        </div>
    )      
}

const MoodScrollList = () => {
    return(
        <div className='moodScroll'>
            <div className='lowEnergy'>
                <p className='moodTags'>sleep</p>
                <p className='moodTags'>relax</p>
                <p className='moodTags'>focus</p>
                <p className='moodTags'>low</p>
                <p className='moodTags'>low</p>
                <p className='moodTags'>low</p>
            </div>
            <div className='scrollCenter'>
                <img className='scrollIcon' src={moodScrollIcon}/>
            </div>
            <div className='highEnergy'>
                <p className='moodTags'>party</p>
                <p className='moodTags'>energetic</p>
                <p className='moodTags'>High</p>
                <p className='moodTags'>High</p>
                <p className='moodTags'>High</p>
                <p className='moodTags'>High</p>
            </div>
        </div>
    )
}


const SuggestionCard = () => {
    return(
        <div className='suggestionCard'>
            <div className='topPlay'>
                <div className='topAlbumCover'>
                    <img className='coverImage' src={albumArt2}/>
                </div>
                <div className='topAlbumDetails'>
                    <p className='topPlayHeading'>Because you listened to</p>
                    <p className='topPlaySong'>Snowman | Sia</p>
                </div>
            </div>
            <div>
                <SongArtistSuggestion songName="Some Song" artist="Jane" image={albumArt} />
            </div>
            <div>
                <SongArtistSuggestion songName="Some Song" artist="Jane" image={albumArt} />
            </div>
        </div>
    )
}

const Dashboard = () => {
    const [productName, setProductName] = useState("coco")
    return(
        <>
            <Header product={productName} />
            <Foryou/>
            <MoodScrollList/>
            <SuggestionCard/>
        </>
    )
}

export default Dashboard;