import React, { PropTypes } from 'react';
import './RecentQuote.css';

const RecentQuote = ({ symbol, name, recent, color, socket, change }) => {
  const yearAbsolute = (change[1] - change[0]).toFixed(2);
  const yearPercent = ((yearAbsolute / change[0]) * 100).toFixed(2);
  return (
    <div
      className="col"
      style={{
        border: `1px solid ${color}`,
        color
      }}
    >
      <button className="close" onClick={() => socket.emit('client delete symbol', { symbol })} />
      <div className="recent">
        <h4>{name} ({symbol})</h4>
        <ul>
          <li>Price: ${recent.lastPrice}</li>
          <li>Day: {recent.netChange} ({recent.percentChange})</li>
          <li>Year: {yearAbsolute} ({yearPercent}%)</li>
        </ul>
      </div>
    </div>
  );
};

RecentQuote.propTypes = {
  symbol: PropTypes.string,
  name: PropTypes.string,
  recent: PropTypes.object,
  color: PropTypes.string,
  socket: PropTypes.object,
  change: PropTypes.array
};

export default RecentQuote;
