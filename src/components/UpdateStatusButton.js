import React, {Component} from 'react';
import ReactModal from 'react-modal';
import '../styles/UpdateStatusButton.css';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateStatusModal from "./UpdateStatusModal";

const customStyles = {
    content : {
        width : '300px',
        height: '300px',
        marginRight: 'auto',
        marginLeft: 'auto',
        minHeight: '10em'
    }
};

class UpdateStatusButton extends Component {

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
        this.changeModalState();
    }

    render() {

        if (this.props.row.state !== 'productCompleted') {
            return (
                <div>
                    <button style={{
                        backgroundColor: "#06ad78",
                        color: "white",
                        border: "none",
                        borderRadius: "3px"
                        }}
                        onClick={this.setSelected.bind(this)}>
                        <p style={{fontSize: "1em"}}>
                            Promote
                        </p>
                        <p style={{
                            fontSize: "12px",
                            lineHeight: "0px"}}>
                            to next step
                        </p>
                    </button>
                    <ReactModal className="modalStyle" isOpen={this.state.showModal} ariaHideApp={false} style={customStyles}>

                        <UpdateStatusModal onClick={this.changeModalState} data={this.props.row}/>
                    </ReactModal>
                </div>

            );
        } else {
            return (
                <div>
                    <b>Completed</b>
                </div>
            )
        }
    }
}

export default UpdateStatusButton;