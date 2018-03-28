import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/InitPage.css';
import './RequestPage'
import FontAwesome from 'react-fontawesome'
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';

class InitPage extends Component {

    render() {
        return (
            <div className="App-main-init">
                <div>
                    <button className="submitArrowButton">
                        <Row>
                        <Col lg="9">
                        <Link to="/request">
                            <div className="impactText">SUBMIT REQUEST</div>
                        </Link>
                        </Col>
                        <Col md="3">
                        <FontAwesome name='angle-double-right' className="submitArrow"/>
                        </Col>
                        </Row>


                    </button>
                </div>
                <hr width={"40%"}/>
                <button className={"subButton"} ><Link to="/status">Check Status</Link></button>
            </div>
        );
    }
}

export default InitPage;




//                <button className="submitImage"><Link to="/request"></Link></button>
