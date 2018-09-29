import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      countrySearch: "",
      capitalSearch: "",
      regionSearch: "",
      subregionSearch: ""
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(data => data.json())
      .then(res =>
        res.filter(
          result =>
            result.capital !== "" &&
            this.setState({
              countries: [
                ...this.state.countries,
                {
                  name: result.name,
                  capital: result.capital,
                  region: result.region,
                  subregion: result.subregion
                }
              ]
            })
        )
      );
  }

  Iterate(val) {
    return (
      <div>
        <li>{val}</li>
      </div>
    );
  }

  handleCountryChange(e) {
    this.setState({
      countrySearch: e.target.value
    });
  }

  handleCapitalChange(e) {
    this.setState({
      capitalSearch: e.target.value
    });
  }

  handleRegionChange(e) {
    this.setState({
      regionSearch: e.target.value
    });
  }

  handleSubregionChange(e) {
    this.setState({
      subregionSearch: e.target.value
    });
  }

  render() {
    let countrySearch = this.state.countrySearch.trim().toLowerCase();
    let capitalSearch = this.state.capitalSearch.trim().toLowerCase();
    let regionSearch = this.state.regionSearch.trim().toLowerCase();
    let subregionSearch = this.state.subregionSearch.trim().toLowerCase();

    let countries = this.state.countries;

    if (countrySearch.length > 0) {
      countries = countries.filter(country => {
        return country.name.toLowerCase().match(countrySearch);
      });
    }

    if (capitalSearch.length > 0) {
      countries = countries.filter(country => {
        return country.capital.toLowerCase().match(capitalSearch);
      });
    }

    if (regionSearch.length > 0) {
      countries = countries.filter(country => {
        return country.region.toLowerCase().match(regionSearch);
      });
    }

    if (subregionSearch.length > 0) {
      countries = countries.filter(country => {
        return country.subregion.toLowerCase().match(subregionSearch);
      });
    }

    let countryList = countries.map(country => this.Iterate(country.name));
    let capitalList = countries.map(country => this.Iterate(country.capital));
    let regionList = countries.map(country => this.Iterate(country.region));
    let subregionList = countries.map(country =>
      this.Iterate(country.subregion)
    );

    return (
      <div className="App">
        <h1>Country/Capital Data Multi-Search Service</h1>
        <form className="searchbox">
          <input
            type="text"
            className="search"
            placeholder="COUNTRY"
            name="name"
            onChange={e => this.handleCountryChange(e)}
          />
          <input
            type="text"
            className="search"
            placeholder="CAPITAL"
            name="capital"
            onChange={e => this.handleCapitalChange(e)}
          />
          <input
            type="text"
            className="search"
            placeholder="REGION"
            name="region"
            onChange={e => this.handleRegionChange(e)}
          />
          <input
            type="text"
            className="search"
            placeholder="SUBREGION"
            name="subregion"
            onChange={e => this.handleSubregionChange(e)}
          />
        </form>
        <div className="main">
          <ul>
            <li className="heading heading1">Country</li>
            <div className="list">{countryList}</div>
          </ul>
          <ul>
            <li className="heading heading2">Capital</li>
            <div className="list">{capitalList}</div>
          </ul>
          <ul>
            <li className="heading heading3">Region</li>
            <div className="list">{regionList}</div>
          </ul>
          <ul>
            <li className="heading heading4">Subregion</li>
            <div className="list">{subregionList}</div>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
