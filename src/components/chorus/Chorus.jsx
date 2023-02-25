import React, {useState, useEffect} from 'react';
import TinderCard from 'react-tinder-card'
import "./Chorus.css";


const ChorusCard = (props) => {
    const [swipedOut, setSwipedOut] = useState(false);
    
    const delay = () => {
        return new Promise( res => setTimeout(res, 350) );
    }

    const onSwipe = async(direction) => {
        console.log('card swiped to ' + direction)
        await delay()
        setSwipedOut(true)
    }

    const onCardLeftScreen = (songName) => {
        console.log(songName + ' swiped out')
    }

    useEffect(() => {
        if(document.getElementsByClassName('chorusCard')[0]){
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutationRecord) {
                    if(document.getElementsByClassName('chorusCard')[0])
                        console.log(document.getElementsByClassName('chorusCard')[0].style.transform.replace(/translate3d|px|\(|\)/gi, '').split(','));
                });    
            });
            
            var target = document.getElementsByClassName('chorusCard')[0];
            observer.observe(target, { attributes : true, attributeFilter : ['style'] });
        }
    });

    return(
        <TinderCard className={swipedOut ? 'gone' : 'chorusCard'} 
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

const Chorus = () => {
    return(
        <>
            <p>Chorus Page</p>
            <div className='cardsContainer'>
                <ChorusCard songName="Hello" artist="Adele" color="red" />
                <ChorusCard songName="Running Out" artist="Astrid S" color="blue" />
                <ChorusCard songName="Song 3" artist="Artist A" color="green" />
                <ChorusCard songName="Song 4" artist="Artist B" color="yellow" />
                <ChorusCard songName="Song 5" artist="Artist C" color="orange" />
                <ChorusCard songName="Song 6" artist="Artist D" color="pink" />
            </div>
        </>
    )
}

export default Chorus;