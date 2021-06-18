import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { counterClosure, print, inTens } from '../utils'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Timer () {
  const classes = useStyles();
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
          // localStorage.setItem('timer', {
          //   milliSeconds,
          //   seconds,
          //   minutes,
          //   hours,
          //   days
          // })
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
    setTimerButtonText('Stop')
    setTimerButtonColor('secondary')
    setIsTimer(true)
    const interval = 10
    const counterFunc = counterClosure(interval)
    const timerInterval = setInterval(() => {
      let count = counterFunc()
      getConvertedTimer(count)
    }, interval)
    setClearTimer(timerInterval)
    setIsPauseDisabled(false)
    setIsRefreshDisabled(false)
  }
  const stopTimer = () => {
    clearInterval(clearTimer)
    setIsTimer(false)
    setUserCounter(0)
    setTimerButtonText('Start')
    setTimerButtonColor('primary')
    setIsPauseDisabled(true)
    setIsRefreshDisabled(true)
  }
  const pauseTimer = () => {
  }
  const refreshTimer = () => {
  }
  const unset = () => {
    localStorage.clear()
  }
  const saveChange = (value) => {
    setUsername(value)
    setIsSaveDisabled(false)
    setIsUnSetDisabled(false)
  }
  const save = () => {
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
        <Button variant="contained" color={timerButtonColor} onClick={() => {
          isTimer ? stopTimer() : startTimer()
        }}>{timerButtonText}</Button>
        <Button variant="contained" onClick={() => pauseTimer()} disabled={isPauseDisabled}>Pause</Button>
        <Button variant="contained" onClick={() => refreshTimer()} disabled={isRefreshDisabled}>Refresh</Button>
      </div>
      <div style={{
        fontSize: '36px'
      }}><h1>{userTimer}</h1></div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '500px',
      }}>
        <input type="text" name="timer" placeholder="enter timer name" value={username} onChange={(e) => saveChange(e.target.value)} />
        <Button variant="contained" color="primary" onClick={(e) => { save() }} disabled={isSaveDisabled}> Save </Button>
        <Button variant="contained" color="secondary" onClick={(e) => { unset() }} disabled={isUnsetDisabled}> Unset </Button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Timer Name</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows.length ? rows.map((row, i) => (
                  <TableRow key={`${row.username}_${i}`}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="right">{`${inTens(row.hours)}:${inTens(row.minutes)}:${inTens(row.seconds)}.${inTens(row.milliSeconds)}`}</TableCell>
                  </TableRow>
                )) :
                  <TableRow>
                    <TableCell component="th" colSpan="2">
                      No Data Available
                    </TableCell>
                  </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Timer;
