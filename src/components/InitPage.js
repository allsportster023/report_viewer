import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/InitPage.css';
import './RequestPage'
import RequestPage from "./RequestPage";
import StatusPage from "./StatusPage";

class InitPage extends Component {

    render() {
        return (
            <div className="App-main">
                <button className={"mainButton"} ><Link to="/request">Submit Request</Link></button>
                <hr width={"40%"}/>
                <button className={"mainButton"} ><Link to="/status">Check Status</Link></button>
            </div>
        );
    }
}

export default InitPage;