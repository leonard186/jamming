import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{name: '1XYZ', artist: 'z1xyy', album: 'To1day'},
                      {name: 'XYZ', artist: 'zxyy', album: 'Today'}],
      playlistName: 'My playlist',
      playlistTracks: [{name: '1XYZ', artist: 'z1xyy', album: 'To1day'},
                      {name: 'XYZ', artist: 'zxyy', album: 'Today'}]
                  };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    tracks.map(song => {
      if(song.id === track.id){
       let newPlaylist = tracks.concat(track);
       this.setState({playlistTracks: newPlaylist});
      }
    })
  }

  removeTrack(track) {
    let updatedPlaylist = this.state.playlistTracks.filter(song => song.id !== track.id);
    this.setState({playlistTracks: updatedPlaylist})
  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
