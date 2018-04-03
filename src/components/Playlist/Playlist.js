import React from 'react';
import './Playlist.css';

class Playlist extends React.Component {
	render() {
		return(
			<div className='Playlist'>
				<input value="New Playlist" />
				<a class="Playlist-save"> SAVE TO SPOTIFY </a>
			</div>
		)
	}
}

export default Playlist;