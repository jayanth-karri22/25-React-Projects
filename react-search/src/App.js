import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      countries: [],
      searchTerm: "",
      filteredCountries: []
    };
  }

  Iterate(item) {
    return <li key={item}>{item}</li>;
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(data => data.json())
      .then(res =>
        res.map(result =>
          this.setState({
            countries: [...this.state.countries, result.name],
            filteredCountries: [...this.state.countries, result.name]
          })
        )
      );
  }

  handleChange(e) {
    let filterCountries;
    filterCountries = this.state.countries.filter(country => {
      return country
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase());
    });

    this.setState({
      searchTerm: e.target.value,
      filteredCountries: filterCountries
    });
  }

  render() {
    let allCountries = this.state.filteredCountries.map(a => this.Iterate(a));
    return (
      <div className="App">
        <div>
          <h1 className="main">React Search</h1>
          <p className="heading">Here is a list of countries</p>
        </div>
        <div>
          <form className="searchbox" action="">
            <input
              className="search"
              type="text"
              onChange={e => this.handleChange(e)}
              value={this.state.searchTerm}
              placeholder="Search"
            />
          </form>

          <ul>{allCountries}</ul>
        </div>
      </div>
    );
  }
}

export default App;
