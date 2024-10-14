
import React, {useState, useCallback} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import Playlist from './Playlist';
import Spotify from './api/Spotify'
import SearchResults from './SearchResults';

function App() {
  const [result, setResult] = useState([]);
  const [addSong, setAddSong] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const updatePlaylistName = useCallback((name) =>{
    setPlaylistName(name)
  }, []);

  const savePlaylist = useCallback(() =>{
    const trackUris = addSong.map((song) => song.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(()=>{
      setPlaylistName('');
      setAddSong([]);
    }
    )
  }, [addSong, playlistName])

  const search = useCallback((term) => {
    Spotify.search(term).then(setResult);
  }, []);

  //const testArry = [{name: 'body like a back road'}, {name: 'Mine'}, {name: 'silver lining'}];
  return (
    <div className="App">
      <h1 className = 'title'>Playlist Generator</h1>
      <SearchBar onSearch = {search}/>
      <div className  = "results">
      <SearchResults result = {result} setAddSong = {setAddSong} />
      <Playlist addSong = {addSong} setAddSong = {setAddSong} onNameChange = {updatePlaylistName} onSave = {savePlaylist}/>
      </div>
    </div>
  );
}
export default App;
