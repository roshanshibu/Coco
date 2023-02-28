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
        // get songname from card
        // console.log(document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1].firstChild.firstChild.textContent);
    
        let el = document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1]
        if(el){
            console.log(el)
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutationRecord) {
                    // console.log(el.style.transform.replace(/translate3d|px|\(|\)/gi, '').split(','));
                    let cPos = el.style.transform.replace(/translate3d|px|\(|\)/gi, '').split(',');
                    let x =  el.style.transform.replace(/translate3d|px|\(|\)/gi, '').split(',')[0].trim();
                    let y =  el.style.transform.replace(/translate3d|px|\(|\)/gi, '').split(',')[1].trim();
                    // console.log(x)
                    let startShrinkPos = 90

                    //measurements in percentages
                    let startWidth = 65
                    let startHeight = 40
                    let endWidth = startWidth/3
                    let endHeight = startHeight/3

                    let cWidth = endWidth
                    let cHeight = endHeight
                    
                    let forceUpPos = -90
                    let stopUpPos = -330
                    let upTraiangleBase = 90
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
                </div>
            </TinderCard>
    )
}

const ChorusCardStack = () => {

    const getNext5Cards = async() => {
        let songname = "Song " + Math.random()
        let artist = "Artist - " + Math.random()
        let color = (Math.floor(Date.now() / 1000) % 2 == 0 ? "pink" : "yellow")
        return ([<ChorusCard songName={"LOADING"} artist={"LOADING"} color={color} reportSwipe={reportSwipe} key={Math.random()*1000} />,
        <ChorusCard songName={("song "+Math.random()*1000)} artist={artist} color={color} reportSwipe={reportSwipe} key={Math.random()*1000} markerCard={true} />,
        <ChorusCard songName={("song "+Math.random()*1000)} artist={artist} color={color} reportSwipe={reportSwipe} key={Math.random()*1000} />,
        <ChorusCard songName={("song "+Math.random()*1000)} artist={artist} color={color} reportSwipe={reportSwipe} key={Math.random()*1000} />,
        <ChorusCard songName={("song "+Math.random()*1000)} artist={artist} color={color} reportSwipe={reportSwipe} key={Math.random()*1000} />
        ])
    }
        
    const reportSwipe = (direction, marker) => {
        console.log("card swiped to the "+direction)
        if(marker){
            let newCard = getNext5Cards()
            console.log("does not match")
            newCard.then((nextCard) => {
                setDynamicStack([nextCard, ...dynamicStack])
            })
        }
    }

    useEffect(()=>{
        console.log(dynamicStack)
    })
    
    let topCard = (<ChorusCard songName="Song1" artist="Artist1" color="red" reportSwipe={reportSwipe} key={0} markerCard={true} />)
    let nextCard = (<ChorusCard songName="Song2" artist="Artist2" color="green" reportSwipe={reportSwipe} key={1}  />)
    const [dynamicStack, setDynamicStack] = useState([nextCard, topCard]);
    return(
        <>
            {dynamicStack}
        </>
    )
}
const Chorus = () => {
    return(
        <>
            <div className='cardsContainer'>
                <ChorusCardStack />
            </div>
        </>
    )
}

export default Chorus;