import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: [
        {
          quote:
            "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
          author: "Bruce Lee"
        }
      ],
      randNum: 0
    };
    this.generateRandom = this.generateRandom.bind(this);
    this.Iterate = this.Iterate.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(res => res.json())
      .then(data =>
        data.quotes.map(obj => {
          this.setState({
            quotes: [...this.state.quotes, obj]
          });
          return this.state.quotes;
        })
      );
  }

  Iterate(quote, author) {
    return (
      <div>
        <p id="text">{quote}</p>
        <p id="author">{author}</p>
      </div>
    );
  }

  generateRandom() {
    this.setState({
      randNum: Math.floor(Math.random() * this.state.quotes.length)
    });
  }

  render() {
    let newQuote = this.Iterate(
      this.state.quotes[this.state.randNum].quote,
      this.state.quotes[this.state.randNum].author
    );
    return (
      <div className="App">
        <div id="quote-box">
          <div>{newQuote}</div>
          <div>
            <button id="new-quote" onClick={this.generateRandom}>
              New Quote
            </button>
            <button id="tweet-quote">
              <a href="https://twitter.com/intent/tweet">Tweet Quote</a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
