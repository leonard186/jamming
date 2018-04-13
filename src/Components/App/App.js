import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/spotify'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My playlist',
      playlistTracks: []
                  };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
     let tracks = this.state.playlistTracks.concat(track);
     this.setState({ playlistTracks: tracks });
   }

  removeTrack(track) {
    const updatedPlaylist = this.state.playlistTracks.filter(song => song.id !== track.id);
    this.setState({playlistTracks: updatedPlaylist})
}

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  savePlaylist(){
    const trackUri = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackUri).then(() => {
    this.setState({
      playlistName: 'My playlist',
      playlistTracks: [],
    });
  });
  }

  search(term) {
    return Spotify.search(term).then(searchResults => {this.setState({searchResults: searchResults})});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
