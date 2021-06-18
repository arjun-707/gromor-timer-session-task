import { inTens } from '../utils'
export const DisplayTimer = ({
  isTimer,
  counter,
  setCounter,
  days,
  hours,
  minutes,
  seconds,
  milliSeconds,
  setDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliSeconds,
}) => {
  if (isTimer) {
    if (counter < 1000) {
      setMilliSeconds(counter)
    }
    else {
      setCounter(0)
      setSeconds(s => s + 1)
      setMilliSeconds(0)
      localStorage.setItem('timer', JSON.stringify({
        milliSeconds,
        seconds,
        minutes,
        hours,
        days
      }))
      if (seconds > 59) {
        setMinutes(m => m + 1)
        setSeconds(0)
        if (minutes > 59) {
          setHours(h => h + 1)
          setMinutes(0)
          if (hours > 24) {
            setDays(d => d + 1)
            setHours(0)
          }
        }
      }
    }
  }
  return <div style={{
    fontSize: '36px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }}>
    {days ?
      <h1>
        <span>{inTens(days)} Days</span>
      </h1>  
      : ''
    }
    <h1>
      <span>{inTens(hours)}</span>
    </h1>
    <h1>:</h1>
    <h1>
      <span>{inTens(minutes)}</span>
    </h1>
    <h1>:</h1>
    <h1>
      <span>{inTens(seconds)}</span>
    </h1>
    <h1>.</h1>
    <h1 style={{
      width: '130px'
    }}>
      <span>{inTens(milliSeconds)}</span>
    </h1>
  </div>
}