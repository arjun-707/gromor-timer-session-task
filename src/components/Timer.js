import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import { print, inTens } from '../utils'
import { ListTimers } from './ListTimers';
import { SaveTimers } from './SaveTimers';
import { DisplayTimer } from './DisplayTimer';

function Timer () {
  const [userTimer, setUserTimer] = useState('00:00:00.000')
  const [isTimer, setIsTimer] = useState(false)
  const [clearTimer, setClearTimer] = useState(false)
  const [userCounter, setUserCounter] = useState(0)
  const [isPauseDisabled, setIsPauseDisabled] = useState(true)
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(true)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const [isUnsetDisabled, setIsUnSetDisabled] = useState(true)
  const [username, setUsername] = useState('')
  const [timerButtonText, setTimerButtonText] = useState('Start')
  const [timerButtonColor, setTimerButtonColor] = useState('primary')
  const [rows, setRows] = useState([])
  const [counter, setCounter] = useState(0)
  let isPause = true
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
    let oldList = localStorage.getItem('users')
    if (oldList) {
      oldList = JSON.parse(oldList)
      setRows(oldList)
    }
  }
  useEffect(displayTimer, [])

  const startTimer = _ => {
    setTimerButtonText('Stop')
    setTimerButtonColor('secondary')
    setIsTimer(true)
    const interval = 100
    isPause = false
    const timerInterval = setInterval(_ => {
      if (!isPause)
        setCounter(c => c + interval)
    }, interval)
    setClearTimer(timerInterval)
    setIsPauseDisabled(false)
    setIsRefreshDisabled(false)
  }
  const stopTimer = _ => {
    clearInterval(clearTimer)
    setIsTimer(false)
    setUserCounter(0)
    setTimerButtonText('Start')
    setTimerButtonColor('primary')
    setIsPauseDisabled(true)
    setIsRefreshDisabled(true)
  }
  const pauseTimer = _ => {
    isPause = true
    setIsTimer(false)
    clearInterval(clearTimer)
    setIsPauseDisabled(true)
    setTimerButtonText('Resume')
    setTimerButtonColor('primary')
  }
  const refreshTimer = _ => {

  }
  const unset = _ => {
    localStorage.clear()
  }
  const saveChange = (value) => {
    setUsername(value)
    setIsSaveDisabled(false)
    setIsUnSetDisabled(false)
  }
  const save = _ => {
    let oldList = localStorage.getItem('users')
    if (oldList) {
      oldList = JSON.parse(oldList)
      oldList.push({
        username,
        milliSeconds,
        seconds,
        minutes,
        hours,
        days
      })
      localStorage.setItem('users', JSON.stringify(oldList))
      setRows(oldList)
    }
    else {
      oldList = []
      oldList.push({
        username,
        milliSeconds,
        seconds,
        minutes,
        hours,
        days
      })
      localStorage.setItem('users', JSON.stringify(oldList))
      setRows(oldList)
    }
    setUsername('')
    setIsSaveDisabled(false)
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
        <Button variant="contained" color={timerButtonColor} onClick={_ => {
          isTimer ? stopTimer() : startTimer()
        }}>{timerButtonText}</Button>
        <Button variant="contained" onClick={_ => pauseTimer()} disabled={isPauseDisabled}>Pause</Button>
        <Button variant="contained" onClick={_ => refreshTimer()} disabled={isRefreshDisabled}>Refresh</Button>
      </div>
      <DisplayTimer
        isTimer={isTimer}
        counter={counter}
        setCounter={setCounter}
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        milliSeconds={milliSeconds}
        setDays={setDays}
        setHours={setHours}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        setMilliSeconds={setMilliSeconds}
      />
      <SaveTimers username={username} saveChange={saveChange} save={save} unset={unset} isSaveDisabled={isSaveDisabled} isUnsetDisabled={isUnsetDisabled} />
      <ListTimers rows={rows} />
    </div>
  );
}

export default Timer;
