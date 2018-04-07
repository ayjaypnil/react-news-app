import "./Search.css";
import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
    
    <div id="searchDiv">
        <form class="form-inline">
          <div class="form-group">
            <label for="exampleInputEmail1" id="label">Google News Search: </label>
            <input type="text" class="form-control" />
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>

        <button id="topButton" class="btn btn-primary">Generate Top Stories</button>
      </div>
    )
  }
}

export default Search;
