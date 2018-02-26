import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment'
import './RequestPage.css';

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

        this.state = {
            name: "Ben",
            org: "Edge",
            location: "Denver",
            type: "Page",
            justification: "Just because I want to when I want to. No other reason. Thank you."

        }
    }

    handleSubmit(event) {
        console.log("Submitting the form");

        let data = Object.assign({}, this.state);


        data.create_timestamp = moment().utc().valueOf();
        data.state = "Submitted";
        data.last_updated_time = data.create_timestamp.valueOf();


        console.log(data);

        alert('Successfully submitted the request. Please check back later to check the status');
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

    render() {
        return (
            <div className="RequestPage-main">
                {/*<span className="fake-link" onClick={this.props.resetAction()}>Go back</span>*/}
                Please fill in all required fields and submit
                <div className={"requestContainer"}>
                    <form id={"requestForm"} onSubmit={this.handleSubmit}>
                        <label>
                            Name *
                            <input name="name" type="input" value={this.state.name}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Org *
                            <input name="org" type="string" value={this.state.org}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Location *
                            <input name="location" type="string" value={this.state.location}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Type *
                            <input name="type" type="string" value={this.state.type}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <label>
                            Justification *
                            <textarea name={"justification"} value={this.state.justification}
                                   onChange={this.handleInputChange}/>
                        </label>
                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default RequestPage;
