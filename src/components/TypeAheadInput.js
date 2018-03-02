import React from 'react';
import Select from 'react-select';
import '../styles/TypeAheadInput.css';
import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class TypeAheadInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange.bind(this);
        this.state = {
            selectedValue: '',
        }
    }

    handleChange(selectedValue) {
        console.log(`Selected: ${selectedValue}`);

        this.setState({selectedValue: selectedValue});
    }

    getValues(input) {

        console.log(input);

        // return {options: ["Ben", "Jesse", "Sam"]};
        if (!input) {
            return Promise.resolve({
                options: [
                    {value: 'ben', label: 'Ben'},
                    {value: 'jesse', label: 'Jesse'},
                    {value: 'sam', label: 'Sam'},
                    {value: 'lauren', label: 'Lauren'},
                ]
            });
        }

        //
        // return fetch(`https://api.github.com/search/users?q=${input}`)
        //     .then((response) => response.json())
        //     .then((json) => {
        //         return { options: json.items };
        //     });
    }

    render() {
        {/*<Select.AsyncCreatable*/
        }

        const _this = this;

        console.log(this.state.selectedValue);

        return (
            <div className="section">
                <Select.Creatable
                    id="state-select"
                    className="my-react-select"
                    // ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    // loadOptions={this.getValues}
                    options={[
                        {value: 'ben', label: 'Ben'},
                        {value: 'jesse', label: 'Jesse'},
                        {value: 'sam', label: 'Sam'},
                        {value: 'lauren', label: 'Lauren'},
                    ]}
                    autoFocus
                    simpleValue
                    clearable={true}
                    name="selected-state"
                    value={this.state.selectedValue}
                    onChange={this.handleChange.bind(this)}
                    searchable={true}
                    backspaceRemoves={true}
                    placeholder={"Start typing..."}
                    // placeholder={this.props.name}

                />
            </div>
        );
    }
}

export default TypeAheadInput