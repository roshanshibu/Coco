import React,{useContext, useEffect, useState} from 'react';
import { getDashDetails } from "../../api/dash"
import "./Dashboard.css"
import myHomeIcon from "../../assets/coco-logo.png"
import albumArt from "../../assets/rect-album.jpg"
import playIcon from "../../assets/padded_play.svg"
import playlistBg from "../../assets/playlist_bg.svg"
import moodScrollIcon from "../../assets/moodScrollIcon.svg"
import albumArt2 from "../../assets/albumartsnowman.jpg"
import albumCover from "../../assets/music2.jpg"
import playlistCover from "../../assets/playlistCover.jpg"
import artistCover from "../../assets/artist1.jpg"
import { NavLink } from 'react-router-dom';
import { PlayerContext } from '../../MainRoutes';


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
                {/* <p>{props.songName}</p> */}
                <p className="ssArtistName">{props.artist}</p>
            </div>
        </div>
    )
}

const Foryou = (props) => {
    return (
        ((props.data !== null) && <div className='forYou'>
            <p className='forYouLabel'>Your Top Picks</p>
            <div className='suggestions'>
                {
                    props.data.map((topPick,index) => {
                        //console.log(topPick)

                        switch(topPick.type) {
                            case "song":
                                console.log(topPick);
                                return <SongArtistSuggestion 
                                            key = {index} songName={topPick.songname} 
                                            artist={topPick.artist} image={topPick.albumart}
                                            playMusic={props.playMusic}
                                            songId={1}/>
                            case "artist":
                                console.log(topPick);
                                return <SongArtistSuggestion key = {index} artist={topPick.artist} image={topPick.artistimage} artistType={true}/>
                            case "playlist":
                                console.log(topPick);
                                return <SongArtistSuggestion key = {index} songName={topPick.playlistname} image={topPick.albumart} playlistType={true} playMusic={props.playMusic} songId={3}/>
                        }   

                    })
                }
            </div>
        </div>)
    )      
}

const MoodScrollList = () => {
    return(
        <div className='moodPicker'>
            <p className='moodPickerLabel'>Play To Your Mood</p>
            <div className='moodScroll'>
                <div className='lowEnergy'>
                    <p className='moodTags'>sleep</p>
                    <p className='moodTags'>relax</p>
                    <p className='moodTags'>focus</p>
                    <p className='moodTags'>Calm</p>
                    <p className='moodTags'>Sad</p>
                </div>
                <div className='scrollCenter'>
                    <img className='scrollIcon' src={moodScrollIcon}/>
                </div>
                <div className='highEnergy'>
                    <p className='moodTags'>party</p>
                    <p className='moodTags'>Chill</p>
                    <p className='moodTags'>Workout</p>
                    <p className='moodTags'>energetic</p>
                    <p className='moodTags'>Travel</p>
                </div>
            </div>
        </div>
    )
}


const SuggestionCard = () => {
    return(
        <div className='suggestionCardContainer'>
            <p className='suggestionCardLabel'>Picked For You</p>
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
        </div>
    )
}

const GenreBasedRadios = () => {
    return(
        <div className='genreRadiosContainer'>
            <p className='genreRadiosLabel'>Genre Based Radios</p>
            {/* <div className='radioScrollFlex'> */}
                {/* <img className='scrollIcon' src={moodScrollIcon}/> */}
                <div className='dashboardRadios'>
                    <div>
                        <img className='dashboardRadio' src={albumCover}/>
                        <p className='radioLabel'>POP</p>
                    </div>
                    <div>
                        <img className='dashboardRadio' src={albumCover}/>
                        <p className='radioLabel'>POP</p>
                    </div>
                    <div>
                        <img className='dashboardRadio' src={albumCover}/>
                        <p className='radioLabel'>POP</p>
                    </div>
                    <div>
                        <img className='dashboardRadio' src={albumCover}/>
                        <p className='radioLabel'>POP</p>
                    </div>
                    <div>
                        <img className='dashboardRadio' src={albumCover}/>
                        <p className='radioLabel'>POP</p>
                    </div>
                </div>
                {/* <img className='scrollIcon' src={moodScrollIcon}/> */}
            {/* </div> */}
        </div>
    )
}


const Dashboard = () => {
    const [productName, setProductName] = useState("coco")
    
    const [topPicks, SetTopPicks] = useState(null)
    useEffect(()=>{
        getDashDetails(1)
            .then((res) => {
                SetTopPicks(res.data.topPicks)
            })
            .catch((err) => console.error(err))
    }, [])

    const playerContext = useContext(PlayerContext)

    const playMusic = (songId) => {
        playerContext.setPlayingSongId(songId)
        playerContext.setGMiniPlayer(false)
    }
    return(
        <>
            <Header product={productName} />
            <div className='dashboardFrame'>
            <Foryou data={topPicks} playMusic={playMusic}/>
            <MoodScrollList/>
            <SuggestionCard/>
            <GenreBasedRadios/>
            </div>
        </>
    )
}

export default Dashboard;