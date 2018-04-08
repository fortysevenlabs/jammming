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
		this.savePlaylist = this.savePlaylist.bind(this);
		this.searchSpotify = this.searchSpotify.bind(this);
	}

	updatePlaylist(action, track) {
		if (action === "+") {
		  // initially I assigned array.push(track) to
		  // a new variable but that stored an integer
			// to the new variable breaking tracklist.map
			// does push function return number of items added
			// => it returns the current array length.
			const updatedPlaylist = this.state.playlist;
			updatedPlaylist.push(track);
			const updatedTracklist = this.state.tracklist.filter((item) => item != track);
			// console.log(track);
			// console.log(newPlaylist);
			this.setState({playlist: updatedPlaylist, tracklist: updatedTracklist});
		} else if (action === "-") {
			// this mutates the tracklist element of state, why?
			// let oldPlaylist = this.state.playlist;
			// let trackIndex = oldPlaylist.indexOf(track);
			// oldPlaylist.splice(trackIndex, 1);
			const updatedTracklist = this.state.tracklist;
			updatedTracklist.push(track);
			const updatedPlaylist = this.state.playlist.filter((item) => item !== track);
			this.setState({playlist: updatedPlaylist, tracklist: updatedTracklist});
		}

	}

	savePlaylist(playlist) {
		Spotify.save(playlist);
		this.setState({playlist: []});
	}

	searchSpotify(term) {
		Spotify.search(term).then(
			response => this.setState({tracklist: response})
		)
		// Methods that involve promises
		// must be chained with then:
		// If you don't use then, the setState
		// could trigger before you get searchResults.
		// Then your searchResults would be empty even
		// though the promise resolved afterwards with
		// the data so no error is shown.
		// let newtracklist = spotify.search(term);
		// this.setstate({tracklist: newtracklist});
		// console.log(newtracklist);
		// console.log(this.state);
	}

  render() {
    return (
      <div className="App">
				<Search searchSpotify={this.searchSpotify} />
	      <div className="App-playlist">
		      <Results tracklist={this.state.tracklist}
		               onClick={this.updatePlaylist} />
		      <Playlist playlist={this.state.playlist}
		                onMinusClick={this.updatePlaylist}
		                onSaveClick={this.savePlaylist} />
	      </div>
      </div>
    );
  }
}

export default App;
