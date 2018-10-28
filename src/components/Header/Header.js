import React, { Component } from "react";
import "../Header/Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__box center__box">
          <h1 className="header__heading">Welcome to Ran's Library</h1>
        </div>
      </div>
    );
  }
}
