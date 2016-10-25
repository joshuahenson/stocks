import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001'); // TODO: Update localhost
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
    socket.on('new symbol', (newSymbol) => {
      this.setState({ history: [...this.state.history, newSymbol] });
    });
  }
  render() {
    return (
      <div>
        <VictoryChart>
          <VictoryAxis
            offsetY={50}
            fixLabelOverlap
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
        <button onClick={() => socket.emit('client add symbol', { symbol: 'msft' })}>Test</button>
      </div>
    );
  }
}

export default Chart;
