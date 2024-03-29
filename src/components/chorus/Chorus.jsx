import React, {useState, useEffect, useContext} from 'react';
import TinderCard from 'react-tinder-card'
import "./Chorus.css";
import { getChorusPage } from "../../api/chorus"
import GradientBg from "../../assets/chorus_bg_gradient.svg"
import SuperlikeHint from "../../assets/superlike_hint.svg"
import DislikeHint from "../../assets/dislike_hint.svg"
import LikeHint from "../../assets/like_hint.svg"
import LoadingCard from "../../assets/loading_album_art.svg"
import PlayingIndicator from "../../assets/playing_indicator.gif"
import CircleLoad from "../../assets/circle_load.svg"
import SkeletonText from "../skeleton/Skeleton"
import { PlayerContext } from '../../MainRoutes';
import { useNavigate } from 'react-router';


const ChorusCard = (props) => {
    const [swipedOut, setSwipedOut] = useState(false);
    const playerContext = useContext(PlayerContext)
    const navigate = useNavigate()
    const onSwipe = async(direction) => {
        let player = document.getElementsByClassName('hiddenChorusPlayer')[0]

        if (direction === "up"){
            // console.log(playerContext.playingSongId, playerContext.setPlayingSongId)
            playerContext.setPlayingSongId(props.songid)
            playerContext.setGMiniPlayer(false)
            navigate("/")
        }

        player.ontimeupdate = () => {
            console.log("card left")
            if (player.volume >= 0.2){
                player.volume = player.volume - 0.2
            }
            
        }
        props.reportSwipe(direction, props.markerCard, setSwipedOut)
    }

    const onCardLeftScreen = (songName) => {
        console.log(songName + ' swiped out')
        setSwipedOut(true)
    }

    useEffect(() => {
        // card movements controls

        // get the card on the top
        let el = document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1]
        if(el){
            // console.log(el)
            // get song details from card
            //let songName = el.firstChild.getElementsByClassName("songName")[0].textContent;
            let songURL = el.firstChild.getElementsByClassName("songUrl")[0].textContent;
            let startTime = el.firstChild.getElementsByClassName("startTime")[0].textContent;
            let endTime = el.firstChild.getElementsByClassName("endTime")[0].textContent;
            let detailContainer = el.firstChild.getElementsByClassName("cardDetailsSubContainer")[0];
            
            if(!startTime)
                startTime = 10
            if(!endTime)
                endTime = 20
            props.setChorusSongUrl(songURL)
            props.setChorusStartTime(startTime)
            props.setChorusEndTime(endTime)

            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutationRecord) {
                    // console.log(el.style.transform.replace(/translate3d|px|\(|\)/gi, '').split(','));
                    let cPos = el.style.transform.replace(/translate3d|px|\(|\)/gi, '').split(',');
                    let x =  el.style.transform.replace(/translate3d|px|\(|\)/gi, '').split(',')[0].trim();
                    let y =  el.style.transform.replace(/translate3d|px|\(|\)/gi, '').split(',')[1].trim();
                    // console.log(x)
                    let startShrinkPos = 100

                    //measurements in percentages
                    let startWidth = 75
                    let startHeight = 50
                    let endWidth = startWidth/4
                    let endHeight = startHeight/4

                    let cWidth = endWidth
                    let cHeight = endHeight
                    
                    let forceUpPos = -150
                    let stopUpPos = -180
                    let upTraiangleBase = 10
                    
                    let detailOpactityEndY = -115
                    let detailOpactity = 1
                    if(y < forceUpPos){
                        let compX = x
                        let compY
                        //check if x coordinate is outside allowed limit
                        let cBase = (((Math.abs(stopUpPos) - Math.abs(y))) / (Math.abs(stopUpPos) - Math.abs(forceUpPos))) * upTraiangleBase/2
                        if (Math.abs(x) > cBase){
                            if(x > 0)
                                compX = cBase
                            else
                                compX = -cBase
                        }
                        let newPos = 'translate3d('+ compX + 'px, '+ cPos[1] + 'px, 0px)'
                        //dont go further up beyond stopUpPos
                        if (y < stopUpPos)
                            newPos = 'translate3d('+ compX + 'px, '+ stopUpPos + 'px, 0px)'
                        
                            // console.log(newPos)
                        el.style.transform = newPos;
                    }

                    if(y < -startShrinkPos){
                        if(y > -(startShrinkPos + startWidth - endWidth))
                            cWidth = startWidth + parseInt(y) + startShrinkPos;
                        
                        if(y > -(startShrinkPos + startHeight - endHeight)){
                            cHeight = startHeight + parseInt(y) + startShrinkPos;
                            detailContainer.style.opacity = 0                            
                        }

                        // console.log(width)
                        el.style.width = (cWidth + "%")
                        el.style.height = (cHeight + "%")
                    }
                    else{
                        el.style.width = startWidth+"%"
                        el.style.height = startHeight+"%"
                        detailContainer.style.opacity = 1
                    }
                });    
            });
            
            var target = document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1];
            observer.observe(target, { attributes : true, attributeFilter : ['style'] });
        }
    });

    return(
            <TinderCard className={swipedOut? 'gone':'chorusCard'} 
                data-testid='chorusCard'
                flickOnSwipe={props.loading}
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen(props.songName)} 
                preventSwipe={['down']}
                swipeRequirementType={'position'}
                swipeThreshold={150}
                >
                <div style={{backgroundImage: "url(" + (props.loading? LoadingCard : props.albumArt) + ")",
                            border: "solid 3px " + props.color}} 
                    className="cardDetails">
                    <div className="cardDetailsSubContainer"
                        style={{backgroundImage: `url(${GradientBg})`}} 
                        >
                        {props.loading ?
                            <div className='skeletonContainer'>
                                <SkeletonText length={17} size={15} /><br/>
                                <SkeletonText length={13} size={12} color="grey" />
                            </div>
                            :
                            <>
                                <img src={CircleLoad} className='chorusPlayingIndicator' id={props.songUrl} />
                                <p className='songName unselectableText'>{props.songName}</p>
                                <p className='artistName unselectableText' style={{color: props.color}}>{props.artist}</p>
                            </>
                        }    
                    </div>
                    <p className='songUrl hiddenDetail'>{props.songUrl}</p>
                    <p className='startTime hiddenDetail'>{props.startTime}</p>
                    <p className='endTime hiddenDetail'>{props.endTime}</p>
                </div>
            </TinderCard>
    )
}

