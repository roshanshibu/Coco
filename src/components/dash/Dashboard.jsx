import React,{useState} from 'react';
import "./Dashboard.css"
import myHomeIcon from "../../../coco-logo.png"
import albumArt from "../../assets/rect-album.jpg"
import playIcon from "../../assets/padded_play.svg"
import playlistBg from "../../assets/playlist_bg.svg"

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
            <div className='songIconContainer' style = {props.playlistType ? {backgroundImage: `url(${playlistBg})`, paddingRight:"12px", backgroundSize:"contain"} : {padding: "0px 11px 0px 3px"}}>
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
                <SongArtistSuggestion songName="Some Song" artist="Jane" image={albumArt} />
                <SongArtistSuggestion artist="Jane" image={albumArt} artistType={true}/>
                <SongArtistSuggestion artist="Jane" image={albumArt} artistType={true}/>
                <SongArtistSuggestion songName="Some Song" artist="Jane" image={albumArt} />
                
                <SongArtistSuggestion songName="Playlist" image={albumArt} playlistType={true}/>
                <SongArtistSuggestion songName="Playlist" image={albumArt} playlistType={true}/>
            </div>
        </div>
    )      
}

const MoodScrollList = () => {
    return(
        <div className='moodScroll'>
            <div className='lowEnergy'>
                <p className='moodTags'>low</p>
                <p className='moodTags'>low</p>
                <p className='moodTags'>low</p>
                <p className='moodTags'>low</p>
                <p className='moodTags'>low</p>
                <p className='moodTags'>low</p>
            </div>
            <div className='scrollCenter'>
                <img className='scrollIcon' src={myHomeIcon}/>
            </div>
            <div className='highEnergy'>
                <p className='moodTags'>High</p>
                <p className='moodTags'>High</p>
                <p className='moodTags'>High</p>
                <p className='moodTags'>High</p>
                <p className='moodTags'>High</p>
                <p className='moodTags'>High</p>
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
        </>
    )
}

export default Dashboard;