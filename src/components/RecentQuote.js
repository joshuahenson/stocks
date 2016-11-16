import React, { PropTypes } from 'react';
import './RecentQuote.css';

const RecentQuote = ({ symbol, name, recent, color, socket }) => {
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
  color: PropTypes.string,
  socket: PropTypes.object
};

export default RecentQuote;
