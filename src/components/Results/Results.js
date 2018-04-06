import React from 'react';
import './Results.css';
import TrackList from "../TrackList/TrackList";

class Results extends React.Component {
	render() {
		return(
			<div className='Results'>
				<h2> Results </h2>
				<TrackList tracklist={this.props.tracklist} actionIcon="+" onClick={this.props.onClick} />
			</div>
		)
	}
}

export default Results;