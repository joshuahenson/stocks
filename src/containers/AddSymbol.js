import React, { Component, PropTypes } from 'react';
import './AddSymbol.css';

class AddSymbol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      adding: false,
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { socket } = this.props;
    socket.on('added symbol', () => this.setState({ adding: false }));
    socket.on('error message', (error) => {
      this.setState({ error: error.message, adding: false });
    });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    const { socket } = this.props;
    const { value } = this.state;
    event.preventDefault();
    if (value === '') {
      this.setState({ error: 'TICKER SYMBOL REQUIRED' });
    } else {
      socket.emit('client add symbol', { symbol: value });
      this.setState({ value: '', adding: true, error: '' });
    }
  }
  render() {
    const { value, adding, error } = this.state;
    return (
      <form className="add-symbol" onSubmit={this.handleSubmit}>
        <label htmlFor="addSymbolInput">Enter a ticker symbol</label>
        <input type="text" id="addSymbolInput" value={value} onChange={this.handleChange} placeholder="example: MSFT" />
        <button type="submit" disabled={adding}>{adding ? 'Adding...' : 'Add'}</button>
        <span className="error">{error}</span>
      </form>
    );
  }
}

AddSymbol.propTypes = {
  socket: PropTypes.object
};

export default AddSymbol;
