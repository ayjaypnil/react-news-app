import "./Search.css";
import React, { Component } from "react";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      articles: []
    };
  }


  
  searchNews = event => {
    event.preventDefault();
    let search = document.querySelector("#searchTerm");
    let searchTerm = search.value;

    // alert(searchTerm);
      fetch(`/search/${searchTerm}`)
      .then(response => response.json())
      .then(json => console.log(json.articles))

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
      
      </div>
    );
  }
}

export default Search;
