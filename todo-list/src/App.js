import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        "Create to do list App",
        "Data Structures and Algorithms",
        "Prepare Resume",
        "Js NEWS"
      ],
      resetlist: [
        "Create to do list App",
        "Data Structures and Algorithms",
        "Prepare Resume",
        "Js NEWS"
      ],
      searchTerm: "",
      filterTerm: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClearList = this.handleClearList.bind(this);
    this.handleResetList = this.handleResetList.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem(e) {
    let { list } = this.state;

    list.splice(e.target.value, 1);

    this.setState({
      list
    });
  }

  Iterate(item, index) {
    return (
      <div>
        <li>
          {item}
          <button value={index} onClick={e => this.handleRemoveItem(e)}>
            X
          </button>
        </li>
      </div>
    );
  }

  handleNewItem(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    let { list, searchTerm } = this.state;

    list.push(searchTerm);
    searchTerm = "";

    this.setState({
      list,
      searchTerm
    });
  }

  handleClearList() {
    let { list } = this.state;

    list = [];

    this.setState({
      list
    });
  }

  handleResetList() {
    this.setState({
      list: [...this.state.resetlist]
    });
  }

  handleFilterTermChange(e) {
    this.setState({
      filterTerm: e.target.value
    });
  }

  render() {
    let { list, filterTerm } = this.state;

    let newList = list.map(
      (item, index) =>
        item
          .toLowerCase()
          .trim()
          .match(filterTerm.toLowerCase().trim()) && this.Iterate(item, index)
    );
    return (
      <div className="App">
        <div>
          <h1>React To-Do App</h1>
          <p>Enhance Your Productivity</p>
        </div>
        <form>
          <input
            value={this.state.searchTerm}
            type="text"
            placeholder="create new work item"
            onChange={e => this.handleNewItem(e)}
          />
          <button onClick={e => this.handleClick(e)}>Enter New Item</button>
          <input
            value={this.state.filterTerm}
            type="text"
            placeholder="filter list"
            onChange={e => this.handleFilterTermChange(e)}
          />
        </form>
        <ul>
          <li>
            <span>#</span>
            <span>Task</span>
            <span>(X)</span>
          </li>
          <li>{newList}</li>
        </ul>
        <div>
          <button onClick={this.handleClearList}>Clear the List</button>
          <button onClick={this.handleResetList}>Reset the List</button>
        </div>
      </div>
    );
  }
}

export default App;
