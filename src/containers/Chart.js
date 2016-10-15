import React, { Component } from 'react';
import { VictoryChart } from 'victory';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080'); // TODO: Update localhost

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }
  componentDidMount() {
    socket.on('history', (history) => {
      this.setState({ history });
      socket.emit('my other event', { my: 'data' }); // testing dummy response
    });
  }
  render() {
    return (
      <VictoryChart />
    );
  }
}

export default Chart;
