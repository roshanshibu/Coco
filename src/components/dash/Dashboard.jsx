import React,{useContext, useEffect, useState} from 'react';
import { getDashDetails } from "../../api/dash"
import "./Dashboard.css"
import myHomeIcon from "../../assets/coco-logo.png"
import user1Image from "../../assets/steve.jpg"
import user2Image from "../../assets/linda.jpg"
import moodScrollIcon from "../../assets/moodScrollIcon.svg"
import { PlayerContext, UserContext } from '../../MainRoutes';

import Foryou from './Foryou'
import SongArtistSuggestion from './SongArtistSuggestion'



const Header = (props) => {
    const userContext = useContext(UserContext);
  
    return (
        <div className='header' data-testid='header'>
            <img className='logo' src={myHomeIcon} alt="coco logo" />
            <p className='productName'>{props.product}</p>
            <img className='dashUserImage' data-testid='userImage' src={userContext.currentUserId == 1 ? user1Image : user2Image} alt="user image" 
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

const MoodScrollList = (props) => {
    return(
        <div className='moodPicker'>
            <p className='moodPickerLabel'>Play To Your Mood</p>
            <div className='moodScroll'>
                <div className='lowEnergy'>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(1)} : () => {}} className='moodTags'>sleep</p>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(2)} : () => {}} className='moodTags'>relax</p>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(3)} : () => {}} className='moodTags'>focus</p>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(4)} : () => {}} className='moodTags'>Calm</p>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(5)} : () => {}} className='moodTags'>Sad</p>
                </div>
                <div className='scrollCenter'>
                    <img className='scrollIcon' src={moodScrollIcon}/>
                </div>
                <div className='highEnergy'>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(6)} : () => {}} className='moodTags'>party</p>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(7)} : () => {}} className='moodTags'>Chill</p>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(8)} : () => {}} className='moodTags'>Workout</p>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(9)} : () => {}} className='moodTags'>energetic</p>
                    <p onClick={props.playMusic ? ()=>{props.playMusic(10)} : () => {}} className='moodTags'>Travel</p>
                </div>
            </div>
        </div>
    )
}


const SuggestionCard = (props) => {
    return(
        ((props.data !== null) && <div className='suggestionCardContainer'>
            <p className='suggestionCardLabel'>Picked For {props.user}</p>
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
                        <div onClick={props.playMusic ? ()=>{props.playMusic(recommendation.songid)} : () => {}}>
                        <SongArtistSuggestion key={index} songName={recommendation.songname} artist={recommendation.artist} image={recommendation.albumart} songId={recommendation.songid}/>
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
                                <div onClick={props.playMusic ? ()=>{props.playMusic(radio.songid)} : () => {}}>
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
    // const [productName, setProductName] = useState("coco")
    // const [userName, SetUserName] = useState(null)
    // const [topPicks, SetTopPicks] = useState(null)
    // const [suggestionCardData, SetSuggestionCardData] = useState(null)
    // const [genreRadios, SetGenreRadios] = useState(null)

    // const userContext = useContext(UserContext);

    // useEffect(()=>{
    //     getDashDetails(userContext.currentUserId)
    //         .then((res) => {
    //             SetUserName(res.data.userName)
    //             SetTopPicks(res.data.topPicks)
    //             SetSuggestionCardData(res.data.pickedForYou)
    //             SetGenreRadios(res.data.radios)
    //         })
    //         .catch((err) => console.error(err))
    // }, [userContext.currentUserId])

    // const playerContext = useContext(PlayerContext)

    // const playMusic = (songId) => {
    //     playerContext.setPlayingSongId(songId)
    //     playerContext.setGMiniPlayer(false)
    // }
    return(
        // <div data-testid='dashPage'>
        //     <Header product={productName}/>
        //     <div className='dashboardFrame'>
        //     <Foryou data={topPicks} playMusic={playMusic}/>
        //     <MoodScrollList playMusic={playMusic}/>
        //     <SuggestionCard data={suggestionCardData} user={userName} playMusic={playMusic}/>
        //     <GenreBasedRadios data={genreRadios} playMusic={playMusic}/>
        //     </div>
        // </div>
        <p>
            Dashboard
        </p>
    )
}

export default Dashboard;