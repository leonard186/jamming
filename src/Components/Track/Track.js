import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        toggle: false
      };
      this.addTrack = this.addTrack.bind(this);
      this.renderAction = this.renderAction.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.renderPreview = this.renderPreview.bind(this);
      this.togglePlay = this.togglePlay.bind(this);
      this.renderPopularity = this.renderPopularity.bind(this);
  }

  renderAction(){
  return  this.props.isRemoval ? <a className="Track-action" onClick={this.removeTrack}> - </a> : <a className="Track-action" onClick={this.addTrack}> + </a>;
  }

  addTrack(){
    this.props.onAdd(this.props.track)
  }

  removeTrack(){
    this.props.onRemove(this.props.track)
  }

  renderPreview(){
  return this.props.track.preview ? <a className='preview' onClick={this.togglePlay}>play<br/>pause</a> : <a className='preview no'>No<br/>preview<br/>available</a>;
  }

  togglePlay(){
      const audioToggle = this.refs.audio_tag;
      if(!this.state.toggle){
        audioToggle.play();
        console.log('playing');
        this.setState({toggle: true})
      } else{
        audioToggle.pause();
        console.log('paused');
        this.setState({toggle: false})
      }
    }

    renderPopularity(){
      console.log('Popularity index for ' + this.props.track.artist + ' | ' + this.props.track.name + ' is | ' + this.props.track.popularity + ' |');
      if(this.props.track.popularity >= 80){
       return <p className='popularity very-popular'>Very<br/>Popular</p>
     }else if(this.props.track.popularity >= 50 && this.props.track.popularity <= 79){
        return <p className='popularity popular'>Popular</p>
      } else if (this.props.track.popularity >= 20 && this.props.track.popularity <= 49){
        return <p className='popularity less-popular'>Less<br/>Popular</p>;
      } else{
        return <p className='popularity very-unpopular'>Very<br/>Unpopular</p>
      }
    }

  render() {

    return (
      <div className="Track" >
        {this.renderPopularity()}
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
          <audio ref='audio_tag' src={this.props.track.preview}>
            Your browser does not support the <code>audio</code> element.
          </audio>
        </div>
        {this.renderPreview()}
        {this.renderAction()}
      </div>
    )
  }
};

export default Track;
