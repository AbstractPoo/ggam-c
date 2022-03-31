import React from "react";
import "./Leaderboard.css";

class Leaderboard extends React.Component {
  constructor({ players, socket }) {
    super(players);

    this.socket = socket;

    this.state = {
      players: []
    };
  }

  componentDidMount = () => {
    this.socket.on("leaderboard", (players) => {
      this.setState({
        players: players
      });
    });
  };

  updateName = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      this.socket.emit("update name", value);
    }
  };

  render() {
    return (
      <div id="right-container">
        <div id="leaderboard">
          {this.state.players.map((player) => {
            return (
              <div key={player.sid} className="player-entry">
                {player.nickname} : {player.score}
              </div>
            );
          })}
        </div>
        <input
          id="name-changer"
          placeholder="name..."
          onKeyPress={this.updateName}
        ></input>
      </div>
    );
  }
}

export default Leaderboard;
