import React, { useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import x from "./x.png"
import "./MessagePage.scss"


const MessagePage = () => {
    const closeMessage = () => {
        alert('close!')
    }
  return (
    <Container fluid>
      <Row>
        <Col xs ={8} >
            <Row className="header">
                <Col > 
                    <div className="userPicture">Userpic to chat with</div>
                    <div className="userName">
                        Username to chat with
                    </div>
                </Col>
                <Col > <img src={x} className="closeButton" onClick={closeMessage}/></Col>
            </Row>
            <Row className="messageBody">
                Real Message
            </Row>
            <Row className="text">
                <Col >Textbox</Col>
                <Col >Button</Col>
            </Row>
        </Col>
        <Col xs={2}>
            <Row className="row">
                Picture
            </Row>
            <Row className="row">
                <Col className="username">username</Col>
                <Col className="age">age</Col>
                <div className="from"></div>
            </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default MessagePage;
