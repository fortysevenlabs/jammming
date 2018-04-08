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
	Spotify.authorize();
	const spotifySearchUrl = `https://api.spotify.com/v1/search?query=${term}&type=track`;

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

Spotify.getUserId = () => {
	const spotifyUserProfileUrl = 'https://api.spotify.com/v1/me';
	Spotify.authorize();
	return fetch(spotifyUserProfileUrl, {
		headers: {
			Authorization: `Bearer ${access_token}`,
			'Content-Type': 'application/json'
		}
	}).then(response =>
		response.json()
	).then(jsonResponse =>
		jsonResponse
	)
}

Spotify.createPlaylist = () => {
  // TODO use authorize better
	// should authorize also be chained
	// remember that authorize sets global var access_token
	// and not return access_token, could that also i think
	// getUserId calls authorize
	// Spotify.authorize();

	// TODO check better alternatives
	// if we don't return this,
	// it won't be a promise
	return Spotify.getUserId().then(response => {
		const spotifyCreatePlaylistUrl = `https://api.spotify.com/v1/users/${response.id}/playlists`;

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
		)
	})
}

Spotify.save = (playlist) => {
	let tracks = playlist.map((track) => track.uri);

	Spotify.createPlaylist().then(response => {
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
					// return value isn't used
					// can we remove this then method
					return jsonResponse;
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
		scope: 'playlist-modify-private playlist-modify-public user-read-private',
		response_type: 'token',
		state: Math.random().toString(36).substring(2, 15),
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
