import "./App.css";
import { useState, useEffect } from "react";
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
  const [session, setSession] = useState(10);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSession((session) => session - 1);
      }, 1000);
    }

    if (session <= 0) {
      clearInterval(interval);
      setIsActive(false);
      console.log("Beep!");
    }

    return () => clearInterval(interval);
  }, [isActive, session]);

  return (
    <div className="App">
      <p id="title" class="animate">
        Pomodoro Clock
      </p>
      <div className={`timer-wrapper ${isActive ? "fade" : ""}`}>
        <p id="timer-label">Session</p>
        <p id="time-left">{session}</p>
        <p>
          <span>
            <FontAwesomeIcon id="icon-timer" icon="laptop-code" />
            {/* <FontAwesomeIcon icon="coffee" /> */}
          </span>
        </p>
      </div>

      <div className="controls-wrapper">
        <button id="start_stop" onClick={() => setIsActive(!isActive)}>
          {isActive ? (
            <FontAwesomeIcon icon="pause" />
          ) : (
            <FontAwesomeIcon icon="play" />
          )}
        </button>
        <FontAwesomeIcon
          id="reset"
          icon="sync-alt"
          onClick={() => {
            setIsActive(false);
            setSession(30);
          }}
        />
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
