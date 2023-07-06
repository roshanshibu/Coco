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
    return(
        <div className='previousSearchTerm'>
            <img src={historyIcon} className="historyIcon" />
            <p style={{paddingLeft: "10px"}}>{props.term}</p>
        </div>
    )
}

const Search = () => {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     SetLoading(true)
    //     console.log(event.target.searchTerm.value)
    //     let sId = 1
    //     if(event.target.searchTerm.value === "shape")
    //         sId = 2
    //     getSearchResult(sId)
    //         .then((res) => {
    //             SetSearchResults(res.data)
    //             SetLoading(false)
    //         })
    //         .catch((err) => {
    //                 console.error(err)
    //                 SetLoading(false)
    //         })
    // }
    // const [searchResults, SetSearchResults] = useState(null)
    // const [loading, SetLoading] = useState(false)


    return(
        // <div className='searchPage'>
        //     <p className='stitle'>Search</p>
        //     <form onSubmit={handleSubmit} className="searchBoxContainer">
        //         <input  className='searchBox' type="text" name='searchTerm' style={{width: "100%"}} />
        //         <button type="submit" className='searchButton'>
        //             <img className='searchIcon' src={searchIcon}/>
        //         </button>
        //     </form>
        //     {searchResults !== null ?
        //         <div>
        //             {
        //                 searchResults.map((result, index)=>{
        //                     return (
        //                         <SearchResult stype={result.type} 
        //                             artistName={result.artistName}
        //                             songName={result.songName}
        //                             lyricHit={result.lyricHit}
        //                             imageUrl={result.url}
        //                             key={index}
        //                         />
        //                     )
        //                 })
        //             }
        //         </div>
        //         :
        //         <div className='previousSearchContainer'>
        //             <p className='previousSearchesTitle'>Previous Searches</p>
        //             <PreviousSearchTerm term="Taylor Swift" />
        //             <PreviousSearchTerm term="FatRat" />
        //             <PreviousSearchTerm term="Ghost Dragon" />
        //         </div>   
        //     }
        // </div>
        <p>Search</p>
    )
}

export default Search;