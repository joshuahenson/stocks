import React, { Component } from 'react';
import { VictoryChart } from 'victory';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080'); // TODO: Update localhost

class Chart extends Component {
  componentDidMount() {
    socket.on('history', (history) => {
      console.log(history);
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
