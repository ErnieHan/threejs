import React, { Component } from "react";
import styled from "styled-components";

export const Content = styled.div`
  padding: 15px;
`;

export const Input = styled.input`
  padding: 15px;
`;

class IsPass extends Component {
  state = {
    name: "foo"
  };

  handleClick = () => {
    this.setState({
      name: "bar"
    });
  };

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  login() {
    console.log("aaa");
  }

  render() {
    return (
      <div>
        <Content className="testing" onClick={this.handleClick}>
          {this.state.name}
        </Content>
        <Input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <div className="ernie" onClick={this.login.bind(this)}>
          Testing
        </div>
      </div>
    );
  }
}

export default IsPass;
