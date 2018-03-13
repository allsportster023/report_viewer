import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment'
import '../styles/RequestPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import TypeAheadInput from "./TypeAheadInput";

class RequestPage extends Component {

    //TODO Data will look like this:
    /*
    {
        uuid: ObjectId,
        requestor_name: String,
        requestor_org: String,
        requestor_phone: String,

        request_timestamp: Long,
        last_updated_name: String
        last_updated_timestamp: Long,

        status: String?, [Created, Viewed, Modified]
    }
    */


    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.dateChanged = this.dateChanged(this);

        this.state = {
            originator: "",
            phone: "",
            email: "",
            coverageStart: moment.utc().startOf('day'),
            coverageEnd: moment.utc().startOf('day'),
            periodicity: "",
            sensor: "",
            productRequired: true,
            classification: "",
            maxClassification: "",
            dueDate: moment.utc().startOf('day'),
            ltiov: moment.utc().startOf('day'),
            targetName: "",
            beNum: "",
            termNum: "",
            coords: "",
            eei: "",
            justification: ""

        }
    }


    handleSubmit(event) {
        console.log("Submitting the form");

        let data = Object.assign({}, this.state);


        data.create_timestamp = moment().utc().valueOf();
        data.state = "Submitted";
        data.last_updated_time = data.create_timestamp.valueOf();

        console.log(data);

        axios.post('http://localhost:8080/request_tracker/requests/', data)
            .then(function (response) {
                //handle success
                console.log("Successfully posted data to API");
                console.log(data);

                alert('Successfully submitted the request. Please check back later to check the status');

            })
            .catch(function (response) {
                //handle error
                console.log("Error when posting data to API");
                console.log(response);

                alert('ERROR while submitting. Tell Ben.');

            });

        event.preventDefault();


        this.props.resetAction();
    }


    handleInputChange(field, value) {

        console.log(field + ": " + value);

        this.setState({
            [field]: value
        });
    }

    dateChanged(field, date) {
        this.setState({
            [field]: date
        });

    }

    render() {
        const _this = this;

        return (
            <div className="RequestPage-main">
                {/*<span className="fake-link" onClick={this.props.resetAction()}>Go back</span>*/}
                Please fill in all required fields and submit
                <div className={"requestContainer"}>
                    <form id={"requestForm"} onSubmit={this.handleSubmit}>
                        <label className="label_format">
                            Request Classification
                            <TypeAheadInput name="classification" value={this.state.classification}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>

                        </label>
                        <br/>

                        <label className="label_format">
                            Name *
                            <TypeAheadInput name="originator" value={this.state.originator}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>

                            {/*<input className={"textInput"} name="originator" type="input" value={this.state.originator}*/}
                            {/*onChange={this.handleInputChange}/>*/}
                        </label>
                        <br/>
                        <label className="label_format">
                            Phone *
                            <TypeAheadInput name="phone" value={this.state.phone}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>

                        </label>
                        <br/>
                        <label className="label_format">
                            Email *
                            <TypeAheadInput name="email" value={this.state.email}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>
                        </label>
                        <br/>
                        <label className="label_format">
                            Coverage Start *
                            <DatePicker
                                className={"textInput Select-control"}
                                selected={_this.state.coverageStart}
                                onChange={_this.dateChanged.bind(_this, "coverageStart")}
                                showTimeSelect
                                dateFormat="YYYY-MM-DDTHH:mm:ss"
                                timeFormat="HHmm"
                                timeIntervals={60}
                                showYearDropdown
                            />
                        </label>
                        <br/>
                        <label className="label_format">
                            Coverage End *
                            <DatePicker
                                className={"textInput"}
                                selected={_this.state.coverageEnd}
                                onChange={_this.dateChanged.bind(_this, "coverageEnd")}
                                showTimeSelect
                                dateFormat="YYYY-MM-DDTHH:mm:ss"
                                timeFormat="HHmm"
                                timeIntervals={60}
                                showYearDropdown
                            />
                        </label>
                        <br/>
                        <label className="label_format">
                            Periodicity
                            <TypeAheadInput name="periodicity" value={this.state.periodicity}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={false}
                                            initialOptions={["Hourly", "Daily", "Weekly", "Bi-Weekly", "Monthly", "Yearly"]}/>
                        </label>
                        <br/>
                        <label className="label_format">
                            Desired Sensor
                            <TypeAheadInput name="sensor" value={this.state.sensor}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={["Cannon", "Nikon", "Pixel"]}/>
                        </label>
                        <br/>
                        <label className="label_format">
                            Imagery Product Required
                            <input className={"textInput"} name="productRequired" type="checkbox"
                                   value={this.state.productRequired}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label className="label_format">
                            Final Product Classification
                            <TypeAheadInput name="maxClassification" value={this.state.maxClassification}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>

                        </label>
                        <br/>
                        <label className="label_format">
                            Due Date
                            <DatePicker
                                className={"textInput"}
                                selected={_this.state.dueDate}
                                onChange={_this.dateChanged.bind(_this, "dueDate")}
                                showTimeSelect
                                dateFormat="YYYY-MM-DDTHH:mm:ss"
                                timeFormat="HHmm"
                                timeIntervals={60}
                                showYearDropdown
                            />
                        </label>
                        <br/>
                        <label className="label_format">
                            LTIOV <span style={{fontSize: "7px"}}>(last date & time intel of value)</span>
                            <DatePicker
                                className={"textInput"}
                                selected={_this.state.ltiov}
                                onChange={_this.dateChanged.bind(_this, "ltiov")}
                                showTimeSelect
                                dateFormat="YYYY-MM-DDTHH:mm:ss"
                                timeFormat="HHmm"
                                timeIntervals={60}
                                showYearDropdown
                            />
                        </label>
                        <br/>
                        <label className="label_format">
                            Target Name
                            <TypeAheadInput name="targetName" value={this.state.targetName}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>
                        </label>
                        <br/>
                        <label className="label_format">
                            BE #
                            <TypeAheadInput name="beNum" value={this.state.beNum}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>
                        </label>
                        <br/>
                        <label className="label_format">
                            Terminator #
                            <TypeAheadInput name="termNum" value={this.state.termNum}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>

                        </label>
                        <br/>
                        <label className="label_format">
                            Geocoords or MGRS
                            <TypeAheadInput name="coords" value={this.state.coords}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>
                        </label>
                        <br/>
                        <label className="label_format">
                            EEI
                            <TypeAheadInput name="eei" value={this.state.eei}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]}/>
                        </label>
                        <br/>
                        <div>
                            Justification
                            <textarea className={"textArea"} name="justification" type="string"
                                      value={this.state.justification}
                                      onChange={this.handleInputChange}/>
                        </div>
                        <br/>
                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default RequestPage;
