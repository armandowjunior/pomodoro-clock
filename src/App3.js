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
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  let beep = document.getElementById("beep");

  useEffect(() => {
    let interval;

    if (timerOn) {
      interval = setInterval(() => {
        setDisplayTime((prev) => prev - 1);
      }, 1000);
    }

    if (displayTime < 0) {
      beep.pause();
      beep.currentTime = 0;
      beep.play();
      if (!onBreak) {
        setOnBreak(true);
        setDisplayTime(breakTime);
      } else {
        setOnBreak(false);
        setDisplayTime(sessionTime);
      }
    }

    return () => clearInterval(interval);
  }, [timerOn, displayTime, breakTime, sessionTime, onBreak]);

  useEffect(() => {
    if (onBreak) {
      setDisplayTime(breakTime);
    }
    if (!onBreak) {
      setDisplayTime(sessionTime);
    }
  }, [sessionTime, breakTime]);

  const formatTime = (time, type = "length") => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (type == "display") {
      return (
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)
      );
    } else {
      return minutes;
    }
  };

  const changeTime = (amount, type) => {
    if (timerOn) return;
    if (type == "break") {
      if (
        (breakTime <= 60 && amount < 0) ||
        (breakTime >= 60 * 60 && amount > 0)
      ) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (
        (sessionTime <= 60 && amount < 0) ||
        (sessionTime >= 60 * 60 && amount > 0)
      ) {
        return;
      }
      setSessionTime((prev) => prev + amount);
    }
  };

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimerOn(false);
    setOnBreak(false);
    beep.pause();
    beep.currentTime = 0;
  };

  return (
    <div className="App">
      <p id="title">Pomodoro Clock</p>
      <div className={`timer-wrapper ${timerOn ? "fade" : ""}`}>
        <p id="timer-label">{onBreak ? "Break" : "Session"}</p>
        <p id="time-left">{formatTime(displayTime, "display")}</p>
        <p>
          {onBreak ? (
            <FontAwesomeIcon id="icon-timer" icon="coffee" />
          ) : (
            <FontAwesomeIcon id="icon-timer" icon="laptop-code" />
          )}
        </p>
      </div>

      <div className="controls-wrapper">
        <button id="start_stop" onClick={() => setTimerOn(!timerOn)}>
          {timerOn ? (
            <FontAwesomeIcon icon="pause" />
          ) : (
            <FontAwesomeIcon icon="play" />
          )}
        </button>
        <FontAwesomeIcon id="reset" icon="sync-alt" onClick={resetTime} />
      </div>

      <div className="length-wrapper">
        <LengthComponent
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
          changeTime={changeTime}
        />
        <LengthComponent
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
          changeTime={changeTime}
        />
      </div>
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

function LengthComponent({ type, time, formatTime, changeTime }) {
  return (
    <div className={`${type}-wrapper`}>
      <p id={`${type}-label`}>{type} length</p>
      <button id={`${type}-decrement`} onClick={() => changeTime(-60, type)}>
        -
      </button>
      <p id={`${type}-length`}>{formatTime(time)}</p>
      <button id={`${type}-increment`} onClick={() => changeTime(+60, type)}>
        +
      </button>
    </div>
  );
}

export default App;
