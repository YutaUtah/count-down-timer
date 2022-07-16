import React, { Component } from "react";
import Header from "./components/Header";
import TimeElem from "./components/TimeElem";
import TimeButton from "./TimeButton";
import "../src/components/TimeElem.css";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        hours: "00",
        minutes: "00",
        seconds: "00",
      },
      // status
      //  started: 0
      //  stopped: 1
      status: 0,
      interValId: "",
      isTimeUp: false,
      started: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  formatDisplay() {
    let displayString = "";
    Object.values(this.state.time).forEach((val) => {
      let displayNum;
      !val ? (displayNum = 0) : (displayNum = parseInt(val));
      if (displayNum < 10) {
        displayString += "0";
      }
      displayString += displayNum.toString() + ":";
    });
    return displayString.slice(0, -1);
  }

  timeSetUp() {
    return {
      hours:   parseInt(this.state.time.hours),
      minutes: parseInt(this.state.time.minutes),
      seconds: parseInt(this.state.time.seconds),
    };
  }

  run = () => {
    if (this.state.status === 0) {
      let update = this.timeSetUp();
      let updatedHours = update["hours"], updatedMinutes = update["minutes"], updatedSeconds = update["seconds"];

      if (updatedSeconds === 0) {
        if (updatedMinutes === 0) {
          if (updatedHours === 0) {
            this.setState({ status: 1 });
            this.setState({ isTimeUp: true });
            clearInterval(this.state.interValId);
            return;
          }
          updatedHours--;
          updatedMinutes = 60;
          updatedSeconds = 60;
        }
        updatedMinutes--;
        updatedSeconds = 60;
      }
      updatedSeconds--;

      this.setState({
        time: {
          hours: updatedHours.toString(),
          minutes: updatedMinutes.toString(),
          seconds: updatedSeconds.toString(),
        },
      });
    }
  };

  start = () => {
    this.setState({
      status: 0,
      started: true,
    });
    this.run();
    this.setState({ interValId: setInterval(this.run, 1000) });
  };

  stop = () => {
    clearInterval(this.state.interValId);
    this.setState({ status: 1 });
  };

  resume = () => this.start();

  reset = () => {
    this.setState({
      time: {
        hours: "00", minutes: "00", seconds: "00",
      },
      status: 0,
      interValId: "",
      isTimeUp: false,
      started: false,
    });
  }

  showOrHideStart () {
    if (this.state.started === false) {
      return (<TimeButton name="Start" onClick={this.start} />);
    } else {
      return ("")
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = Object.assign({}, this.state.time, {
      [name]: target.value,
    });
    this.setState({
      time: value,
    });
  }

  render() {
    const isTimeUp = this.state.isTimeUp;

    return (
      <React.Fragment>
        <div className="main-box backgroun-color">
          <div className="d-flex flex-column white-box">
            <Header />
            <div className="timer-element">
              <TimeElem name="hours" onChange={this.handleChange} />
              <TimeElem name="minutes" onChange={this.handleChange} />
              <TimeElem name="seconds" onChange={this.handleChange} />
            </div>
            <h1 className="timer-element">{this.formatDisplay()}</h1>
            <div className="timer-element">
              {this.showOrHideStart()}
              <TimeButton name="Stop" onClick={this.stop} />
              <TimeButton name="Resume" onClick={this.resume} />
              <TimeButton name="Reset" onClick={this.reset} />
            </div>
            <div>
              {isTimeUp ? (<h1 className="text-center text-danger mb-4">Time up!!</h1>) : ( "" )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
