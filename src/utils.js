export const getCurrentTimer = () => new Date().toLocaleTimeString()

export const print = console.log
export const inTens = _ => _ > 9 ? _ : `0${_}`