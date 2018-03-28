import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../styles/TypeAheadInput.css';
import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class TypeAheadInput extends React.Component {

    constructor(props) {
        super(props);

        const initialFormattedOptions = this.props.initialOptions.map(function (d) {
            return {value: d, label: d};
        });

        this.handleChange.bind(this);
        this.state = {
            options: initialFormattedOptions,
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps !== this.props) {
            console.log("Props changed");
            console.log(nextProps);
            console.log(this.props);

            this.props = nextProps;

        }
        if (nextState !== this.state) {
            console.log("State changed");
            console.log(nextState);
            console.log(this.state);

        }
    }

    componentDidMount() {

        const aggregationUrl = 'http://localhost:8080/request_tracker/requests/_aggrs/' + this.props.name + 'Agg';

        const _this = this;

        console.log(aggregationUrl);

        if (this.props.getOptionsFromApi) {

            axios.get(aggregationUrl)
                .then(function (response) {
                    //handle success
                    // console.log("Successfully pulled aggregation");

                    const uniqueValues = response.data._embedded.map(function (d) {
                        return {value: d._id, label: d._id};
                    });

                    // console.log(uniqueValues.length);

                    _this.setState({options: _this.state.options.concat(uniqueValues)});

                })
                .catch(function (response) {
                    //handle error
                    console.log("Error when posting data to API");
                    console.log(response);

                    // alert('ERROR while submitting. Tell Ben.');

                });
        }
    }

    handleChange(selectedValue) {
        console.log(`Selected: ${selectedValue}`);

        // this.setState({selectedValue: selectedValue});

        this.props.handleChange(this.props.name, selectedValue);
    }

    render() {

        // console.log("Rendering selected:");
        // console.log(this.props.value);

        return (
            <div className="section">
                <Select.Creatable
                    placeholder={"Start typing..."}
                    name={this.props.value + "Input"}
                    simpleValue
                    options={this.state.options}
                    value={this.props.value}
                    onChange={this.handleChange.bind(this)}
                    searchable={true}
                    backspaceRemoves={true}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                />
            </div>
        );

    }
}

export default TypeAheadInput