const ChorusCardStack = (props) => {

    const parseSongs = (songJson) => {
        let loadingCard = <ChorusCard loading={true} songUrl="urlx" color="grey"
                            reportSwipe={reportSwipe} key={Math.random()*1000} setChorusSongUrl={props.setChorusSongUrl}
                            setChorusStartTime={props.setChorusStartTime} setChorusEndTime={props.setChorusEndTime}
                            />
        let cardsStack = [loadingCard]
        let songBaseUrl = ""
        let albumArtBaseUrl = ""
        songJson.map((song, index) => {
            if(index == 0){
                songBaseUrl = song.song_base_url
                albumArtBaseUrl = song.album_art_base_url 
            }else if(song.albumArt){
                let retCard = <ChorusCard songName={song.songName} artist={song.artist} color={song.color}  
                                albumArt={albumArtBaseUrl + song.albumArt} songUrl={songBaseUrl + song.url}
                                startTime={song.startTime} endTime={song.endTime}
                                reportSwipe={reportSwipe} key={Math.random()*1000} markerCard={index == 1 ? true : false} 
                                setChorusSongUrl={props.setChorusSongUrl} 
                                setChorusStartTime={props.setChorusStartTime} 
                                setChorusEndTime={props.setChorusEndTime}
                                songid={song.songid}
                                />
                cardsStack.push(retCard)
            }
        })
        return cardsStack
    }
    
    const reportSwipe = (direction, marker) => {
        console.log("card swiped to the "+direction)
        if(marker){
            let next5Cards = []
            getChorusPage(1)
                .then((res) => {
                    // next5Cards = [...next5Cards, ...parseSongs(res.data)]
                    // setDynamicStack([next5Cards, ...dynamicStack])
                    console.error(res.data)
                    setDynamicStack([...parseSongs(res.data)])
                })
                .catch((err) => console.error(err));;
        }
    }

    useEffect(()=>{
        let topCards = []
        getChorusPage(1)
            .then((res) => {
                console.log(res.data)
                topCards = parseSongs(res.data)
                setDynamicStack([topCards])
            })
            .catch((err) => console.error(err));;
    }, [])


    const [dynamicStack, setDynamicStack] = useState([]);
    return(
        <>
            {dynamicStack}
        </>
    )
}

