import React, { Component } from 'react';
import './App.css';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist'
import Results from '../Results/Results';
import Spotify from '../../util/Spotify';

class App extends Component {
	constructor() {
		super();
		// set initial state
		this.state = {
			resultlist: [],
			playlist: []
		};
		// bind
		this.TrackLists = this.updateTrackLists.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.searchSpotify = this.searchSpotify.bind(this);
	}

	updateTrackLists(action, track) {
		if (action === "+") {
			// add to playlist
			const updatedPlaylist = this.state.playlist;
			updatedPlaylist.push(track);
			// remove from result list
			const updatedResultlist = this.state.resultlist.filter((item) => item !== track);
			this.setState({playlist: updatedPlaylist, resultlist: updatedResultlist});
		} else if (action === "-") {
			// move track back to result list
			const updatedResultlist = this.state.resultlist;
			updatedResultlist.push(track);
			// remove from playlist
			const updatedPlaylist = this.state.playlist.filter((item) => item !== track);
			this.setState({playlist: updatedPlaylist, resultlist: updatedResultlist});
		}

	}

	savePlaylist(playlist) {
		Spotify.save(playlist);
		this.setState({playlist: []});
	}

	searchSpotify(term) {
		Spotify.search(term).then(
			response => this.setState({resultlist: response})
		)
		// Note: methods that involve promises must be chained with then.
		// If you don't use then, the setState could trigger before you get searchResults.
		// Then your searchResults would be empty even though the promise resolved afterwards
		// with the data so no error is shown. So, don't do this:
		// let newresultlist = spotify.search(term);
		// this.setstate({resultlist: newresultlist});
		// console.log(newresultlist);
		// console.log(this.state);
	}

  render() {
    return (
      <div className="App">
				<Search searchSpotify={this.searchSpotify} />
	      <div className="App-playlist">
		      <Results resultlist={this.state.resultlist}
		               onPlusClick={this.updateTrackLists} />
		      <Playlist playlist={this.state.playlist}
		                onMinusClick={this.updateTrackLists}
		                onSaveClick={this.savePlaylist} />
	      </div>
      </div>
    );
  }
}

export default App;
