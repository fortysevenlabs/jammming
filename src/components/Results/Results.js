import React from 'react';
import './Results.css';
import TrackList from "../TrackList/TrackList";

class Results extends React.Component {
	render() {
		return(
			<div className='Results'>
				<h2> Results </h2>
				<TrackList />
			</div>
		)
	}
}

export default Results;