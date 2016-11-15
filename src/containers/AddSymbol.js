import React, { Component, PropTypes } from 'react';
import './AddSymbol.css';

class AddSymbol extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    const { socket } = this.props;
    const { value } = this.state;
    event.preventDefault();
    socket.emit('client add symbol', { symbol: value });
    this.setState({ value: '' });
  }
  render() {
    const { value } = this.state;
    return (
      <form className="add-symbol" onSubmit={this.handleSubmit}>
        <label htmlFor="addSymbolInput">Enter a ticker symbol</label>
        <input type="text" id="addSymbolInput" value={value} onChange={this.handleChange} />
        <button type="submit">Add</button>
      </form>
    );
  }
}

AddSymbol.propTypes = {
  socket: PropTypes.object
};

export default AddSymbol;
