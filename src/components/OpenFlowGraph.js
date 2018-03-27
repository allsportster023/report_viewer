import React, {Component} from 'react';
import Modal from 'react-modal';
import FlowDiagram from './FlowDiagram';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/OpenFlowGraph.css';

const customStyles = {
    content : {
        width : '85vw',
        height: '50vh',
        marginRight: 'auto',
        marginLeft: 'auto',
        minHeight: '10em',
        textAlign: 'right'
    }
};

class OpenFlowGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedRow: null,
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.changeModalState = this.changeModalState.bind(this);

    }

    changeModalState() {
        this.setState({showModal: !this.state.showModal})
    }

    handleOpenModal() {
        this.setState({showModal: true})
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
            <div onClick={this.state.showModal ? this.handleCloseModal : null}>
                <button onClick={this.setSelected.bind(this)}> View Graph </button>
                <Modal isOpen={this.state.showModal} style={customStyles} ariaHideApp={false} >
                    (Click anywhere to close)
                    <FlowDiagram data={this.props.row}/>
                </Modal>
            </div>
        );
    }
}

export default OpenFlowGraph;