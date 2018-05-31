import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';


class UpdateStatusModal extends Component {

    constructor(props) {
        super(props);

        this.statuses = ["rfiSubmitted", "checkingCollects", "verifyingRequest", "collectionSubmitted", "collectionCompleted", "creatingProduct", "uploadingProduct", "productCompleted"];
        this.humanReadableStatues = ["RFI Submitted", "Checking Collection", "Verifying Request", "Collection Requested", "Collection Completed", "Creating Product", "Uploading Product", "Product Completed"];

        this.state = {
            youSureCheckbox: false
        }
    }

    toggleYouSure() {
        this.setState({youSureCheckbox: !this.state.youSureCheckbox})
    }

    handleOk(goingToCollections) {

        if (goingToCollections && !this.state.youSureCheckbox)
            return null;

        //Update the modified times
        let newData = Object.assign(this.props.data);
        newData[this.props.data.state + "Timestamp"] = moment.utc().valueOf();
        newData.lastUpdated = moment.utc().valueOf();

        //If we're bypassing the collection steps, increment by 4
        if (this.props.data.state === 'checkingCollects' && !goingToCollections)
            newData.state = this.statuses[this.statuses.indexOf(this.props.data.state) + 4];
        else
            newData.state = this.statuses[this.statuses.indexOf(this.props.data.state) + 1];

        //Post the updated data (does not need id value because the object has _id value
        axios.post('http://localhost:8080/request_tracker/requests/', newData)
            .then(function (response) {
                //handle success
                console.log("Successfully updated data to API");

            })
            .catch(function (response) {
                //handle error
                console.log("Error when posting data to API");
                console.log(response);

                alert('ERROR while submitting. Tell Ben.');

            });

        this.props.onClick();

    }

    handleCancel() {
        this.props.onClick();
    }


    render() {

        if (this.props.data.state === 'checkingCollects') {
            return (
                <div>
                    Does this request need to go to Collections?
                    <br/><br/>
                    <b style={{color: "red"}}>*</b> <input type={"checkbox"} checked={this.state.youSureCheckbox}
                                                           onChange={this.toggleYouSure.bind(this)}/> Click here to
                    verify you want to make this change
                    <br/><br/>

                    <button onClick={this.handleOk.bind(this, true)}>Yes</button>
                    <button onClick={this.handleOk.bind(this, false)}>No</button>
                </div>)

        } else {
            return (
                <div>
                    Are you sure you want to change state to
                    <b> "{this.humanReadableStatues[this.statuses.indexOf(this.props.data.state) + 1]}"</b>
                    <br/><br/>
                    <button className="greenBtn" onClick={this.handleOk.bind(this, false)}>Yes</button>
                    <button className="greenBtn" onClick={this.handleCancel.bind(this)}>No</button>
                </div>)
        }

    }
}

export default UpdateStatusModal;