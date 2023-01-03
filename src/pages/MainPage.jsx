/** @format */

import React, { useState } from 'react';
import Header from '../components/Header';
import './Page.css';
import Footer from '../components/Footer';
import sound from '../sound/sound2.mp3';

function MainPage() {
  //Set initial state for break length and session length
  let [initialBreakLengthValue, setBreakLengthValue] = useState(5);
  let [initialSessionLengthValue, setSessionLengthValue] = useState(25);
  let [initialSessionValue, setSessionValue] = useState(25);
  let [initialSessionCountValue, setSessionCountValue] = useState(0);

  //Set state for timer to be stopped
  let [timerId, setTimerId] = useState(0);

  //Set useState for disabling and enabling play, pause, reset button
  let [playDisabled, setPlayDisabled] = useState(false);
  let [pauseDisabled, setPauseDisabled] = useState(true);
  let [resetDisabled, setResetDisabled] = useState(true);

  //Set useState for disabling Decremental and Incremental button
  let [disableDecrBtn, setDisableDecrBtn] = useState(false);
  let [disableIncrBtn, setDisableIncrBtn] = useState(false);

  //For break length addition
  const btnAddBreakLengthValue = () => {
    setBreakLengthValue(initialBreakLengthValue + 1);
  };

  //For break length subtraction
  const btnSubtractBreakLengthValue = () => {
    if (initialBreakLengthValue <= 1) {
      //Nothing should happen
    } else {
      setBreakLengthValue(initialBreakLengthValue - 1);
    }
  };

  //For session length addition
  const btnAddSessionLengthValue = () => {
    setSessionLengthValue(initialSessionLengthValue + 1);
    setSessionValue((initialSessionValue = initialSessionLengthValue + 1));
  };

  //For session length subtraction
  const btnSubtractSessionLengthValue = () => {
    if (initialSessionLengthValue <= 1) {
      //Nothing should happen
    } else {
      setSessionLengthValue(initialSessionLengthValue - 1);
      setSessionValue((initialSessionValue = initialSessionLengthValue - 1));
    }
  };

  //For Play button
  let countDown = null;
  const btnPlay = () => {
    //Change disabled state of stated buttons
    setPlayDisabled(true);
    setPauseDisabled(false);
    setResetDisabled(false);

    setDisableDecrBtn(true);
    setDisableIncrBtn(true);

    //Set session count to 59
    setSessionCountValue((initialSessionCountValue = 59));

    //Start session countdown timer
    countDown = setInterval(() => {
      setSessionCountValue(
        (initialSessionCountValue = initialSessionCountValue - 1)
      );

      //Check if sessionCount value is less than 0 to decrease sessionValue by 1
      if (initialSessionCountValue < 0) {
        setSessionCountValue((initialSessionCountValue = 59));
        setSessionValue((initialSessionValue = initialSessionValue - 1));

        //Take break length value if sessionValue has been exhausted
        if (initialSessionValue < 0) {
          setSessionCountValue((initialSessionCountValue = 59));
          setSessionValue((initialSessionValue = initialBreakLengthValue));

          //Play alarm audio file
          new Audio(sound).play();

          //Stop timer
          clearInterval(countDown);

          //Change disabled state of stated buttons
          setPlayDisabled(false);
          setPauseDisabled(true);
          setResetDisabled(true);

          setDisableDecrBtn(false);
          setDisableIncrBtn(false);
        }
      }
    }, 1000);
    setTimerId(countDown);
  };

  const btnPause = () => {
    clearInterval(timerId);

    setPlayDisabled(false);
    setPauseDisabled(true);
    setResetDisabled(false);

    setDisableDecrBtn(false);
    setDisableIncrBtn(false);
  };

  const btnReset = () => {
    clearInterval(timerId);
    setSessionCountValue(0);
    setSessionValue(25);
    setBreakLengthValue(5);
    setSessionLengthValue(25);

    setPlayDisabled(false);
    setPauseDisabled(true);
    setResetDisabled(true);

    setDisableDecrBtn(false);
    setDisableIncrBtn(false);
    //window.location.reload();
  };

  return (
    <div>
      <Header />
      <div
        className='container text-center'
        id='main-page'
      >
        <div className='row'>
          <div className='col-sm'>
            Break Length
            <div className='container text-center mt-1'>
              <p>
                {initialBreakLengthValue < 10
                  ? '0' + initialBreakLengthValue
                  : initialBreakLengthValue}
              </p>
              {/* Add new value to break length */}
              <button
                className='btn btn-primary'
                onClick={btnAddBreakLengthValue}
                disabled={disableIncrBtn}
              >
                <i className='fa fa-arrow-up'></i>
              </button>
              &nbsp;
              {/* Subtract one from new break length value */}
              <button
                className='btn btn-danger'
                onClick={btnSubtractBreakLengthValue}
                disabled={disableDecrBtn}
              >
                <i className='fa fa-arrow-down'></i>
              </button>
            </div>
          </div>
          <div className='col-sm'>
            Session Length
            <div className='container text-center mt-1'>
              <p>
                {initialSessionLengthValue < 10
                  ? '0' + initialSessionLengthValue
                  : initialSessionLengthValue}
              </p>
              {/* Add new value to session length */}
              <button
                className='btn btn-success'
                onClick={btnAddSessionLengthValue}
                disabled={disableIncrBtn}
              >
                <i className='fa fa-arrow-up'></i>
              </button>
              &nbsp;
              {/* Subtract one from new session length value */}
              <button
                className='btn btn-danger'
                onClick={btnSubtractSessionLengthValue}
                disabled={disableDecrBtn}
              >
                <i className='fa fa-arrow-down'></i>
              </button>
            </div>
          </div>
        </div>
        <div
          className='container'
          id='session-value-container'
        >
          <b>Session</b>
          <p id='txtSessionValueAndCountValue'>
            {initialSessionValue < 10
              ? '0' + initialSessionValue
              : initialSessionValue}
            :
            {initialSessionCountValue < 10
              ? '0' + initialSessionCountValue
              : initialSessionCountValue}
          </p>
        </div>
        <div className='container mt-2'>
          <button
            className='btn btn-primary'
            onClick={btnPause}
            disabled={pauseDisabled}
          >
            <i className='fa fa-pause'></i>
          </button>
          &nbsp;
          <button
            className='btn btn-success'
            onClick={btnPlay}
            disabled={playDisabled}
          >
            <i className='fa fa-play'></i>
          </button>
          &nbsp;
          <button
            className='btn btn-dark'
            onClick={btnReset}
            disabled={resetDisabled}
          >
            <i className='fa fa-refresh'></i>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
