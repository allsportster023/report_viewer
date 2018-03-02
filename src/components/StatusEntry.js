import React, { Component } from 'react';
import '../styles/StatusEntry.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class StatusPage extends Component {
    render() {

        console.log(this.props.data);

        return (
            <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
            </tr>
        );
    }
}

export default StatusPage;
