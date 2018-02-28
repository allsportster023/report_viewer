import React, { Component } from 'react';
import './AppMain.css';
import './RequestPage'
import RequestPage from "./RequestPage";
import StatusPage from "./StatusPage";

class AppMain extends Component {

    constructor(props) {
        super(props);

        //Modes: init, request, status

        this.state = {
            mode: "init"
        }
    }

    showInit(){
        return (
            <div className="App-main">
                <button className={"mainButton"} onClick={this.onNewRequest.bind(this)}>New Request</button>
                <hr width={"40%"}/>
                <button className={"mainButton"} onClick={this.onCheckStatus.bind(this)}>Check Status</button>
            </div>
        );
    }

    showRequestPage() {
        return (<RequestPage resetAction={this.onReset.bind(this)}/>);
    }

    showStatusPage() {
        return (<StatusPage/>);
    }

    onReset() {
        console.log("New Request");
        this.setState({ mode: "init"});
    }

    onNewRequest() {
        console.log("New Request");
        this.setState({ mode: "request"});
    }

    onCheckStatus() {
        console.log("Check Status");
        this.setState({ mode: "status"});
    }

    render() {
        if(this.state.mode === "init") {
            return this.showInit();
        } if (this.state.mode === "request") {
            return this.showRequestPage();
        } if (this.state.mode === "status") {
            return this.showStatusPage();
        }
    }
}

export default AppMain;
