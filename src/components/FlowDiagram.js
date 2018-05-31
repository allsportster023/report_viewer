import {DiagramEngine, DiagramModel, DefaultNodeModel, DiagramWidget} from "storm-react-diagrams";
import React, {Component} from 'react';
import '../styles/FlowDiagram.css';

class FlowDiagram extends Component {

    render() {

        console.log(this.props.data);
        //1) setup the diagram engine
        let engine = new DiagramEngine();
        engine.installDefaultFactories();

        //2) setup the diagram model
        let model = new DiagramModel();

        //Main Run
        //rfiSubmitted
        let rfiNodeColor = this.props.data.rfiSubmittedTimestamp ? "rgb(0,192,255)" : "rgb(160,160,160)";
        if (this.props.data.state === 'rfiSubmitted')
            rfiNodeColor = 'rgb(192,255,0)';

        let rfiNode = new DefaultNodeModel("RFI Submitted", rfiNodeColor);
        let rfiOutPort = rfiNode.addOutPort(" ");
        rfiNode.setPosition(50, 150);

        //Main Run
        //checkingCollects
        let checkingCollectsNodeColor = this.props.data.checkingCollectsTimestamp ? "rgb(0,192,255)" : "rgb(160,160,160)";
        if (this.props.data.state === 'checkingCollects')
            checkingCollectsNodeColor = 'rgb(192,255,0)';

        let checkingCollectsNode = new DefaultNodeModel("Checking Collects", checkingCollectsNodeColor);
        let checkingCollectsInPort = checkingCollectsNode.addInPort(" ");
        let checkingCollectsOutPort = checkingCollectsNode.addOutPort(" ");
        checkingCollectsNode.setPosition(200, 150);

        //ISE Run
        //creatingProduct
        let creatingProductNodeColor = this.props.data.creatingProductTimestamp ? "rgb(0,192,255)" : "rgb(160,160,160)";
        if (this.props.data.state === 'creatingProduct')
            creatingProductNodeColor = 'rgb(192,255,0)';

        let creatingProductNode = new DefaultNodeModel("Creating Product", creatingProductNodeColor);
        let creatingProductInNode = creatingProductNode.addInPort(" ");
        let creatingProductOutNode = creatingProductNode.addOutPort(" ");
        creatingProductNode.setPosition(820, 150);

        //ISE Run
        //uploadingProduct
        let uploadingProductNodeColor = this.props.data.uploadingProductTimestamp ? "rgb(0,192,255)" : "rgb(160,160,160)";
        if (this.props.data.state === 'uploadingProduct')
            uploadingProductNodeColor = 'rgb(192,255,0)';

        let uploadingProductNode = new DefaultNodeModel("Uploading Product", uploadingProductNodeColor);
        let uploadingProductInPort = uploadingProductNode.addInPort(" ");
        let uploadingProductOutPort = uploadingProductNode.addOutPort(" ");
        uploadingProductNode.setPosition(970, 150);

        //ISE Run
        //productCompleted
        let productCompletedNodeColor = this.props.data.productCompletedTimestamp ? "rgb(0,192,255)" : "rgb(160,160,160)";
        if (this.props.data.state === 'productCompleted')
            productCompletedNodeColor = 'rgb(192,255,0)';

        let productCompletedNode = new DefaultNodeModel("Product Completed", productCompletedNodeColor);
        let productCompletedInPort = productCompletedNode.addInPort(" ");
        // let productCompletedOutPort = productCompletedNode.addOutPort(" ");
        productCompletedNode.setPosition(1120, 150);

        //Collection Run
        //verifyingRequest
        let verifyingRequestNodeColor = this.props.data.verifyingRequestTimestamp ? "rgb(255,0,0)" : "rgb(210,160,160)";
        if (this.props.data.state === 'verifyingRequest')
            verifyingRequestNodeColor = 'rgb(192,255,0)';

        let verifyingRequestNode = new DefaultNodeModel("Verifying Request", verifyingRequestNodeColor);
        let verifyingRequestInPort = verifyingRequestNode.addInPort(" ");
        let verifyingRequestOutPort = verifyingRequestNode.addOutPort(" ");
        verifyingRequestNode.setPosition(350, 220);

        //Collection Run
        //collectionSubmitted
        let collectionSubmittedNodeColor = this.props.data.collectionSubmittedTimestamp ? "rgb(255,0,0)" : "rgb(210,160,160)";
        if (this.props.data.state === 'collectionSubmitted')
            collectionSubmittedNodeColor = 'rgb(192,255,0)';

        let collectionSubmittedNode = new DefaultNodeModel("Collection Submitted", collectionSubmittedNodeColor);
        let collectionSubmittedInPort = collectionSubmittedNode.addInPort(" ");
        let collectionSubmittedOutPort = collectionSubmittedNode.addOutPort(" ");
        collectionSubmittedNode.setPosition(500, 220);

        //Collection Run
        //collectionCompleted
        let collectionCompletedNodeColor = this.props.data.collectionCompletedTimestamp ? "rgb(255,0,0)" : "rgb(210,160,160)";
        if (this.props.data.state === 'collectionCompleted')
            collectionCompletedNodeColor = 'rgb(192,255,0)';

        let collectionCompletedNode = new DefaultNodeModel("Collection Approved", collectionCompletedNodeColor);
        let collectionCompletedInPort = collectionCompletedNode.addInPort(" ");
        let collectionCompletedOutPort = collectionCompletedNode.addOutPort(" ");
        collectionCompletedNode.setPosition(650, 220);


        // link the ports
        let link1 = rfiOutPort.link(checkingCollectsInPort);
        let link2 = checkingCollectsOutPort.link(creatingProductInNode);
        let link3 = creatingProductOutNode.link(uploadingProductInPort);
        let link4 = uploadingProductOutPort.link(productCompletedInPort);

        let link5 = checkingCollectsOutPort.link(verifyingRequestInPort);
        let link6 = verifyingRequestOutPort.link(collectionSubmittedInPort);
        let link7 = collectionSubmittedOutPort.link(collectionCompletedInPort);
        let link8 = collectionCompletedOutPort.link(creatingProductInNode);

        // link2.addLabel("Imagry Already Exists");
        // (link1 as DefaultLinkModel).addLabel("Hello World!");

        //4) add the models to the root graph
        model.addAll(rfiNode, checkingCollectsNode, creatingProductNode, uploadingProductNode, productCompletedNode, verifyingRequestNode, collectionSubmittedNode, collectionCompletedNode, link1, link2, link3, link4, link5, link6, link7, link8);

        //5) load model into engine
        engine.setDiagramModel(model);

        //6) render the diagram!
        return <DiagramWidget className="srd-demo-canvas" diagramEngine={engine}/>;
    }
}

export default FlowDiagram;