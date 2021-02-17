import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faSyncAlt,
  faPause,
  faLaptopCode,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faPlay, faSyncAlt, faPause, faLaptopCode, faCoffee);

function App() {
  return (
    <div className="App">
      <p id="title">Pomodoro Clock</p>
      <div className="timer-wrapper">
        <p id="timer-label">Session</p>
        <p id="time-left">25:00</p>
        <p>
          <span>
            <FontAwesomeIcon id="icon-timer" icon="laptop-code" />
            {/* <FontAwesomeIcon icon="coffee" /> */}
          </span>
        </p>
      </div>

      <div className="controls-wrapper">
        <FontAwesomeIcon
          onClick={() => console.log("testing")}
          id="start_stop"
          icon="play"
        />
        {/* <FontAwesomeIcon icon="pause" /> */}
        <FontAwesomeIcon id="reset" icon="sync-alt" />
      </div>

      <div className="length-wrapper">
        <div className="session-wrapper">
          <p id="session-label">Session Length</p>
          <button id="session-decrement">-</button>
          <p id="session-length">25</p>
          <button id="session-increment">+</button>
        </div>

        <div className="break-wrapper">
          <p id="break-label">Break Length</p>
          <button id="break-decrement">-</button>
          <p id="break-length">5</p>
          <button id="break-increment">+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
