import React, { PropTypes } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

// TODO: Selector to select different timeframes other than just one year?
const Chart = ({ history, colors }) => {
  let ticks = [];
  if (history.length > 0) {
    const len = history[0].days.length;
    ticks = [
      history[0].days[0].tradingDay,
      history[0].days[Math.floor(len / 3)].tradingDay,
      history[0].days[Math.floor(len * 2 / 3)].tradingDay, // eslint-disable-line no-mixed-operators
      history[0].days[len - 1].tradingDay
    ];
  }
  return (
    <div>
      <VictoryChart>
        <VictoryAxis
          offsetY={50}
          fixLabelOverlap
          tickValues={ticks}
        />
        <VictoryAxis
          tickFormat={x => (`${Math.floor(x * 100)}%`)}
          dependentAxis
        />
        {history.map((stock, index) =>
          <VictoryLine
            key={index}
            data={stock.days.map(day => ({ x: day.tradingDay, y: (day.close - stock.days[0].close) / stock.days[0].close }))}
            style={{
              data: {
                stroke: colors[index],
                strokeWidth: 2
              }
            }}
          />
        )}
      </VictoryChart>
    </div>
  );
};

Chart.propTypes = {
  colors: PropTypes.array,
  history: PropTypes.array
};

export default Chart;
