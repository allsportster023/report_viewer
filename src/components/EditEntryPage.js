import React, {Component} from 'react';
import RequestPage from './RequestPage';

class EditEntryPage extends Component {

    render() {

        return (<div><RequestPage data={this.props.data} /></div>)

    }
}

export default EditEntryPage;