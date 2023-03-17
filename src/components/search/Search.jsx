import React, { useEffect, useState } from 'react';
import { getSearchResult } from '../../api/search';
import searchIcon from "../../assets/SearchIcon.svg"
import historyIcon from "../../assets/historyIcon.svg"
import "./Search.css"

const SearchResult = (props) => {
    return(
        <div className='searchResult'>
            <div style={{display: "flex", alignItems:"center"}}>
                <img className='searchImage' 
                    src={props.imageUrl} 
                    style={{borderRadius: `${props.stype!=="artist" ? "100px" : "10px"}`}}
                    />
                <div className='searchDetails'>
                    {props.stype!=="artist" &&  <p>{props.songName}</p>}
                    <p>{props.artistName}</p>
                </div>
            </div>
            {props.stype=="lyrics" && 
                <div>
                    <p style={{lineHeight: 0, textAlign: "center"}}>
                        " {props.lyricHit} "
                    </p>
                </div>}
        </div>
    )
}

const PreviousSearchTerm = (props) => {
    const handleRecentSearchClick = () => {
      props.setSearchTerm(props.term);
    };
  
    return (
      <div className='previousSearchTerm' onClick={handleRecentSearchClick}>
        <img src={historyIcon} className="historyIcon" />
        <p style={{ paddingLeft: "10px" }}>{props.term}</p>
      </div>
    );
  };

const Search = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        SetLoading(true)
        console.log(event.target.searchTerm.value)
        getSearchResult(event.target.searchTerm.value)
            .then((res) => {
                SetSearchResults(res.data)
                SetLoading(false)
            })
            
            .catch((err) => {
                    console.error(err)
                    SetLoading(false)
                    if (err.response && err.response.status === 404) {
                        SetSearchResults(null)
                        SetBadResults(true)
                        //alert("Custom 404 error message: Resource not found");
                        // or display the custom message in the UI using a modal, toast, or other component
                      }
            })
    }
    const [searchResults, SetSearchResults] = useState(null)
    const [badResults, SetBadResults] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, SetLoading] = useState(false)


    const handleInputChange = (event) => {
        setSearchTerm(props.term);
        
    }


    return(
        <div className='searchPage'>
            <p className='stitle'>Search</p>
            <form onSubmit={handleSubmit} className="searchBoxContainer">
                <input  className='searchBox' type="text" value = {searchTerm} name='searchTerm' onChange={handleInputChange} style={{width: "100%"}} placeholder="search by SongName, Artist or Lyrics..." />
                <button type="submit" className='searchButton'>
                    <img className='searchIcon' src={searchIcon}/>
                </button>
            </form>
            {searchResults !== null ? (
                <div>
                    {
                        searchResults.map((result, index)=>{
                            return (
                                <SearchResult stype={result.type} 
                                    artistName={result.artistName}
                                    songName={result.songName}
                                    lyricHit={result.lyricHit}
                                    imageUrl={result.url}
                                    key={index}
                                />
                            )
                        })
                    }
                </div>
            ) : badResults ? (
                <div className='previousSearchContainer'>
                    <p className='previousSearchesTitle'>No results Found</p>
                    <PreviousSearchTerm term="shape" setSearchTerm={setSearchTerm}/>
                    <PreviousSearchTerm term="gucci" setSearchTerm={setSearchTerm}/>
                    <PreviousSearchTerm term="ghost dragon" setSearchTerm={setSearchTerm}/>
                </div> 
            ) : (
                <div className='previousSearchContainer'>
                    <p className='previousSearchesTitle'>Previous Searches</p>
                    <PreviousSearchTerm term="shape" setSearchTerm={setSearchTerm}/>
                    <PreviousSearchTerm term="gucci" setSearchTerm={setSearchTerm}/>
                    <PreviousSearchTerm term="ghost dragon" setSearchTerm={setSearchTerm}/>
                </div> 
            )
            }
        </div>
    )
}

export default Search;