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
        console.log(document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1].firstChild.firstChild.textContent);
        if(document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1]){
            console.log(document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1])
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutationRecord) {
                    if(document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1])
                        console.log(document.getElementsByClassName('chorusCard')[document.getElementsByClassName('chorusCard').length - 1].style.transform.replace(/translate3d|px|\(|\)/gi, '').split(','));          
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
            <p>Chorus Page</p>
            <div className='cardsContainer'>
                <ChorusCardStack />
            </div>
        </>
    )
}

export default Chorus;