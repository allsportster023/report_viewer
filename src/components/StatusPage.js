import React, {Component} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import '../styles/StatusPage.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class StatusPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {

        const _this = this;

        axios.get('http://localhost:8080/request_tracker/requests/')
            .then(function (response) {
                //handle success
                console.log("Successfully pulled records from API");

                _this.setState({data: response.data._embedded});

            })
            .catch(function (response) {
                //handle error
                console.log("Error when pulling records from API");
                console.log(response);

            });
    }

    render() {

        const columns = [
            {
                dataField: 'reqId',
                text: 'Request ID',
                sort: true
            }, {
                dataField: 'originator',
                text: 'Requested By',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'beNum',
                text: 'BE Number',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'termNum',
                text: 'Terminator Number',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'eei',
                text: 'EEI',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'coverageStart',
                text: 'Coverage Start',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'coverageEnd',
                text: 'Coverage End',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'state',
                text: 'Status',
                filter: textFilter(),
                sort: true
            }];

        return (
            <div id={"statusPageTable"}>
                <BootstrapTable keyField='reqId' data={this.state.data} columns={columns}
                                noDataIndication="Table is Empty"
                                filter={filterFactory()} hover/>
            </div>);
    }
}

export default StatusPage;
