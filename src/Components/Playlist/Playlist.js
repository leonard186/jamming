import React from 'react';
import Playlist from './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"}/>
        <!-- <Tracklist />  -->
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
};

export default Playlist;