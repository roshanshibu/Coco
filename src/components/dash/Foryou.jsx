import "./Dashboard.css"
import { Link } from 'react-router-dom';
import SongArtistSuggestion from './SongArtistSuggestion'


const Foryou = (props) => {
    return (
        ((props.data !== null) && <div className='forYou' data-testid='foryou'>
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
                                            songId={topPick.songid}/>
                            case "artist":
                                return(
                                    <Link to={`/bio/${topPick.artistid}`} className="dashLinkDecorations">
                                        <SongArtistSuggestion key = {index} artist={topPick.artist} image={topPick.artistimage} artistType={true}/>
                                    </Link>
                                )
                            case "playlist":
                                return <SongArtistSuggestion key = {index} songName={topPick.playlistname} image={topPick.albumart} playlistType={true} playMusic={props.playMusic} songId={topPick.songid}/>
                        }   

                    })
                }
            </div>
        </div>)
    )      
}

export default Foryou