import React from 'react';
import TinderCard from 'react-tinder-card'
import "./Chorus.css";


const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
}
  
const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
}

const Chorus = () => {
    return(
        <>
            <p>Chorus Page</p>
            <div className='cardsContainer'>
                <TinderCard className='chorusCard' onSwipe={onSwipe} 
                    onCardLeftScreen={() => onCardLeftScreen('fooBar')} 
                    preventSwipe={['down']}>
                    <div>
                        <p className='songName'>Song Name</p>
                        <p className='artistName'>Artist</p>
                    </div>
                </TinderCard>
            </div>
        </>
    )
}

export default Chorus;