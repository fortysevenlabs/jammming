import qs from 'querystring';

let Spotify = {};
let access_token;

const clientId = '943849d59d434742bfad1a401fa9aab0';
// TODO - Spotify didn't need CORS headers. Review.
// const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'

Spotify.search = (term) => {
	access_token = Spotify.authorizeAndGetToken();
	const spotifySearchUrl = `https://api.spotify.com/v1/search?query=${term}&type=track`;

	return fetch(spotifySearchUrl, {
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
			return jsonResponse.tracks.items;
		}
	);
};

Spotify.getUserId = () => {
	access_token = Spotify.authorizeAndGetToken();
	const spotifyUserProfileUrl = 'https://api.spotify.com/v1/me';

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
	// return promise to allow chaining in Spotify.save()
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

// Save added tracks to a new playlist
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

Spotify.authorizeAndGetToken = () => {
	// params for query string
	const params = {
		client_id: clientId,
		redirect_uri: 'http://localhost:3000',
		scope: 'playlist-modify-private playlist-modify-public user-read-private',
		response_type: 'token',
		state: Math.random().toString(36).substring(2, 15),
	}
	const spotifyAuthorizeUrl = 'https://accounts.spotify.com/authorize/?' + qs.stringify(params);

	if (access_token) {
		return access_token;
	} else if (!access_token &&
		         window.location.href.match(/access_token=([^&]*)/) &&
		         window.location.href.match(/expires_in=([^&]*)/) ) {
		access_token = window.location.href.match(/access_token=([^&]*)/)[1];
		let expires_in = Number(window.location.href.match(/expires_in=([^&]*)/)[1]);
		window.location.hash = '';
		return access_token;
	} else {
		window.location.href = spotifyAuthorizeUrl;
	}
}

export default Spotify;
