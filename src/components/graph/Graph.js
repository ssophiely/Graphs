import React from "react";

class Header extends React.Component {
  render() {
    return <header>{this.props.x}</header>;
  }
}

class Graph extends React.Component {
  helpText = "Help text!";

  render() {
    return (
      <div className="left">
        <Header x="Шапка сайта&!" />
        <h1>{this.helpText}</h1>
        <input
          placeholder={this.helpText}
          onClick={this.inputClick}
          onMouseEnter={this.mouseOver}
        />
        <p>{this.helpText === "Help text!" ? "Yes" : "No"}</p>
      </div>
    );
  }

  inputClick() {
    console.log("Clicked");
  }
  mouseOver() {
    console.log("Mouse Over");
  }
}

export default Graph;
