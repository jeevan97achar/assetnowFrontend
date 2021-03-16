import React from "react";
import { connect } from "react-redux";
import { INCREMENT, DECREMENT, increment, decrement } from "./actions";

class Counter extends React.Component {
  state = { count: 0 }; // remove this

  increment = () => {
    /*
    // Remove this
    this.setState({
      count: this.state.count + 1
    });
    */
    this.props.increment();
  };

  decrement = () => {
    /*
    // Also remove this
    this.setState({
      count: this.state.count - 1
    });
    */
    this.props.decrement(this.props.count);
  };

  render() {
    return (
      <div className="counter">
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span className="count">
            {
              // Replace state:
              //// this.state.count
              // With props:
              this.props.count
            }
          </span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("state///////////", state.reducer.count);
  console.log("state", state);
  return {
    count: state.reducer.count,
  };
}
const mapDispatchToProps = {
  increment,
  decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
