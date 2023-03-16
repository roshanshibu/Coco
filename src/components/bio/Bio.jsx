import React,{ useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom"
import "./Bio.css"
import playIcon from "../../assets/padded_play.svg"
import { getBioDetails } from "../../api/bio"


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
    const [bioDetails, SetBioDetails] = useState(null)

    useEffect(()=>{
        getBioDetails(artistId)
            .then((res) => {
                SetBioDetails(res.data)
                console.log(bioDetails)
            })
            .catch((err) => console.error(err))
    }, [artistId])

    return (
        ((bioDetails) && <>
            <div className="bioFrameScroll">
                <div className="bioImageContainer" style={{backgroundImage: `url(${bioDetails.artistimage})`}} >
                    
                </div>
                <div className='biosArtist'>
                        <p className="biosArtistName">{bioDetails.artistName}</p>
                        <p className="biosContent">{bioDetails.bio}</p>
                </div>
                <div className="artistMusicList">
                    <p className="artistMusicListLabel">Top Hits</p>
                    {
                        bioDetails.topHits.map((topHit, index) => {
                            return (
                                <div className="amlCardsContainer">
                                    <ArtistMusicComponent key={index} songName={topHit.songname} image={topHit.albumart} year={topHit.year}/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="bioArtistRecommendations">
                    <p className="barLabel">Artists You May Like</p>
                    <div className="bArtistListContainer">
                        {
                            bioDetails.recommendedArtists.map((recommendedArtist, index) => {
                                return (
                                    <Link to={`/bio/${recommendedArtist.artistid}`} className="dashLinkDecorations">
                                        <RecommendedArtistComponent key={index} artist={recommendedArtist.artisname} image={recommendedArtist.artistimage}/>
                                    </Link>
                                    
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>)
    )
}

export default Bio