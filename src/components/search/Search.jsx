import React, { useState, useEffect } from 'react';
//import "./Search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);  

  useEffect(() => {
    try {
      fetch("https://raw.githubusercontent.com/roshanshibu/Coco/LibraryComponnet-Suma/src/data/data.json?token=GHSAT0AAAAAAB7UQPJRIAKLXZDB5W5DZCKSZALKJUQ")
        .then(response => response.json())
        .then(data => setSongs(data));
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {

   const filteredSongs = songs.filter(song =>
      song.songName.toLowerCase().includes(searchQuery.toLowerCase())    
    );

  setFilteredSongs(filteredSongs);
  console.log("Filtered Songs:", filteredSongs);
  }, [songs, searchQuery]);


  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    console.log("Search Text:", searchQuery);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search Songs" 
        value={searchQuery} 
        onChange={handleSearch} 
        //onFocus={() => setFilteredSongs([])} 
      />
      {filteredSongs.length > 0 && (
        <ul>
          {filteredSongs.map(song => (
            <li key={song.id}>
              <h2>{song.songName}</h2>
              <p>{song.artist}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;