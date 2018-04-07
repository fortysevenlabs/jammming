import React from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.handleSaveClick = this.handleSaveClick.bind(this);
	}

	handleSaveClick(e) {
		this.props.onSaveClick(this.props.playlist);
	}

	render() {
		return(
			<div className='Playlist'>
				<input defaultValue="New Playlist" />
				<TrackList tracklist={this.props.playlist}
				           actionIcon="-"
				           onClick={this.props.onMinusClick}/>
				<a className="Playlist-save"onClick={this.handleSaveClick}> SAVE TO SPOTIFY </a>
			</div>
		)
	}
}

export default Playlist;