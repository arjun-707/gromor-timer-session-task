export const getCurrentTimer = () => new Date().toLocaleTimeString()

export const counterClosure = (incr = 1) => {
  let count = 0
  return () => {
    count += incr
    return count
  }
}

export const print = console.log
export const inTens = _ => _ > 9 ? _ : `0${_}`