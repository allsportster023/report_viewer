    import React, {Component} from 'react';
    import axios from 'axios';
    import moment from 'moment'
    import '../styles/RequestPage.css';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';

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
            originator: "Ben",
            phone: "603-520-2799",
            email: "thatguy@gmail.com",
            coverageStart: moment.utc().startOf('day'),
            coverageEnd: moment.utc().startOf('day'),
            periodicity: "daily",
            sensor: "Cannon",
            productRequired: true,
            classification: "Unclassified",
            dueDate: moment.utc().startOf('day'),
            ltiov: moment.utc().startOf('day'),
            targetName: "rabbits",
            beNum: "RBT1234",
            termNum: "TRN1234",
            coords: "DENVER",
            eei: "tunneling",
            justification: "I want this because the dumb rabbits keep getting into the garden and I need to figure out where they are coming from"


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


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(name);
        console.log(value);

        this.setState({
            [name]: value
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
                        <label>
                            Name *
                            <input className={"textInput"} name="originator" type="input" value={this.state.originator}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Phone *
                            <input className={"textInput"} name="phone" type="input" value={this.state.phone}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Email *
                            <input className={"textInput"} name="email" type="input" value={this.state.email}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Coverage Start *
                            <DatePicker
                                className={"textInput"}
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
                        <label>
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
                        <label>
                            Periodicity
                            <input className={"textInput"} name="periodicity" type="input" value={this.state.periodicity}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Desired Sensor
                            <input className={"textInput"} name="sensor" type="string" value={this.state.sensor}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Imagery Product Required
                            <input className={"textInput"} name="productRequired" type="string"
                                   value={this.state.productRequired}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Classification
                            <input className={"textInput"} name="classification" type="string" value={this.state.classification}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
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
                        <label>
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
                        <label>
                            Target Name
                            <input className={"textInput"} name="targetName" type="string" value={this.state.targetName}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            BE #
                            <input className={"textInput"} name="beNum" type="string" value={this.state.beNum}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Terminator #
                            <input className={"textInput"} name="termNum" type="string" value={this.state.termNum}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Geocoords or MGRS
                            <input className={"textInput"} name="coords" type="string" value={this.state.coords}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            EEI
                            <input className={"textInput"} name="eei" type="string" value={this.state.eei}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Justification
                            <textarea className={"textArea"} name="justification" type="string" value={this.state.justification}
                                      onChange={this.handleInputChange}/>
                        </label>
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
