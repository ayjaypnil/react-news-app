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
      // .then(json => console.log(json.articles))
      .then(json => this.setState({articles: json.articles}))
  };

  render() {
    return <div id="searchDiv">
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



        <div>
          <div id="resultsDiv">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Results</h3>
              </div>
              <div id="resultsBody" class="panel-body">
                {this.state.articles.map(b => <p key={b.source}>
                    {b.title} <br />
                    {b.description}
                    <button data-id={b._id} onClick={this.props.deleteBook}>
                      save
                    </button>
                  </p>)}
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Search;
