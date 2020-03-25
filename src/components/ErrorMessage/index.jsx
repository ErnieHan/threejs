import React, { Component } from "react";
import styled from "styled-components";

const Button = styled.button`
  background: #1890ff;
  color: white;
  border: 0;
  border-radius: 6px;
  padding: 12px;
  margin: 8px 0;
  &:hover {
    background: #40a9ff;
  }
`;

const MessageContent = styled.div`
  position: fixed;
  top: 16px;
  left: 0;
  width: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  @media (max-width: 767px) {
    top: 50%;
    transform: translateY(-50%);
  }
`;

const ErrorText = styled.div`
  background: #fff;
  padding: 8px 20px;
  font-size: 13px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.active ? "1" : "0")};
  transform: ${props => (props.active ? "translateY(0)" : "translateY(-100%)")};
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    width: 80%;
    height: 100px;
    font-size: 17px;
  }
`;

const ErrorCircle = styled.div`
  width: 18px;
  height: 18px;
  background: #e91d1d;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  position: relative;
  &::before {
    content: "";
    width: 2px;
    height: 60%;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    content: "";
    width: 2px;
    height: 60%;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

class ErrorMessage extends Component {
  state = {
    active: false
  };
  clickErrorMessage = async () => {
    await this.setState({
      active: true
    });
    await setTimeout(() => {
      this.setState({
        active: false
      });
    }, 3500);
  };
  render() {
    return (
      <div>
        <Button onClick={!this.state.active ? this.clickErrorMessage : null}>
          點擊顯示錯誤訊息
        </Button>
        <MessageContent>
          <ErrorText active={this.state.active}>
            <ErrorCircle />
            <span>您輸入的資訊有誤</span>
          </ErrorText>
        </MessageContent>
      </div>
    );
  }
}

export default ErrorMessage;
