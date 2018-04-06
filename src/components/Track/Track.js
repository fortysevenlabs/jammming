import React from 'react';
import './Track.css';

class Track extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	// when to use "e" argument
	// when to preventDefault();
	handleClick() {
		this.props.onClick(this.props.actionIcon, this.props.track);
	}

	render() {
		return (
			<div className="Track">
				<div className="Track-information">
					<h3> { this.props.track.name } </h3>
					<p> {this.props.track.artists[0].name} | {this.props.track.album.name} </p>
				</div>
				<a className="Track-action" onClick={this.handleClick} track={this.props.track}>
					{this.props.actionIcon}
				</a>
			</div>
		)
	}
}

export default Track;