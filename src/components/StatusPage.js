import React, { Component } from 'react';
import axios from 'axios';
import StatusEntry from './StatusEntry';
import '../styles/StatusPage.css';

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

        return (
            <div className="StatusPage-main">

                {this.state.data.map(function (d, i) {
                    return (<StatusEntry key={i} data={d} />)
                })}
            </div>
        );
    }
}

export default StatusPage;
