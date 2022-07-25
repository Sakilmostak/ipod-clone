import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './App.scss';
import zingtouch from 'zingtouch';
import MusicPlayer from './MusicPlayer'



export class App extends Component {
  constructor(props) {
    super(props);

    //array which will be rendered as list in the display of the pod
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
      checkPlayer: false
    }
  }

  async componentDidMount(){
    let target = document.getElementById('touchpad'); //fetching the wheel
    let region = await new zingtouch.Region(target); // setting target element to add feature to it
    //let output = document.getElementById('display'); //fetching the display
    let list=10000; //counter to check the index of the display
    let angle=0; //counter to check the angle of the wheel
    let This = this;

    region.bind(target, 'rotate', function(e){ // adding rotate feature using zingtouch
      // if the menu list is updated
      if(This.checkRefresh){
        list=10000;
        This.checkRefresh=false;
      }

      //updating the angle
      angle+=e.detail.distanceFromLast;

      //updating list index
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

      //output.innerHTML= `Angle = ${angle} Listitem = ${list%5}`;
    });

  }
  
  //updating list index globally
  changeIdx = (list) =>{
    this.setState({
      listIdx: list
    })
  }

  //to add feature to the centre button
  centerClick = ()=>{
    if(this.state.curpage==='menu'){

      //setting up check if the list is updated
      this.checkRefresh=true;

      //which list to enter depending on the current index of the list
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
    else if(this.state.curpage==='music'){
      if(this.state.listIdx===0 || this.state.listIdx===1){
        this.setState({
          curpage:'player',
          checkPlayer: true
        })
      }
    }
  }

  menuClick = () =>{
    if(this.state.curpage!=='menu'){
      this.checkRefresh=true;

      if(this.state.curpage==='player'){
        this.setState({
          curpage: 'music',
          checkPlayer: false
        });

        return;

      }

      this.setState({
        curpage: 'menu',
        curlist: this.menuItems,
        listIdx: 0
      });
    }
  }

  render() {
    let This=this;

    //creating jsx for each element of the list
    let Menu = this.state.curlist.map((item,index)=> {
      if(This.state.listIdx===index) return <li id='curpoint' key={index}>{item}</li>;
      return <li  key={index}>{item}</li>
    });
    return (
      <div id='container'>
        <div id='ipod'>
          <div id='pod-upper'>
            <div id='display'>
              {this.state.checkPlayer? <MusicPlayer></MusicPlayer> : <ul>{Menu}</ul>}
            </div>  
          </div>
          <div id='pod-lower'>
          <div id='menu' onClick={this.menuClick}>Menu</div>
            <div id='left-move'><FontAwesomeIcon icon={faBackward} /></div>
            <div id='right-move'><FontAwesomeIcon icon={faForward} /></div>
            <div id='play-pause'><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></div>
            <div id='touchpad'>
              <div id='center-btn' onClick={this.centerClick}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
