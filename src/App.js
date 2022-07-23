import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './App.scss';
import zingtouch from 'zingtouch';

import React, { Component } from 'react';

export class App extends Component {
  constructor(props) {
    super(props);

    this.menuItems = ['Music', 'Games', 'Web','Apps','Settings'];
    
    this.music = ['Trending','Playlist','Albums','Artist','Genre'];
    this.games = ['Bounce Ball','Pac-man','Galactic Heros','Asphalt','More..'];
    this.web = ['Search','Incognito Mode','Bookmarks','History','Settings'];
    this.apps = ['Calculator','Radio','Clock','Recorder','Services and Feedbacks'];
    this.settings = ['Display','Sound','Date and Time','Language and Inputs','Device-information'];
    this.checkRefresh=false;

    this.state = {
      listIdx: 0,
      curpage: 'menu',
      curlist: this.menuItems,
    }
  }

  componentDidMount(){
    let target = document.getElementById('touchpad');
    let region = new zingtouch.Region(target);
    let output = document.getElementById('display');
    let list=10000; 
    let angle=0;
    let This = this;

    region.bind(target, 'rotate', function(e){
      if(This.checkRefresh){
        list=10000;
        This.checkRefresh=false;
      }
      angle+=e.detail.distanceFromLast;
      if(angle>=15){
        list++;
        angle=0;
        This.changeIdx(list%5);
      }
      if(angle<=-15){
        list--;
        angle=0;
        This.changeIdx(list%5);
      }

      output.innerHTML= `Angle = ${angle} Listitem = ${list%5}`;
    });

  }

  changeIdx = (list) =>{
    this.setState({
      listIdx: list
    })
  }

  centerClick = ()=>{
    if(this.state.curpage==='menu'){
      this.checkRefresh=true;
      switch(this.state.listIdx){
        case 0:
          this.setState({
            curpage: 'music',
            curlist: this.music,
            listIdx: 0
          })
          break;
        case 1:
          this.setState({
            curpage: 'games',
            curlist: this.games,
            listIdx: 0
          })
          break;
        case 2:
          this.setState({
            curpage: 'web',
            curlist: this.web,
            listIdx: 0
          })
          break;
        case 3:
          this.setState({
            curpage: 'apps',
            curlist: this.apps,
            listIdx: 0
          })
          break;
        case 4:
          this.setState({
            curpage: 'settings',
            curlist: this.settings,
            listIdx: 0
          })
          break;
        default:
          return;
      }
    }
  }

  render() {
    let This=this;
    let Menu = this.state.curlist.map((item,index)=> {
      if(This.state.listIdx===index) return <li id='curpoint' key={index}>{item}</li>;
      return <li  key={index}>{item}</li>
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
              <div id='center-btn' onClick={this.centerClick}>
              </div>
            </div>
          </div>
        </div>
        <div id='display'>0</div>
        <div>{this.state.listIdx}</div>
      </div>
    );
  }
}

export default App;
