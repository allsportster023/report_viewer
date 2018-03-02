import React, {Component} from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import RequestPage from "./RequestPage";
import StatusPage from "./StatusPage";
import InitPage from "./InitPage";

class AppMain extends Component {

    render() {
        return (
            <Router>
            <div className={"appMain"}>
                <Route exact path="/" component={InitPage}/>
                <Route path="/status" component={StatusPage}/>
                <Route path="/request" component={RequestPage}/>
            </div>
        </Router>)
    }
}

export default AppMain;
