import React, { Component } from 'react';
import './StatusEntry.css';

class StatusPage extends Component {
    render() {
        return (
            <div className="StatusEntry-main">
                {this.props.data._id.$oid}
            </div>
        );
    }
}

export default StatusPage;
