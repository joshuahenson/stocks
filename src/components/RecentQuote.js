import React, { PropTypes } from 'react';
import './RecentQuote.css';

const RecentQuote = ({ symbol, name, recent, color }) => {
  return (
    <div
      className="col"
      style={{
        border: `1px solid ${color}`,
        color
      }}
    >
      <div className="recent">
        <h4>{name} ({symbol})</h4>
        <ul>
          <li>Last: ${recent.lastPrice}</li>
          <li>Change: {recent.netChange} ({recent.percentChange})</li>
        </ul>
      </div>
    </div>
  );
};

RecentQuote.propTypes = {
  symbol: PropTypes.string,
  name: PropTypes.string,
  recent: PropTypes.object,
  color: PropTypes.string
};

export default RecentQuote;
