import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './App.scss';
import zingtouch from 'zingtouch';

import React, { Component } from 'react'

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curAngle: 0
    }

    this.menuItems = ['settings', 'music', 'games', 'web'];
  }

  componentDidMount(){
    let target = document.getElementById('touchpad');
    let region = new zingtouch.Region(target);
    let output = document.getElementById('display');
    let list=10000;
    let angle=0;

    region.bind(target, 'rotate', function(e){
      angle+=e.detail.distanceFromLast;
      if(angle>=15){
        list++;
        angle=0;
      }
      if(angle<=-15){
        list--;
        angle=0;
      }

      output.innerHTML= `Angle = ${angle} Listitem = ${list%5}`;
    });

  }

  render() {
    let Menu = this.menuItems.map((item,index)=> {
      return <li key={index}>{item}</li>
    });
    return (
      <div id='container'>
        <div id='ipod'>
          <div id='pod-upper'>
            <ul>
              {Menu}
            </ul>
          </div>
          <div id='pod-lower'>
          <div id='menu'>Menu</div>
            <div id='left-move'><FontAwesomeIcon icon={faBackward} /></div>
            <div id='right-move'><FontAwesomeIcon icon={faForward} /></div>
            <div id='play-pause'><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></div>
            <div id='touchpad'>
              <div id='center-btn'>
              </div>
            </div>
          </div>
        </div>
        <div id='display'>0</div>
      </div>
    );
  }
}

export default App;
