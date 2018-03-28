import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import '../styles/StatusPage.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import OpenEditButton from './OpenEditButton';
import OpenFlowGraph from "./OpenFlowGraph";
import UpdateStatusButton from "./UpdateStatusButton";

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

    updateStatusFormatter(cell, row) {

        return (<UpdateStatusButton row={row}/>);

    }

    buttonFormatter(cell, row) {

        return (<OpenEditButton row={row}/>);

    }

    graphFormatter(cell, row) {

        return (
            <OpenFlowGraph row={row}/>
        );
    }

    dateFormatter(cell, row) {

        return (
            moment(cell).format("YYYY-MM-DD")
        );
    }


    statusFormatter(cell, row) {

        const statuses = ["rfiSubmitted", "checkingCollects", "verifyingRequest", "collectionSubmitted", "collectionCompleted", "creatingProduct", "uploadingProduct", "productCompleted"];
        const humanReadableStatues = ["RFI Submitted", "Checking Collection", "Verifying Request", "Collection Requested", "Collection Completed", "Creating Product", "Uploading Product", "Product Completed"];

        const statusValue = statuses.indexOf(cell);

        if (statusValue >= 0)
            return ( <span>{humanReadableStatues[statusValue]}</span> );
        else
            return ( <span><strong style={{color: 'red'}}>Unknown Status: {cell}</strong></span> );

    }

    render() {

        const columns = [
            {
                dataField: 'reqId',
                text: 'Request ID',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'originator',
                text: 'Requestor',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'beNum',
                text: 'BE Number',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'termNum',
                text: 'Terminator',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'eei',
                text: 'EEI',
                filter: textFilter(),
                sort: true
            }, {
                dataField: 'coverageStart',
                text: 'Start',
                filter: textFilter(),
                sort: true,
                formatter: this.dateFormatter
            }, {
                dataField: 'coverageEnd',
                text: 'End',
                filter: textFilter(),
                sort: true,
                formatter: this.dateFormatter
            }, {
                dataField: 'state',
                text: 'Status',
                filter: textFilter(),
                sort: true,
                formatter: this.statusFormatter
            }, {
                dataField: 'updateStatusButtons',
                text: ' ',

                formatter: this.updateStatusFormatter
            }, {
                dataField: 'editButton',
                text: ' ',
                formatter: this.buttonFormatter
            }, {
                dataField: 'graphButton',
                text: ' ',
                formatter: this.graphFormatter
            }];

        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#00BFFF'
        };

        return (
            <div className={"statusPageTable"}>
                <BootstrapTable keyField='reqId' data={this.state.data} columns={columns}
                                noDataIndication="Table is Empty" selectRow={selectRow}
                                filter={filterFactory()} hover deleteRow/>
            </div>);
    }
}

export default StatusPage;
