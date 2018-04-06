import React, { Component } from 'react';
import './App.css';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist'
import Results from '../Results/Results';
import Spotify from '../../util/Spotify';

class App extends Component {
	// no props needed since its app
	constructor() {
		super();
		this.state = {
			tracklist: [],
			playlist: []
		};
		this.updatePlaylist = this.updatePlaylist.bind(this);
		this.searchSpotify = this.searchSpotify.bind(this);
	}

	updatePlaylist(action, track) {
		if (action === "+") {
		  // initially I assigned array.push(track) to
		  // a new variable but that stored an integer
			// to the new variable breaking tracklist.map
			// does push function return number of items added
			// => it returns the current array length.
			const newPlaylist = this.state.playlist;
			newPlaylist.push(track);
			console.log(track);
			console.log(newPlaylist);
			this.setState({playlist: newPlaylist});
		} else if (action === "-") {
			// this mutates the tracklist element of state, why?
			// let oldPlaylist = this.state.playlist;
			// let trackIndex = oldPlaylist.indexOf(track);
			// oldPlaylist.splice(trackIndex, 1);
			let updatedPlaylist = this.state.playlist.filter((item) => item !== track);
			this.setState({playlist: updatedPlaylist});
		}

	}

	searchSpotify(term) {
		// Spotify.search(term).then(
		// 	response => this.setState({tracklist: response})
		// )
		let newTracklist = Spotify.search(term);
		// console.log(newTracklist);
		this.setState({tracklist: newTracklist});
	}

  render() {
    return (
      <div className="App">
				<Search searchSpotify={this.searchSpotify} />
	      <div className="App-playlist">
		      <Results tracklist={this.state.tracklist} onClick={this.updatePlaylist} />
		      <Playlist playlist={this.state.playlist} onClick={this.updatePlaylist} />
	      </div>
      </div>
    );
  }
}

export default App;
