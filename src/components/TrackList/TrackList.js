import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
				{this.props.tracklist.map((track, index) => { return <Track key={index} track={track} actionIcon={this.props.actionIcon} onClick={this.props.onClick} /> })}
			</div>
		)
	}
}

export default TrackList;