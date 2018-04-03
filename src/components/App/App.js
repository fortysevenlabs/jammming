import React, { Component } from 'react';
import './App.css';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist'
import Results from '../Results/Results';

class App extends Component {
  render() {
    return (

      <div className="App">
				<Search />
	      <div className="App-playlist">
		      <Results />
		      <Playlist />
	      </div>
      </div>
    );
  }
}

export default App;
