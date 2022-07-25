import React, { Component } from 'react'
import { Media, Player, controls } from 'react-media-player'
import './MusicPlayer.scss';
const {
    CurrentTime,
    SeekBar,
    Duration,
} = controls

class MusicPlayer extends Component {
  render() {
    return (
      <Media>
        <div className="media">
          <div className="media-player">
            <Player src="demomusic.mp3" autoPlay='true'/>
          </div>
          <div id='music-album'>
            <img src='https://i.scdn.co/image/ab67706c0000da8417674fafe68969fad9e357d3' alt='album' />
          </div>
          <div className="media-controls">
                <CurrentTime />
                <SeekBar />
                <Duration />
          </div>
        </div>
      </Media>
    )
  }
}

export default MusicPlayer;