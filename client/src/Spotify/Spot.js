import React, { Component } from 'react';
import './Spot.css';
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class Spot extends Component{
  constructor(){
    super()
    const params = this.getHashParams()
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "Not Checked",
        image: "",
        artist:""
      }
    }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

    getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
    getNowPlaying(){
      spotifyWebApi.getMyCurrentPlaybackState()
      .then(response => {
        console.log("this is response: ",response)
        this.setState(response && response.currently_playing_type === "track" ? {
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url,
            artist: response.item.artists[0].name
          }
        }: response.currently_playing_type === "episode" ? 
          {nowPlaying: {
            name: " podcast episode",
          }}
        : {nowPlaying: {
          name: "Nothing playing",
          image: "",
          artist:""
        }})
      })
    }
  render() {
    return (
      <div className="spotify-container">
        <div className='Spot'><a href='http://localhost:8888'> Login to Spotify </a></div>
        <div className="size">  {this.state.nowPlaying.name.value === "undefined" ? null : `Now Playing: ${ this.state.nowPlaying.name }` } </div>
        <div className="size"> Artist: { this.state.nowPlaying.artist } </div>
        <div><img src={this.state.nowPlaying.image} style={{width: 100}}alt=""/></div>
        <button onClick={ () => this.getNowPlaying() }>now playing</button>
      </div>
    );
  }
}

export default Spot;
