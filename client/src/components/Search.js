import "./Search.css";
import React, { Component } from "react";
import "./Results.css";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      saved: []
    };
  }

  saveArticle = event => {
    event.preventDefault();

    let saveTitle = event.target.getAttribute("data-title");
    let saveUrl = event.target.getAttribute("data-url");
    let saveDescription = event.target.getAttribute("data-description");

    return fetch("/api/saved", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ saveTitle, saveUrl, saveDescription })
    }).then(res => res.json());
  };

  savedArticlesShow = event => {
    event.preventDefault();

    return fetch("/saved")
    .then(response => response.json())
    .then(json => this.setState({ saved: json }));
    // .then(json => console.log(json))


  };

deleteArticle = event => {
    event.preventDefault();
      let art_id = event.target.getAttribute("data-id");
      // let saveTitle = event.target.getAttribute("data-title");
      // let saveUrl = event.target.getAttribute("data-url");
      // let saveDescription = event.target.getAttribute("data-description");

    

    return fetch(`/delete/${art_id}`, {
           method: "DELETE",
           headers: {
             "Accept": "application/json",
             "Content-Type": "application/json"
           }
         }).then(res => res.json())
          .then(art_id => {
            let updatedArts = this.state.saved.filter((art, i) => art._id !== art_id);
            this.setState({ saved: updatedArts });
          })
               

}


  searchNews = event => {
    event.preventDefault();
    let search = document.querySelector("#searchTerm");
    let searchTerm = search.value;

    let searchFrom = document.querySelector("#searchFrom");
    let from = searchFrom.value;

    let searchTo = document.querySelector("#searchTo");
    let to = searchTo.value;

    // alert(searchTerm);
    fetch(`/search/${searchTerm}/${from}/${to}`)
      .then(response => response.json())
      // .then(json => console.log(json.articles))
      .then(json => this.setState({ articles: json.articles }));
  };

  render() {
    return <div>
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
                  <a href="/index.html">Search</a>
                </li>
                <li>
                  <a href="#" onClick={this.savedArticlesShow}>
                    Saved Articles
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div id="searchDiv">
          <form class="form-inline" id="searchForm" onSubmit={this.searchNews}>
            <div class="form-group">
              <label for="exampleInputEmail1" id="label">
                News Search:{" "}
              </label>
              <input id="searchTerm" type="text" class="form-control" />
              <input id="searchFrom" type="text" class="form-control" placeholder="YYYY-MM-DD" />
              <input id="searchTo" type="text" class="form-control" placeholder="YYYY-MM-DD" />
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
                  {this.state.articles.map(b => (
                    <div class="media" key={b.source}>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <a target="_blank" href={b.url}>
                            {b.title}
                          </a>{" "}
                        </h4>
                        <p> {b.description} </p>
                      </div>
                      <button
                        onClick={this.saveArticle}
                        className="btn btn-default"
                        data-title={b.title}
                        data-url={b.url}
                        data-description={b.description}
                        onClick={this.saveArticle}
                      >
                        save
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div id="resultsDiv">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">Saved</h3>
                </div>
                <div id="savedBody" class="panel-body">
                  {this.state.saved.map(b => <div class="media" key={b._id}>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <a target="_blank" href={b.saveUrl}>
                            {b.saveTitle}
                          </a>{" "}
                        </h4>
                        <p> {b.saveDescription} </p>
                      </div>
                      <button onClick={this.deleteArticle} className="btn btn-default" data-id={b._id} data-title={b.saveTitle} data-url={b.saveUrl} data-description={b.saveDescription} >
                        delete
                      </button>
                    </div>)}
                </div>;
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Search;
