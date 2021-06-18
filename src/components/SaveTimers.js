import { Button } from '@material-ui/core';
export const SaveTimers = ({ username, saveChange, saveUserTimer, isSaveDisabled }) => {
  return <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '300px',
  }}>
    <input type="text" name="timer" placeholder="enter timer name" value={username} onKeyPress={(e) => {
      if (e.charCode == 13 || e.code == 'Enter')
        saveUserTimer()
    }} onChange={(e) => saveChange(e.target.value)} />
    <Button variant="contained" color="primary" onClick={(e) => { saveUserTimer() }} disabled={isSaveDisabled}> Save </Button>
  </div>
}