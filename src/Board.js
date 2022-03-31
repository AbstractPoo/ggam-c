import React from "react";
import Notification from "./Notification";
import Leaderboard from "./Leaderboard";
import "./Board.css";
import "./Shake.css";

class Board extends React.Component {
  constructor({ socket }) {
    super({ socket });

    this.socket = socket;

    socket.on("connect", () => {
      console.log("connected with socket id: ", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("disconnected from webserver");
    });

    this.state = {
      question: "Please wait for a new question",
      shake: false,
      score: 0,
      notification: null
    };
  }

  handleKeypress = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      e.target.value = "";

      const data = {
        answer: value
      };

      this.socket.emit("answer", data, (response) => {
        if (response.result) {
          var score = this.state.score + 1;
          this.setState({
            shake: false,
            score: score,
            notification: "wow you are so amazing get right it bastard",
            notificationbg: "#6DF173"
          });
          setTimeout(() => {
            this.setState({ notification: null, notificationbg: null });
          }, 1000);
        } else {
          this.setState({
            shake: true,
            notification: "lol you got it wrong you bloody bastard",
            notificationbg: "#D64B4B"
          });
          setTimeout(() => {
            this.setState({
              shake: false,
              notification: null,
              notificationbg: null
            });
          }, 1000);
        }
      });
    }
  };

  componentDidMount = () => {
    this.socket.on("question", (question) => {
      this.setState({
        question: question.question.question
      });
    });

    this.socket.on("beaten", () => {
      this.setState({
        shake: true,
        notification: "you got beaten you naughty naughty",
        notificationbg: "#E9762F"
      });
      setTimeout(() => {
        this.setState({
          shake: false,
          notification: null,
          notificationbg: null
        });
      }, 1000);
    });
  };

  render() {
    return (
      <div id="game-board">
        <div id="question">{this.state.question}</div>
        <div id="question-field">
          <input
            onKeyPress={this.handleKeypress}
            placeholder="answer..."
            className={this.state.shake ? "shake" : ""}
          />
        </div>
        <div id="notification">
          {this.state.notification === null ? null : (
            <Notification
              text={this.state.notification}
              bg={this.state.notificationbg}
            />
          )}
        </div>
        <Leaderboard socket={this.socket} />
      </div>
    );
  }
}

export default Board;
