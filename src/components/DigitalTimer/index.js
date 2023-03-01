import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isMinutesTime: 25, secondsTime: 0, timerStatement: false}

  onClickRest = () => {
    clearInterval(this.timerInterval)
    this.setState({isMinutesTime: 25, secondsTime: 0})
  }

  tick = () => {
    this.setState(prevState => ({secondsTime: prevState.secondsTime - 1}))
  }

  clearTimeInterval = () => {
    clearInterval(this.timerInterval)
  }

  onClickStartPause = () => {
    const {isMinutesTime, timerStatement, secondsTime} = this.state
    const isTimeTotalCompleted = secondsTime === isMinutesTime * 60

    if (isTimeTotalCompleted) {
      this.setState({secondsTime: 0})
    }

    if (timerStatement) {
      this.clearTimeInterval()
    } else {
      this.timerInterval = setInterval(this.tick, 1000)
    }

    this.setState(prevState => ({
      timerStatement: !prevState.timerStatement,
    }))
  }

  getMinutes = () => {
    const {isMinutesTime, secondsTime} = this.state
    const Minutes = Math.floor(secondsTime / 60)
    const totalMinutes = isMinutesTime - Minutes
    if (totalMinutes < 10) {
      return `0${totalMinutes}`
    }
    return totalMinutes
  }

  getSeconds = () => {
    const {secondsTime} = this.state

    const Seconds = Math.floor(secondsTime % 60)
    if (Seconds < 10) {
      return `0${Seconds}`
    }
    return Seconds
  }

  onClickMinus = () => {
    const {timerStatement} = this.state
    if (timerStatement) {
      //  clearInterval(this.timerInterval)
    } else {
      this.setState(prevState => ({isMinutesTime: prevState.isMinutesTime - 1}))
    }
  }

  onClickPlus = () => {
    const {timerStatement} = this.state
    if (timerStatement) {
      // clearInterval(this.timerInterval)
    } else {
      this.setState(prevState => ({isMinutesTime: prevState.isMinutesTime + 1}))
    }
  }

  render() {
    const {timerStatement, isMinutesTime} = this.state
    const time = `${this.getMinutes()}:${this.getSeconds()}`
    const timerStartPause = timerStatement
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altTimer = timerStatement ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <div className="card-bg-container">
          <h1 className="digital-heading">Digital Timer</h1>
          <div className="timer-container">
            <div className="bg-timer-container">
              <div className="center-time">
                <h1>{time}</h1>
                <p>{timerStatement ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="container-reset-paused">
              <div className="button-container">
                <button
                  type="button"
                  className="button-icon"
                  onClick={this.onClickStartPause}
                >
                  <img src={timerStartPause} alt={altTimer} className="icon" />
                  <p> {timerStatement ? 'Pause' : 'Start'}</p>
                </button>

                <button
                  type="button"
                  className="button-icon"
                  onClick={this.onClickRest}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                  <p>Reset</p>
                </button>
              </div>
              <p className="setTimeLimit">Set Timer limit</p>
              <div className="add-button-container">
                <button
                  type="button"
                  className="button-add"
                  onClick={this.onClickMinus}
                >
                  -
                </button>
                <p className="number-increment">{isMinutesTime}</p>
                <button
                  type="button"
                  className="button-add"
                  onClick={this.onClickPlus}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
