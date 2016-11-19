import React, { PropTypes } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

// TODO: Selector to select different timeframes other than just one year?
const Chart = ({ history, colors }) => {
  return (
    <div>
      <VictoryChart>
        <VictoryAxis
          offsetY={50}
          fixLabelOverlap
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
