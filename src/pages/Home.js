import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { fetchApple, fetchData, fetchTesting } from "../store/actions/home";

export class Home extends Component {
  componentDidMount() {
    this.props.fetchTesting();
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  fetched: state.home.fetched,
  setAppActive: state.app.index.active
});

export const mapDispatchToProps = dispatch => {
  return {
    fetchApple: () => dispatch(fetchApple()),
    fetchData: () => dispatch(fetchData()),
    fetchTesting: () => dispatch(fetchTesting())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
