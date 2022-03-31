import React from "react";
import "./Notification.css";

class Notification extends React.Component {
  constructor({ text, bg }) {
    super(text);
    this.bg = bg || "#FFF";
    this.notificationText = text;
  }

  render() {
    return (
      <div className="notification" style={{ backgroundColor: this.bg }}>
        {this.notificationText}
      </div>
    );
  }
}

export default Notification;
