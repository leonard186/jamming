const clientId ='ea9e5326c33b44fe9030cc0ff11e822a';
const authorizeUri = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';
const requestUrl = `${authorizeUri}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=playlist-modify-public`;
let userAccessToken;

const Spotify = {
  getAccessToken(){
    if(userAccessToken){
      return userAccessToken;
    }

    const getAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const getExpiry = window.location.href.match(/expires_in=([^&]*)/);
    if(getAccessToken &&  getExpiry){
        userAccessToken = getAccessToken[1];
        let expiryTime = Number(getExpiry[1]);
        window.setTimeout(() => userAccessToken = '', expiryTime * 1000);
        window.history.pushState('Access Token', null, '/');
        return userAccessToken;
      } else {
        window.location.href = requestUrl;
       }
    },

    search(term) {
      const accessToken = this.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
          if(response.ok){
            return response.json();
          } else{console.log('Request failed')}
        }).then(jsonResponse => {
          if(jsonResponse.tracks){
            return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
              preview: track.preview_url,
              popularity: track.popularity
            }))
          } else {return []}
        })
      },

      savePlaylist(playlistName, trackUri){
        if(!playlistName && !trackUri){
          return
        }
        let accessToken = this.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};
        let userID;
        return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
          if(response.ok){
            console.log(response);
            return response.json();
          } else{ console.log('Request failed')}
        }).then(jsonResponse => {
          userID = jsonResponse.id
          console.log(userID);
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          }).then(response => {
            if(response.ok){
              console.log(response);
              return response.json();
            } else{console.log('Request failed')}
          }).then(jsonResponse => {
            console.log(jsonResponse);
            const playlistID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackUri})
            });
          });
        });
      }
}

export default Spotify;
