/* useEffect(() => {
    let interval;

    if (timerOn) {
      interval = setInterval(() => {
        setDisplayTime((prev) => {
          return prev - 1;
        });
      }, 1000);
    }

    if (displayTime < 0) {
      let beep = document.getElementById("beep");
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
  }, [timerOn, displayTime]); */

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
  const [isSession, setIsSession] = useState(true);
  const [sessionDisplay, setSessionDisplay] = useState(25);
  const [session, setSession] = useState(1500);
  const [breakDisplay, setBreakDisplay] = useState(5);
  const [breakTime, setBreakTime] = useState(300);
  const [minutes, setMinutes] = useState(secondsToMinutes(session));
  const [breakMinutes, setBreakMinutes] = useState(secondsToMinutes(breakTime));
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (isSession) {
          setSession((session) => session - 1);
          setMinutes(secondsToMinutes(session - 1));
        } else {
          setBreakTime((breakTime) => breakTime - 1);
          setBreakMinutes(secondsToMinutes(breakTime - 1));
        }
      }, 1000);
    }

    if (session <= 0 && isSession) {
      setIsSession(false);
      let sound = document.getElementById("beep");
      sound.currentTime = 0;
      sound.play();
      setBreakTime(breakDisplay * 60);
    }

    if (breakTime <= 0 && !isSession) {
      setIsSession(true);
      let sound = document.getElementById("beep");
      sound.currentTime = 0;
      sound.play();
      setSession(sessionDisplay * 60);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isSession, session, breakTime, minutes, breakMinutes]);

  function secondsToMinutes(counter) {
    const secondCounter = counter % 60;
    const minuteCounter = Math.floor(counter / 60);

    const computedSecond =
      String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
    const computedMinute =
      String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

    return computedMinute + ":" + computedSecond;
  }

  const decSession = () => {
    if (isActive) return;
    setSessionDisplay(
      sessionDisplay <= 1 ? sessionDisplay : sessionDisplay - 1
    );

    // Try to correct this, because the hook is working asynchronously;
    let seconds = sessionDisplay - 1;
    setSession(seconds > 0 ? seconds * 60 : (seconds + 1) * 60);
    setMinutes(
      session > 60 ? secondsToMinutes(session - 60) : secondsToMinutes(session)
    );
  };

  const incSession = () => {
    if (isActive) return;
    setSessionDisplay(
      sessionDisplay >= 60 ? sessionDisplay : sessionDisplay + 1
    );
    let seconds = sessionDisplay + 1;
    setSession(seconds < 60 ? seconds * 60 : (seconds - 1) * 60);
    setMinutes(
      session < 3600
        ? secondsToMinutes(session + 60)
        : secondsToMinutes(session)
    );
  };

  const decBreak = () => {
    if (isActive) return;
    setBreakDisplay(breakDisplay <= 1 ? breakDisplay : breakDisplay - 1);

    // Try to correct this, because the hook is working asynchronously;
    let seconds = breakDisplay - 1;
    setBreakTime(seconds > 0 ? seconds * 60 : (seconds + 1) * 60);
    setBreakMinutes(
      breakTime > 60
        ? secondsToMinutes(breakTime - 60)
        : secondsToMinutes(breakTime)
    );
  };

  const incBreak = () => {
    if (isActive) return;
    setBreakDisplay(breakDisplay >= 60 ? breakDisplay : breakDisplay + 1);
    let seconds = breakDisplay + 1;
    setBreakTime(seconds < 60 ? seconds * 60 : (seconds - 1) * 60);
    setBreakMinutes(
      breakTime < 3600
        ? secondsToMinutes(breakTime + 60)
        : secondsToMinutes(breakTime)
    );
  };

  const clear = () => {
    setIsSession(true);
    setSessionDisplay(25);
    setSession(1500);
    setBreakDisplay(5);
    setBreakTime(300);
    setMinutes(secondsToMinutes(session));
    setBreakMinutes(secondsToMinutes(breakTime));
    setIsActive(false);
  };

  return (
    <div className="App">
      <p id="title">Pomodoro Clock</p>
      <div className={`timer-wrapper ${isActive ? "fade" : ""}`}>
        <p id="timer-label">{isSession ? "Session" : "Break"}</p>
        <p id="time-left">{isSession ? minutes : breakMinutes}</p>
        <p>
          <span>
            {isSession ? (
              <FontAwesomeIcon id="icon-timer" icon="laptop-code" />
            ) : (
              <FontAwesomeIcon id="icon-timer" icon="coffee" />
            )}
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
        <FontAwesomeIcon id="reset" icon="sync-alt" onClick={clear} />
      </div>

      <div className="length-wrapper">
        <div className="session-wrapper">
          <p id="session-label">Session Length</p>
          <button id="session-decrement" onClick={decSession}>
            -
          </button>
          <p id="session-length">{sessionDisplay}</p>
          <button id="session-increment" onClick={incSession}>
            +
          </button>
        </div>

        <div className="break-wrapper">
          <p id="break-label">Break Length</p>
          <button id="break-decrement" onClick={decBreak}>
            -
          </button>
          <p id="break-length">{breakDisplay}</p>
          <button id="break-increment" onClick={incBreak}>
            +
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
