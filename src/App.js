import "./App.css";
import Board from "./Board";

const { io } = require("socket.io-client");
const socket = io("https://websocketcommunication.abstractpoo.repl.co/");

export default function App() {
  return (
    <div className="App">
      <h1>Get good at maths</h1>
      <Board socket={socket} />
    </div>
  );
}
