import "./Nav.css";
import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <div className="navBar">
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">
                <span class="glyphicon glyphicon-paperclip" aria-hidden="true" />
              </a>
            </div>

            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#">Search</a>
              </li>
              <li>
                <a href="#">Saved Articles</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav;
