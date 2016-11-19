import React, { Component } from 'react';
import './Info.css';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }
  render() {
    const { modal } = this.state;
    return (
      <div>
        <button type="button" className="info-icon" onClick={this.toggleModal}>
        i
        </button>
        <div className="modal" style={modal ? { visibility: 'visible', opacity: 1 } : { visibility: 'hidden', opacity: 0 }}>
          <button className="close" onClick={this.toggleModal} />
          <p>A sample React app using Websockets to communicate with the server and share among all
          clients given the following user stories.
          </p>
          <ul>
            <li>User Story: I can view a graph displaying the recent trend lines for each added stock.</li>
            <li>User Story: I can add new stocks by their symbol name.</li>
            <li>User Story: I can remove stocks.</li>
            <li>User Story: I can see changes in real-time when any other user adds or removes a stock.</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Info;
