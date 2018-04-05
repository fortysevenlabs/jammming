import React from 'react';
import './TrackList.css';

// let track = {};
// let tracks = [track, track, track];

class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
				<div className="Track">
					<div className="Track-information">
						<h3> I Won't Let You Go </h3>
						<p> Switchfoot | I Won't Let You Go</p>
					</div>
					<a className="Track-action">+</a>
				</div>

				<div className="Track">
					<div className="Track-information">
						<h3> I Won't Let You Go </h3>
						<p> Switchfoot | I Won't Let You Go</p>
					</div>
					<a className="Track-action">+</a>
				</div>

				<div className="Track">
					<div className="Track-information">
						<h3> I Won't Let You Go </h3>
						<p> Switchfoot | I Won't Let You Go</p>
					</div>
					<a className="Track-action">+</a>
				</div>
			</div>
		)
	}
}

export default TrackList;