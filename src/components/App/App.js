import React, { Component } from 'react';
import './App.css';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist'
import Results from '../Results/Results';


let track = {
		"album" : {
			"album_type" : "single",
			"artists" : [ {
				"external_urls" : {
					"spotify" : "https://open.spotify.com/artist/6S58b0fr8TkWrEHOH4tRVu"
				},
				"href" : "https://api.spotify.com/v1/artists/6S58b0fr8TkWrEHOH4tRVu",
				"id" : "6S58b0fr8TkWrEHOH4tRVu",
				"name" : "Switchfoot",
				"type" : "artist",
				"uri" : "spotify:artist:6S58b0fr8TkWrEHOH4tRVu"
			} ],
			"available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA" ],
			"external_urls" : {
				"spotify" : "https://open.spotify.com/album/12rFlBci2pRsl4Ak3c9w6R"
			},
			"id" : "12rFlBci2pRsl4Ak3c9w6R",
			"name" : "I Won't Let You Go",
			"release_date" : "2017-11-03",
			"release_date_precision" : "day",
			"type" : "album",
			"uri" : "spotify:album:12rFlBci2pRsl4Ak3c9w6R"
		},
		"artists" : [ {
			"external_urls" : {
				"spotify" : "https://open.spotify.com/artist/6S58b0fr8TkWrEHOH4tRVu"
			},
			"href" : "https://api.spotify.com/v1/artists/6S58b0fr8TkWrEHOH4tRVu",
			"id" : "6S58b0fr8TkWrEHOH4tRVu",
			"name" : "Switchfoot",
			"type" : "artist",
			"uri" : "spotify:artist:6S58b0fr8TkWrEHOH4tRVu"
		}, {
			"external_urls" : {
				"spotify" : "https://open.spotify.com/artist/40LHVA5BTQp9RxHOQ9JPYj"
			},
			"href" : "https://api.spotify.com/v1/artists/40LHVA5BTQp9RxHOQ9JPYj",
			"id" : "40LHVA5BTQp9RxHOQ9JPYj",
			"name" : "Lauren Daigle",
			"type" : "artist",
			"uri" : "spotify:artist:40LHVA5BTQp9RxHOQ9JPYj"
		} ],
		"available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA" ],
		"disc_number" : 1,
		"duration_ms" : 247422,
		"explicit" : false,
		"external_ids" : {
			"isrc" : "USC4R1701583"
		},
		"external_urls" : {
			"spotify" : "https://open.spotify.com/track/79pfMqEMRo8jzPGX7fyw0K"
		},
		"href" : "https://api.spotify.com/v1/tracks/79pfMqEMRo8jzPGX7fyw0K",
		"id" : "79pfMqEMRo8jzPGX7fyw0K",
		"name" : "I Won't Let You Go",
		"popularity" : 61,
		"preview_url" : null,
		"track_number" : 1,
		"type" : "track",
		"uri" : "spotify:track:79pfMqEMRo8jzPGX7fyw0K"
}


let tracks = [track, track, track];
let playlistTracks = [track];

class App extends Component {
	// no props needed since its app
	constructor() {
		super();
		this.state = {
			tracklist: [],
			playlist: []
		};
		this.updatePlaylist = this.updatePlaylist.bind(this);
	}

	updatePlaylist(action, track) {
		// console.log('old: ');
		// console.log(this.state);
		if (action === "+") {
			const oldPlaylist = this.state.playlist;
			const updatedPlaylist = oldPlaylist.push(track);
			this.setState({playlist: updatedPlaylist});
		} else if (action === "-") {
			const oldPlaylist = this.state.playlist;
			const trackIndex = oldPlaylist.indexOf(track);
			const updatedPlaylist = oldPlaylist.splice(trackIndex, 1);
			this.setState({playlist: updatedPlaylist});
		}
		// console.log('new: ');
		// console.log(this.state);
	}


  render() {
    return (
      <div className="App">
				<Search />
	      <div className="App-playlist">
		      <Results tracklist={this.state.tracklist} onClick={this.updatePlaylist} />
		      <Playlist playlist={this.state.playlist} onClick={this.updatePlaylist} />
	      </div>
      </div>
    );
  }
}

export default App;
