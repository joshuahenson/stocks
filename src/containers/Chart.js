import React, { Component } from 'react';
import { VictoryChart } from 'victory';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080'); // TODO: Update localhost

class Chart extends Component {
  componentDidMount() {
    socket.on('news', (data) => {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }
  render() {
    return (
      <VictoryChart />
    );
  }
}

export default Chart;
