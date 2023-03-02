import React, {useState, useEffect} from 'react';
import TinderCard from 'react-tinder-card'
import "./Chorus.css";


const ChorusCard = (props) => {
    const [swipedOut, setSwipedOut] = useState(false);
    
    const delay = () => {
        return new Promise( res => setTimeout(res, 350) );
    }

    const onSwipe = async(direction) => {
        // console.log('card swiped to ' + direction)
        await delay()
        setSwipedOut(true)
        props.reportSwipe(direction, props.markerCard)
    }

    const onCardLeftScreen = (songName) => {
        console.log(songName + ' swiped out')
    }

    useEffect(() => {
        // card movements controls

        // get the card on the top
        let el = document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1]
        if(el){
            console.log(el)
            // get song details from card
            let songName = el.firstChild.getElementsByClassName("songName")[0].textContent;
            let songURL = el.firstChild.getElementsByClassName("songUrl")[0].textContent;
            let startTime = el.firstChild.getElementsByClassName("startTime")[0].textContent;
            let endTime = el.firstChild.getElementsByClassName("endTime")[0].textContent;
            
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
                    let startWidth = 65
                    let startHeight = 40
                    let endWidth = startWidth/3
                    let endHeight = startHeight/3

                    let cWidth = endWidth
                    let cHeight = endHeight
                    
                    let forceUpPos = -90
                    let stopUpPos = -330
                    let upTraiangleBase = 130
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
                        
                        if(y > -(startShrinkPos + startHeight - endHeight))
                            cHeight = startHeight + parseInt(y) + startShrinkPos;
                        // console.log(width)
                        el.style.width = (cWidth + "%")
                        el.style.height = (cHeight + "%")
                    }
                    else{
                        el.style.width = startWidth+"%"
                        el.style.height = startHeight+"%"
                    }
                });    
            });
            
            var target = document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1];
            observer.observe(target, { attributes : true, attributeFilter : ['style'] });
        }
    });

    return(
            <TinderCard className={swipedOut? 'gone':'chorusCard'} 
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen(props.songName)} 
                preventSwipe={['down']}
                swipeRequirementType={'position'}
                swipeThreshold={150}
                >
                <div style={{backgroundColor: props.color}} className="cardDetails">
                    <p className='songName'>{props.songName}</p>
                    <p className='artistName'>{props.artist}</p>
                    <p className='songUrl hiddenDetail'>{props.songUrl}</p>
                    <p className='startTime hiddenDetail'>{props.startTime}</p>
                    <p className='endTime hiddenDetail'>{props.endTime}</p>
                </div>
            </TinderCard>
    )
}

const ChorusCardStack = (props) => {

    const getNext5Cards = async() => {
        let songname = "Song " + Math.random()
        let artist = "Artist - " + Math.random()
        let color = (Math.floor(Date.now() / 1000) % 2 == 0 ? "pink" : "yellow")
        return ([<ChorusCard songName={"LOADING"} artist={"LOADING"} color={color}  songUrl="urlx"
                reportSwipe={reportSwipe} key={Math.random()*1000} setChorusSongUrl={props.setChorusSongUrl}
                setChorusStartTime={props.setChorusStartTime} setChorusEndTime={props.setChorusEndTime} />,
        <ChorusCard songName={("song "+Math.random()*1000)} artist={artist} color={color}  songUrl="https://edef1.pcloud.com/cBZPvwNeHZoRHj8YZ9pkRZZ4jtHo7Z2ZZ3pRZkZckcLZs7ZFXZUZmkZAXZEXZx7Z3kZ7XZbVZ5VZfXZhXZ0XZawLhZ3GPuDrRF06SPqh2stekEeVvWBbi7/Ed%20Sheeran%20-%20Beautiful%20People%20%28feat%20Khalid%29%20%5BOfficial%20Lyric%20Video%5D.mp3"
                startTime={140} endTime={148}
                reportSwipe={reportSwipe} key={Math.random()*1000} markerCard={true} 
                setChorusSongUrl={props.setChorusSongUrl} 
                setChorusStartTime={props.setChorusStartTime} setChorusEndTime={props.setChorusEndTime}/>,
        <ChorusCard songName={("song "+Math.random()*1000)} artist={artist} color={color}  songUrl="https://evc117.pcloud.com/dHZELvCeHZcthc4YZ9pkRZZB6lHo7Z2ZZ3pRZkZLERhZvEYi58dcCDFzSVvpnWPfgLXk4HTV/Gryffin%20Illenium%20-%20Feel%20Good%20ft%20Daya.mp3"
                startTime={216} endTime={228}
                reportSwipe={reportSwipe} key={Math.random()*1000} 
                setChorusSongUrl={props.setChorusSongUrl} 
                setChorusStartTime={props.setChorusStartTime} setChorusEndTime={props.setChorusEndTime}/>,
        ])
    }
        
    const reportSwipe = (direction, marker) => {
        console.log("card swiped to the "+direction)
        console.log()
        if(marker){
            let newCards = getNext5Cards()
            console.log("does not match")
            newCards.then((nextCard) => {
                setDynamicStack([nextCard, ...dynamicStack])
            })
        }
    }

    useEffect(()=>{
        console.log(dynamicStack)
    })
    
    let topCard = (<ChorusCard songName="Song1" artist="Artist1" color="red" songUrl="url1"
                    reportSwipe={reportSwipe} key={0} markerCard={true}  
                    setChorusSongUrl={props.setChorusSongUrl}
                    setChorusStartTime={props.setChorusStartTime} setChorusEndTime={props.setChorusEndTime} />)
    let nextCard = (<ChorusCard songName="Song2" artist="Artist2" color="green" songUrl="url2"
                    reportSwipe={reportSwipe} key={1}  
                    setChorusSongUrl={props.setChorusSongUrl}
                    setChorusStartTime={props.setChorusStartTime} setChorusEndTime={props.setChorusEndTime} />)
    const [dynamicStack, setDynamicStack] = useState([nextCard, topCard]);
    return(
        <>
            {dynamicStack}
        </>
    )
}

const ChorusPlayer = (props) => {
    useEffect(() => {
        let player = document.getElementsByClassName('hiddenChorusPlayer')[0]
        console.log("---",document.getElementsByClassName('hiddenChorusPlayer'))
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
        
    })

    return(
        <audio className='hiddenChorusPlayer'
            controls autoPlay loop
            src={props.chorusUrl}>
        </audio>
    )
}
const Chorus = () => {
    
    const [chorusSongUrl, setChorusSongUrl] = useState("")
    const [chorusStartTime, setChorusStartTime] = useState(10)
    const [chorusEndTime, setChorusEndTime] = useState(20)    
    
    return(
        <>
            <ChorusPlayer chorusUrl={chorusSongUrl} startTime={chorusStartTime} endTime={chorusEndTime} />
            <div className='cardsContainer'>
                <ChorusCardStack setChorusSongUrl={setChorusSongUrl} setChorusStartTime={setChorusStartTime} setChorusEndTime={setChorusEndTime} />
            </div>
        </>
    )
}

export default Chorus;