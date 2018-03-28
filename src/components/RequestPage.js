    import React, {Component} from 'react';
    import axios from 'axios';
    import moment from 'moment'
    import '../styles/RequestPage.css';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';
    import 'react-select/dist/react-select.css';
    import TypeAheadInput from "./TypeAheadInput";
    import FontAwesome from 'react-fontawesome'
    import { InputGroup } from 'react-bootstrap';
    import { Input } from 'reactstrap';
    import { InputGroupAddon } from 'reactstrap';
    import { InputGroupText } from 'reactstrap';
    import { Row } from 'reactstrap';
    import { Col } from 'reactstrap';
    import { Container } from 'reactstrap';
    import { Button } from 'reactstrap';
    import 'bootstrap/dist/css/bootstrap.min.css';


    var iconStyle = {
      border: 'none',
      color: 'white',
          backgroundColor: '#06ad78',
      width: '30px',
    };



class RequestPage extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.statuses = ["rfiSubmitted", "checkingCollects", "collectionSubmitted", "collectionCompleted", "creatingProduct", "uploadingProduct", "productCompleted", "verifyingRequest"];

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

    componentWillMount() {

        if (this.props.data) {
            this.setState({
                originator: this.props.data.originator,
                phone: this.props.data.phone,
                email: this.props.data.email,
                coverageStart: moment.utc(this.props.data.coverageStart),
                coverageEnd: moment.utc(this.props.data.coverageEnd),
                periodicity: this.props.data.periodicity,
                sensor: this.props.data.sensor,
                productRequired: this.props.data.productRequired,
                classification: this.props.data.classification,
                maxClassification: this.props.data.maxClassification,
                dueDate: moment.utc(this.props.data.dueDate),
                ltiov: moment.utc(this.props.data.ltiov),
                targetName: this.props.data.targetName,
                beNum: this.props.data.beNum,
                termNum: this.props.data.termNum,
                coords: this.props.data.coords,
                eei: this.props.data.eei,
                justification: this.props.data.justification
            })
        }
    }


    handleSubmit(event) {
        console.log("Submitting the form");

        let data = {};

        if (this.props.data) {
            data = Object.assign(this.props.data, this.state);
        } else {
            data = Object.assign({}, this.state);
        }

        const currTime = moment().utc();
        data.state = this.statuses[this.statuses.indexOf(data.state) + 1];
        data.lastUpdated = currTime.valueOf();
        data[data.state + "Timestamp"] = currTime.valueOf();
        data.reqId = currTime.format('MMM').substr(0, 1).toUpperCase() + currTime.format('dd').substr(0, 1).toUpperCase() + currTime.valueOf().toString().slice(-5);

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


        // this.props.resetAction();
    }


    handleInputChange(field, value) {

        //If value is null, assume we are working with a textarea
        if(field.target){
            this.setState({
                [field.target.name]: field.target.value
            });
        } else {
            this.setState({
                [field]: value
            });
        }
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
                        <Container className="containerStyle">
                            <Row>
                                <Col md="12">
                                    <label>Request Classification</label>
                                    <InputGroup className="input-group margin-bottom-sm">
                                        <InputGroupAddon className="input-group-addon">
                                          <i className="icon">//</i>
                                        </InputGroupAddon>
                                    <TypeAheadInput name="classification"

                                        value={this.state.classification}
                                        handleChange={this.handleInputChange}
                                        getOptionsFromApi={true}
                                        initialOptions={[]}/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                    <label >Name *</label>
                                    <InputGroup className="input-group margin-bottom-sm">
                                        <InputGroupAddon className="input-group-addon">
                                          <FontAwesome name="user-circle"></FontAwesome>
                                        </InputGroupAddon>
                                        <TypeAheadInput name="originator" value={this.state.originator}
                                                        handleChange={this.handleInputChange}
                                                        getOptionsFromApi={true}
                                                        initialOptions={[]}/>
                                    </InputGroup>
                                </Col>
                                <Col md="3">
                                    <label>Phone *</label>
                                    <InputGroup className="input-group margin-bottom-sm">
                                        <InputGroupAddon className="input-group-addon">
                                          <FontAwesome name="phone"></FontAwesome>
                                        </InputGroupAddon>
                                        <TypeAheadInput name="phone" value={this.state.phone}
                                                        handleChange={this.handleInputChange}
                                                        getOptionsFromApi={true}
                                                        initialOptions={[]} />
                                    </InputGroup>
                                </Col>
                                <Col md="6">
                                    <label>Email *</label>
                                    <InputGroup className="input-group margin-bottom-sm">
                                        <InputGroupAddon className="input-group-addon">
                                           <FontAwesome name="envelope"></FontAwesome>
                                        </InputGroupAddon>
                                        <TypeAheadInput name="email" value={this.state.phone}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={true}
                                            initialOptions={[]} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                    <label className="label_format">Coverage Start *</label>
                                    <InputGroup className="input-group margin-bottom-sm">
                                        <InputGroupAddon className="input-group-addon">
                                           <FontAwesome name="calendar"></FontAwesome>
                                        </InputGroupAddon>
                                        <DatePicker
                                            className={"Select-control datepickerStyle"}
                                            selected={_this.state.coverageStart}
                                            onChange={_this.dateChanged.bind(_this, "coverageStart")}
                                            showTimeSelect
                                            dateFormat="YYYY-MM-DDTHH:mm:ss"
                                            timeFormat="HHmm"
                                            timeIntervals={60}
                                            showYearDropdown
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md="3">
                                    <label className="label_format">Coverage End *</label>
                                    <InputGroup className="input-group margin-bottom-sm">
                                        <InputGroupAddon className="input-group-addon">
                                           <FontAwesome name="calendar"></FontAwesome>
                                        </InputGroupAddon>
                                        <DatePicker
                                            className={"Select-control datepickerStyle"}
                                            selected={_this.state.coverageEnd}
                                            onChange={_this.dateChanged.bind(_this, "coverageEnd")}
                                            showTimeSelect
                                            dateFormat="YYYY-MM-DDTHH:mm:ss"
                                            timeFormat="HHmm"
                                            timeIntervals={60}
                                            showYearDropdown
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md="6">
                                    <label className="label_format">Periodicity</label>
                                    <InputGroup className="input-group margin-bottom-sm">
                                        <InputGroupAddon className="input-group-addon">
                                           <FontAwesome name="calendar"></FontAwesome>
                                        </InputGroupAddon>
                                        <TypeAheadInput name="periodicity" value={this.state.periodicity}
                                            handleChange={this.handleInputChange}
                                            getOptionsFromApi={false}
                                            initialOptions={["Hourly", "Daily", "Weekly", "Bi-Weekly", "Monthly", "Yearly"]}/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                <label className="label_format">Due Date</label>
                                <InputGroup className="input-group margin-bottom-sm">
                                    <InputGroupAddon className="input-group-addon">
                                      <FontAwesome name="calendar"></FontAwesome>
                                    </InputGroupAddon>
                                    <DatePicker
                                        className={"Select-control"}
                                        selected={_this.state.dueDate}
                                        onChange={_this.dateChanged.bind(_this, "dueDate")}
                                        showTimeSelect
                                        dateFormat="YYYY-MM-DDTHH:mm:ss"
                                        timeFormat="HHmm"
                                        timeIntervals={60}
                                        showYearDropdown
                                    />
                                </InputGroup>
                                </Col>
                                <Col md="3">
                                <label className="label_format">LTIOV <span style={{fontSize: "7px"}}>(last date & time intel of value)</span></label>
                                <InputGroup className="input-group margin-bottom-sm">
                                    <InputGroupAddon className="input-group-addon">
                                      <FontAwesome name="calendar"></FontAwesome>
                                    </InputGroupAddon>
                                    <DatePicker
                                        className={"Select-control"}
                                        selected={_this.state.ltiov}
                                        onChange={_this.dateChanged.bind(_this, "ltiov")}
                                        showTimeSelect
                                        dateFormat="YYYY-MM-DDTHH:mm:ss"
                                        timeFormat="HHmm"
                                        timeIntervals={60}
                                        showYearDropdown
                                    />
                                </InputGroup>
                            </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <label className="label_format">Desired Sensor</label>
                                    <InputGroup className="input-group margin-bottom-sm">
                                        <InputGroupAddon className="input-group-addon">
                                           <FontAwesome name="star"></FontAwesome>
                                        </InputGroupAddon>
                                            <TypeAheadInput name="sensor" value={this.state.sensor}
                                                handleChange={this.handleInputChange}
                                                getOptionsFromApi={true}
                                                initialOptions={["Cannon", "Nikon", "Pixel"]}/>
                                    </InputGroup>
                                </Col>
                                <Col md="4">
                                    <label className="label_format">Final Product Classification</label>
                                    <InputGroup className="input-group margin-bottom-sm">
                                        <InputGroupAddon className="input-group-addon">
                                          <i className="icon">//</i>
                                        </InputGroupAddon>
                                        <TypeAheadInput name="maxClassification" value={this.state.maxClassification}
                                                        handleChange={this.handleInputChange}
                                                        getOptionsFromApi={true}
                                                        initialOptions={[]}/>
                                    </InputGroup>
                                </Col>
                                <Col md="4">
                                    <Row>
                                    <Col md="12">
                                    <label className="label_format">Imagery Product Required</label>
                                    </Col>
                                    <Col md="12">
                                        <input name="productRequired" type="checkbox"
                                               value={this.state.productRequired}
                                               onChange={this.handleInputChange}/>
                                    </Col>
                                    </Row>
                                </Col>
                        </Row>

                        <Row>
                        <Col md="4">
                            <label className="label_format">Target Name</label>
                            <InputGroup className="input-group margin-bottom-sm">
                                <InputGroupAddon className="input-group-addon">
                                  <FontAwesome name="crosshairs"></FontAwesome>
                                </InputGroupAddon>
                                <TypeAheadInput name="targetName" value={this.state.targetName}
                                                handleChange={this.handleInputChange}
                                                getOptionsFromApi={true}
                                                initialOptions={[]}/>
                            </InputGroup>
                        </Col>
                        <Col md="4">
                            <label className="label_format">BE #</label>
                            <InputGroup className="input-group margin-bottom-sm">
                                <InputGroupAddon className="input-group-addon">
                                  <FontAwesome name="hashtag"></FontAwesome>
                                </InputGroupAddon>
                                <TypeAheadInput name="beNum" value={this.state.beNum}
                                                handleChange={this.handleInputChange}
                                                getOptionsFromApi={true}
                                                initialOptions={[]}/>
                            </InputGroup>
                        </Col>
                        <Col md="4">
                            <label className="label_format">Terminator #</label>
                            <InputGroup className="input-group margin-bottom-sm">
                                <InputGroupAddon className="input-group-addon">
                                  <FontAwesome name="hashtag"></FontAwesome>
                                </InputGroupAddon>
                                <TypeAheadInput name="termNum" value={this.state.termNum}
                                    handleChange={this.handleInputChange}
                                    getOptionsFromApi={true}
                                    initialOptions={[]}/>
                            </InputGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col md="6">
                            <label className="label_format">Geocoords or MGRS</label>
                            <InputGroup className="input-group margin-bottom-sm">
                                <InputGroupAddon className="input-group-addon">
                                  <FontAwesome name="globe"></FontAwesome>
                                </InputGroupAddon>
                                <TypeAheadInput name="coords" value={this.state.coords}
                                                handleChange={this.handleInputChange}
                                                getOptionsFromApi={true}
                                                initialOptions={[]}/>
                            </InputGroup>
                        </Col>
                        <Col md="6">
                            <label className="label_format">EEI</label>
                            <InputGroup className="input-group margin-bottom-sm">
                                <InputGroupAddon className="input-group-addon">
                                  <FontAwesome name="map-marker"></FontAwesome>
                                </InputGroupAddon>
                                <TypeAheadInput name="eei" value={this.state.eei}
                                                handleChange={this.handleInputChange}
                                                getOptionsFromApi={true}
                                                initialOptions={[]}/>
                            </InputGroup>
                        </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                            <label className="label_format">Justification</label>
                            </Col>
                            <Col md="12">
                                <textarea className={"textArea"} name="justification" type="string"
                                          value={this.state.justification}
                                          onChange={this.handleInputChange}/>
                            </Col>
                        </Row>



                        <br/>
                        <Col md="12">
                        <Button block size="lg" type="submit" value="Submit" className="greenButton">Submit</Button>
                        </Col>
                        </Container>
                    </form>
                </div>
            </div>
        );
    }
}

export default RequestPage;
