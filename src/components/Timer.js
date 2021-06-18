import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import { counterClosure, print, inTens } from '../utils'

function Timer () {
  const [userTimer, setUserTimer] = useState('00:00:00.000')
  const [isTimer, setIsTimer] = useState(false)
  const [clearTimer, setClearTimer] = useState(false)
  const [userCounter, setUserCounter] = useState(0)

  let timers = localStorage.getItem('timer')
  timers = timers ? JSON.parse(timers) : null
  const [milliSeconds, setMilliSeconds] = useState(timers && timers.milliSeconds ? +timers.milliSeconds : 0)
  const [seconds, setSeconds] = useState(timers && timers.seconds ? +timers.seconds : 0)
  const [minutes, setMinutes] = useState(timers && timers.minutes ? +timers.minutes : 0)
  const [hours, setHours] = useState(timers && timers.hours ? +timers.hours : 0)
  const [days, setDays] = useState(timers && timers.days ? +timers.days : 0)


  const displayTimer = _ => {
    const time = `${inTens(hours)}:${inTens(minutes)}:${inTens(seconds)}.${inTens(milliSeconds)}`
    setUserTimer(time)
  }
  useEffect(displayTimer, [])

  const getConvertedTimer = _ => {
    const milliSec = 1000
    if (_ < milliSec) {
      console.log(_, 'count')
      setMilliSeconds(_)
    }
    else {
      setSeconds(s => s + 1)
      setMilliSeconds(0)
      if (seconds > 59) {
        setMinutes(m => m + 1)
        setSeconds(0)
        if (minutes > 59) {
          localStorage.setItem('timer', {
            milliSeconds,
            seconds,
            minutes,
            hours,
            days
          })
          setHours(h => h + 1)
          setMinutes(0)
          if (hours > 24) {
            setDays(d => d + 1)
            setHours(0)
          }
        }
      }
      // print('ssss', seconds)
      displayTimer()
    }
  }
  const startTimer = () => {
    setIsTimer(true)
    const interval = 10
    const counterFunc = counterClosure(interval)
    const timerInterval = setInterval(() => {
      let count = counterFunc()
      getConvertedTimer(count)
    }, interval)
    setClearTimer(timerInterval)
  }
  const stopTimer = () => {
    clearInterval(clearTimer)
    setIsTimer(false)
    setUserCounter(0)
  }
  const pauseTimer = () => {
    localStorage.clear()
  }
  const refreshTimer = () => {
    localStorage.clear()
  }
  const unset = () => {
    localStorage.clear()
  }
  const save = (username) => {
    localStorage.setItem(username, {
      milliSeconds,
      seconds,
      minutes,
      hours,
      days
    })
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '200px',
      marginTop: '40px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '500px',
      }}>
        <Button variant="contained" color="primary" onClick={() => {
          isTimer ? stopTimer() : startTimer()
        }}>{isTimer ? "Stop" : "Start"}</Button>
        <Button variant="contained" onClick={() => pauseTimer()}>Pause</Button>
        <Button variant="contained" onClick={() => refreshTimer()}>Refresh</Button>
      </div>
      <div><label htmlFor="">{userTimer}</label></div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '500px',
      }}>
        <input type="text" name="timer" placeholder="enter timer name" />
        <Button variant="contained" color="primary" onClick={(e) => { save(e.target.value) }}> Save </Button>
        <Button variant="contained" color="primary" onClick={(e) => { unset(e.target.value) }}> Unset </Button>
      </div>
    </div>
  );
}

export default Timer;
