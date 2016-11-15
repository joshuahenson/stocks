import React, { Component } from 'react';
import io from 'socket.io-client';
import Chart from '../components/Chart';
import RecentQuote from '../components/RecentQuote';
import AddSymbol from './AddSymbol';
import './StocksContainer.css';

const socket = io.connect('http://localhost:3001'); // TODO: Update localhost
const colors = ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'];

class StocksContainer extends Component {
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
        <Chart colors={colors} history={this.state.history} />
        <AddSymbol socket={socket} />
        <div className="flex-grid">
          {this.state.history.map((stock, index) =>
            <RecentQuote symbol={stock.symbol} name={stock.name} recent={stock.recent} color={colors[index]} key={index} />)
          }
        </div>
      </div>
    );
  }
}

export default StocksContainer;
