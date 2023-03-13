import {useParams} from "react-router-dom"
import "./Bio.css"
import playIcon from "../../assets/padded_play.svg"

import artistCover from "../../assets/artist1.jpg"
import albumCover from "../../assets/music2.jpg"


const ArtistMusicComponent = (props) => {
    return(
        <div className="artistMusicCard">
            <div className="bioSongSuggestion">
                <div className='bioSongIconContainer'>
                    <div className="bioSongIcon"  style={{backgroundImage: `url(${props.image})`}}>
                        <img className="playIcon" src={playIcon}/>
                    </div>
                </div>
                <div className="bioSongDetails">
                    <div>
                        {props.songName}
                    </div>
                    <p className="bioSongYear">{props.year}</p>
                </div>
            </div>
        </div>
    )
}

const RecommendedArtistComponent = (props) => {
    return(
        <div>
            <div className="barImageContainer" style={{backgroundImage: `url(${props.image})`}}></div>
            <p className='barName'>{props.artist}</p>
        </div>
    )

}


const Bio = () => {
    const { artistId } = useParams()

    return (
        <>
            <div className="bioFrameScroll">
                <div className="bioImageContainer" style={{backgroundImage: `url(${artistCover})`}} >
                    
                </div>
                <div className='biosArtist'>
                        <p className="biosArtistName">Artist Name</p>
                        <p className="biosContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="artistMusicList">
                    <p className="artistMusicListLabel">Top Hits</p>
                    <div className="amlCardsContainer">
                        <ArtistMusicComponent songName="Some Song" artist="Jane" image={albumCover} year="2023"/>
                        <ArtistMusicComponent songName="Some Song 2" artist="Jane" image={albumCover} year="2019"/>
                        <ArtistMusicComponent songName="Some Song 3" artist="Jane" image={albumCover} year="2019"/>
                    </div>
                </div>
                <div className="bioArtistRecommendations">
                    <p className="barLabel">Artists You May Like</p>
                    <div className="bArtistListContainer">
                        <RecommendedArtistComponent artist="John" image={artistCover}/>
                        <RecommendedArtistComponent artist="John" image={artistCover}/>
                        <RecommendedArtistComponent artist="John" image={artistCover}/>
                        <RecommendedArtistComponent artist="John" image={artistCover}/>
                        <RecommendedArtistComponent artist="John" image={artistCover}/>
                        <RecommendedArtistComponent artist="John" image={artistCover}/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Bio