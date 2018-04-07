import qs from 'querystring';

let Spotify = {};

const clientId = '943849d59d434742bfad1a401fa9aab0';
let access_token;
// let expires_in;

// urls
// TODO cors not needed - why?
// const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'

Spotify.search = (term) => {
	// consts
	const spotifySearchUrl = `https://api.spotify.com/v1/search?query=${term}&type=track`;

	Spotify.authorize();

	return fetch(spotifySearchUrl, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	}).then(
		response => {
			return response.json()
		},
		networkError => console.log(networkError.message)
	).then(
		jsonResponse => {
			return jsonResponse.tracks.items;
		}
	);
};

// Spotify.getUserId = () => {
// 	const spotifyUserProfileUrl = 'https://api.spotify.com/v1/me';
// 	Spotify.authorize();
// 	return fetch(spotifyUserProfileUrl, {
// 		headers: {
// 			Authorization: `Bearer ${access_token}`,
// 			'Content-Type': 'application/json'
// 		}
// 	}).then(response =>
// 		response.json()
// 	).then(jsonResponse =>
// 		return jsonResponse.id
// 	)
// }

Spotify.createPlaylist = () => {
	Spotify.authorize();

	// TODO update username
	// DO I need to really fetch user profile: https://api.spotify.com/v1/me
	// response.id
	const user_id = 'tarunmadiraju';
	const spotifyCreatePlaylistUrl = `https://api.spotify.com/v1/users/${user_id}/playlists`;

	return fetch(spotifyCreatePlaylistUrl, {
		method: 'POST',
		body: JSON.stringify({'name': 'jammming', 'public': 'false'}),
		headers: {
			Authorization: `Bearer ${access_token}`,
			'Content-Type': 'application/json'
		}
	}).then(
		response => {
			return response.json()
		},
		networkError => console.log(networkError.message)
	).then(
		jsonResponse => {
			return jsonResponse;
		}
	);

}

Spotify.save = (playlist) => {
	Spotify.authorize();
	let tracks = playlist.map((track) => track.uri);

	Spotify.createPlaylist().then(response => {
			console.log(response);
			let spotifySavePlaylistUrl = response.tracks.href;

			return fetch(spotifySavePlaylistUrl, {
				method: 'POST',
				body: JSON.stringify({'uris': tracks}),
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'application/json'
				}
			}).then(
				response => {
					return response.json()
				},
				networkError => console.log(networkError.message)
			).then(
				jsonResponse => {
					console.log(jsonResponse);
				}
			);
		}
	)
}

Spotify.authorize = () => {
	// query string
	const params = {
		client_id: clientId,
		redirect_uri: 'http://localhost:3000',
		scope: 'playlist-modify-private playlist-modify-public',
		response_type: 'token',
		//state: Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15)
	}

	const spotifyAuthorizeUrl = 'https://accounts.spotify.com/authorize/?' + qs.stringify(params);

	// TODO deal with access_token expiry automatically
	if (access_token) {
		return access_token;
	} else if (!access_token &&
		         window.location.href.match(/access_token=([^&]*)/) &&
		         window.location.href.match(/expires_in=([^&]*)/) ) {
		access_token = window.location.href.match(/access_token=([^&]*)/)[1];
		// expires_in = window.location.href.match(/expires_in=([^&]*)/)[1];
	} else {
		window.location.href = spotifyAuthorizeUrl;
	}
}

export default Spotify;
