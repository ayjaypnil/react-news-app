import "./Search.css";
import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  searchNews = event => {
    event.preventDefault();
    let search = document.querySelector("#searchTerm");
    let searchTerm = search.value;

    // alert(searchTerm);
    return fetch(`http://localhost:3001/search/${searchTerm}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
  };


  render() {
    return (
      <div id="searchDiv">
        <form class="form-inline" id="searchForm" onSubmit={this.searchNews}>
          <div class="form-group">
            <label for="exampleInputEmail1" id="label">
              News Search:{" "}
            </label>
            <input id="searchTerm" type="text" class="form-control" />
          </div>
          <button type="submit" class="btn btn-default">
            Submit
          </button>
        </form>

        <button id="topButton" class="btn btn-primary">
          Generate Top Stories
        </button>
          <p>
            {this.state.articles}
          </p>
      </div>
    );
  }
}

export default Search;