const ChorusPlayer = (props) => {
    useEffect(() => {
        let player = document.getElementsByClassName('hiddenChorusPlayer')[0]
        if(player){
            player.onplay = () => {
                let loadingIcon = document.getElementById(props.chorusUrl)
                if (loadingIcon){
                loadingIcon.src = PlayingIndicator
                }
            }

            player.ontimeupdate = () => {
                let softFadeDelay = 1
                if (player.currentTime <= (props.startTime - softFadeDelay)|| player.currentTime >= (props.endTime + softFadeDelay)) 
                {
                        player.currentTime = props.startTime - softFadeDelay
                }
                    
                if (player.currentTime <= props.startTime)
                {
                        let computedVolume = (softFadeDelay - (props.startTime - player.currentTime))/softFadeDelay
                        if (computedVolume < 0.1)
                            player.volume = 0
                        else
                            player.volume = computedVolume
                }
                else if (player.currentTime >= props.endTime)
                {
                        let computedVolume = (softFadeDelay - (player.currentTime - props.endTime))/softFadeDelay
                        if (computedVolume < 0.1)
                            player.currentTime = props.startTime - softFadeDelay
                        else
                            player.volume = computedVolume
                }
                else
                {
                    player.volume = 1
                }
            }
        }
        
    })

    return(
        <audio className='hiddenChorusPlayer'
            controls autoPlay loop
            // controls loop
            src={props.chorusUrl}>
        </audio>
    )
}

const Hint = (props) => {
    return (
        <div className={"hint " + props.hintClass}>
        <img src={props.icon}
            className={"hintIcon"} />
        </div>
    )
}
const Chorus = () => {
    
    const [chorusSongUrl, setChorusSongUrl] = useState("")
    const [chorusStartTime, setChorusStartTime] = useState(10)
    const [chorusEndTime, setChorusEndTime] = useState(20)   

    const updateSongUrl = (newurl) => {
        setChorusSongUrl(newurl)
    }
    const playerContext = useContext(PlayerContext)
    useEffect(()=>{
        playerContext.setPlayingSongId(null)
    })

    return(
        <div className='chorusPageContainer' data-testid='chorusPage'>
            <div className='hintsContainer'>
                <Hint icon={DislikeHint} hintClass="dislikeHint" />
                <Hint icon={SuperlikeHint} hintClass="superlikeHint" />
                <Hint icon={LikeHint} hintClass="likeHint" />
            </div>
            <ChorusPlayer chorusUrl={chorusSongUrl} startTime={chorusStartTime} endTime={chorusEndTime}/>
            <div className='cardsContainer'>
                <ChorusCardStack setChorusSongUrl={updateSongUrl} 
                                setChorusStartTime={setChorusStartTime} 
                                setChorusEndTime={setChorusEndTime}
                                />
            </div>
        </div>
    )
}

export default Chorus;