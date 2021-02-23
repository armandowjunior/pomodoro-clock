import "./App.css";
import { useState, useEffect, useRef } from "react";
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
  const audioElement = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [onBreak, setOnBreak] = useState(false);

  useEffect(() => {
    if (!onBreak) {
      setDisplayTime(sessionTime);
    } else if (onBreak) {
      setDisplayTime(breakTime);
    }
  }, [sessionTime, breakTime]);

  useEffect(() => {
    if (displayTime === 0) {
      audioElement.current.currentTime = 0;
      audioElement.current.play();
      if (!onBreak) {
        setOnBreak(true);
        setDisplayTime(breakTime);
      } else if (onBreak) {
        setOnBreak(false);
        setDisplayTime(sessionTime);
      }
    }
  }, [displayTime, onBreak]);

  const timerControl = () => {
    if (intervalId === null) {
      const interval = setInterval(() => {
        setDisplayTime((previousdisplayTime) => previousdisplayTime - 1);
      }, 1000);
      setIntervalId(interval);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const resetTime = () => {
    audioElement.current.pause();
    audioElement.current.currentTime = 0;
    clearInterval(intervalId);
    setIntervalId(null);
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setOnBreak(false);
  };

  const incSessionTime = () => {
    if (intervalId !== null) return;
    setSessionTime(sessionTime >= 60 * 60 ? sessionTime : sessionTime + 60);
  };

  const decSessionTime = () => {
    if (intervalId !== null) return;
    setSessionTime(sessionTime <= 60 ? sessionTime : sessionTime - 60);
  };

  const convertToMinutesDisplay = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const convertToMinutesLength = (time) => {
    return time / 60;
  };

  const incBreakTime = () => {
    if (intervalId !== null) return;
    setBreakTime(breakTime >= 60 * 60 ? breakTime : breakTime + 60);
  };

  const decBreakTime = () => {
    if (intervalId !== null) return;
    setBreakTime(breakTime <= 60 ? breakTime : breakTime - 60);
  };

  return (
    <div id="App">
      <h1 id="title">Pomodoro Clock</h1>
      <div className={`timer-wrapper ${intervalId !== null ? "fade" : ""}`}>
        <h1 id="timer-label">{onBreak ? "Break" : "Session"}</h1>
        <h2 id="time-left">{convertToMinutesDisplay(displayTime)}</h2>
        <p>
          {onBreak ? (
            <FontAwesomeIcon id="icon-timer" icon="coffee" />
          ) : (
            <FontAwesomeIcon id="icon-timer" icon="laptop-code" />
          )}
        </p>
      </div>

      <div className="controls-wrapper">
        <button id="start_stop" onClick={timerControl}>
          {intervalId !== null ? (
            <FontAwesomeIcon icon="pause" />
          ) : (
            <FontAwesomeIcon icon="play" />
          )}
        </button>
        <button id="reset" onClick={resetTime}>
          {<FontAwesomeIcon id="reset" icon="sync-alt" />}
        </button>
      </div>

      <div className="length-wrapper">
        <div className="session-wrapper">
          <h2 id="session-label">Session Length</h2>
          <button id="session-decrement" onClick={decSessionTime}>
            -
          </button>
          <p id="session-length">{convertToMinutesLength(sessionTime)}</p>
          <button id="session-increment" onClick={incSessionTime}>
            +
          </button>
        </div>

        <div className="break-wrapper">
          <h2 id="break-label">Break Length</h2>
          <button id="break-decrement" onClick={decBreakTime}>
            -
          </button>
          <p id="break-length">{convertToMinutesLength(breakTime)}</p>
          <button id="break-increment" onClick={incBreakTime}>
            +
          </button>
        </div>
      </div>
      <audio
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        id="beep"
        ref={audioElement}
      ></audio>
    </div>
  );
}

export default App;
