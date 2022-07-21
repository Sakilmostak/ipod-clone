import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

function App() {
  return (
    <div id='container'>
      <div id='ipod'>
        <div id='pod-upper'>

        </div>
        <div id='pod-lower'>
        <div id='menu'>Menu</div>
          <div id='right-move'><FontAwesomeIcon icon={faBackward} /></div>
          <div id='left-move'><FontAwesomeIcon icon={faForward} /></div>
          <div id='play-pause'><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></div>
          <div id='touchpad'>
            <div id='center-btn'>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
