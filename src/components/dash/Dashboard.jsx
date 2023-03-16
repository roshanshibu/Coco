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
import { PlayerContext, UserContext } from '../../MainRoutes';


const Header = (props) => {
    const userContext = useContext(UserContext);
  
    return (
        <div className='header' >
            <img className='logo' src={myHomeIcon} alt="coco logo" />
            <p className='productName'>{props.product}</p>
            <img className='dashUserImage' src={myHomeIcon} alt="coco logo" 
                onClick={() => {
                    if(userContext.currentUserId == 1)
                        userContext.setCurrentUserId(2)
                    else
                    userContext.setCurrentUserId(1)
                }}
            />
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

                        switch(topPick.type) {
                            case "song":
                                return <SongArtistSuggestion 
                                            key = {index} songName={topPick.songname} 
                                            artist={topPick.artist} image={topPick.albumart}
                                            playMusic={props.playMusic}
                                            songId={1}/>
                            case "artist":
                                return <SongArtistSuggestion key = {index} artist={topPick.artist} image={topPick.artistimage} artistType={true}/>
                            case "playlist":
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


const SuggestionCard = (props) => {
    return(
        ((props.data !== null) && <div className='suggestionCardContainer'>
            <p className='suggestionCardLabel'>Picked For You</p>
            <div className='suggestionCard'>
                <div className='topPlay'>
                    <div className='topAlbumCover'>
                        <img className='coverImage' src={props.data.image}/>
                    </div>
                    <div className='topAlbumDetails'>
                        <p className='topPlayHeading'>Because you listened to</p>
                        <p className='topPlaySong'>{props.data.songname} | {props.data.artistname}</p>
                    </div>
                </div>
                {
                    props.data.recommendations.map((recommendation,index) => {
                        return (
                        <div>
                        <SongArtistSuggestion key={index} songName={recommendation.songname} artist={recommendation.artist} image={recommendation.albumart} />
                        </div>
                        )
                    })
                }
            </div>
        </div>)
    )
}

const GenreBasedRadios = (props) => {
    return(
        ((props.data !== null) && <div className='genreRadiosContainer'>
            <p className='genreRadiosLabel'>Genre Based Radios</p>
                <div className='dashboardRadios'>
                    {
                        props.data.map((radio, index) => {
                            return (
                                <div>
                                    <img className='dashboardRadio' src={radio.image}/>
                                    <p className='radioLabel'>{radio.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
        </div>)
    )
}


const Dashboard = () => {
    const [productName, setProductName] = useState("coco")
    const [topPicks, SetTopPicks] = useState(null)
    const [suggestionCardData, SetSuggestionCardData] = useState(null)
    const [genreRadios, SetGenreRadios] = useState(null)

    const userContext = useContext(UserContext);

    useEffect(()=>{
        getDashDetails(userContext.currentUserId)
            .then((res) => {
                SetTopPicks(res.data.topPicks)
                SetSuggestionCardData(res.data.pickedForYou)
                SetGenreRadios(res.data.radios)
            })
            .catch((err) => console.error(err))
    }, [userContext.currentUserId])

    const playerContext = useContext(PlayerContext)

    const playMusic = (songId) => {
        playerContext.setPlayingSongId(songId)
        playerContext.setGMiniPlayer(false)
    }
    return(
        <div data-testid='dashPage'>
            <Header product={productName} data-testid='dashboard'/>
            <div className='dashboardFrame'>
            <Foryou data={topPicks} playMusic={playMusic}/>
            <MoodScrollList/>
            <SuggestionCard data={suggestionCardData}/>
            <GenreBasedRadios data={genreRadios}/>
            </div>
        </div>
    )
}

export default Dashboard;