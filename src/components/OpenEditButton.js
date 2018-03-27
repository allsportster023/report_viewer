import React, {Component} from 'react';
import ReactModal from 'react-modal';

import EditEntryPage from './EditEntryPage';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// const customStyles = {
//     content : {
//         width : '85vw',
//         height: '85vh',
//         marginRight: 'auto',
//         marginLeft: 'auto',
//         minHeight: '10em'
//     }
// };

class OpenEditButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedRow: null,
            showModal: false
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.changeModalState = this.changeModalState.bind(this);

    }

    changeModalState() {
        this.setState({showModal: !this.state.showModal})
    }

    handleCloseModal() {
        this.setState({showModal: false})
    }

    setSelected() {

        console.log(this.props.row);

        this.changeModalState();

    }


    render() {

        return (
            <div>
                <button onClick={this.setSelected.bind(this)}> Edit </button>
                <ReactModal isOpen={this.state.showModal} ariaHideApp={false}>
                    <button onClick={this.changeModalState}>Close</button>

                    <EditEntryPage data={this.props.row}/>
                </ReactModal>
            </div>

        );
    }
}

export default OpenEditButton;