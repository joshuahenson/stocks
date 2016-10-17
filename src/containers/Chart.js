import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080'); // TODO: Update localhost
const colors = ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'];

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
      <VictoryChart>
        <VictoryAxis
          offsetY={50}
        />
        <VictoryAxis
          dependentAxis
        />
        {this.state.history.map((stock, index) =>
          <VictoryLine
            key={index}
            data={stock.days.map(day => ({ x: day.tradingDay, y: (day.close - stock.days[0].close) / stock.days[0].close }))}
            style={{
              data: {
                stroke: colors[index],
                strokeWidth: 3
              }
            }}
          />
        )}
      </VictoryChart>
    );
  }
}

export default Chart;
