import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      term: ''
    };
    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.safeguard = this.safeguard.bind(this);
  }
  search(){
  this.props.onSearch(this.state.term)
  }

 handleSearch(event){
   this.setState({term: event.target.value})
 }

handleKeyPress(e){
  if(e.key === 'Enter'){
    return this.safeguard();
  }
}

safeguard(){
  if(this.state.term !== ''){
    return this.search();
  } else{
    alert('You must enter a song, album or artist');
  }
}

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleSearch} onKeyPress={this.handleKeyPress}/>
        <a onClick={this.safeguard}>SEARCH</a>
      </div>
    )
  }
};

export default SearchBar;
