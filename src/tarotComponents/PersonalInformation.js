import React from "react";
import { ContextConsumer } from "./context";
import { Row, Col, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PersonalInformation = () => {
  return (
    <ContextConsumer>
      {({ actions }) => {
        return (
          <React.Fragment>
            <Container>
              <Form>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Full Name:</Form.Label>
                      <Form.Control
                        onChange={actions.getName}
                        id="nameBox"
                        type="text"
                        placeholder="Enter your Name"
                        data-testid="test-full-name-input"
                      />
                      <Form.Text className="text-muted">
                        You name is used to calculate your Name's Numerlogy
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Date of Birth:</Form.Label>
                      <Form.Control
                        type="date"
                        id="birthdayBox"
                        onChange={actions.getBirthday}
                        placeholder="Enter your Date of Birth"
                        data-testid="test-birthday-input"
                      />
                      <Form.Text className="text-muted">
                        You DOB is used to calculate your Horoscope and Zodiac
                        signs
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>Name Numerology: </Col>
                  {actions.displayNumber()}
                </Row>
                <Row>
                  <Col>Horoscope: </Col>
                  {actions.displayHoroscope()}
                </Row>
                <Row>
                  <Col>Chinese Zodiac: </Col>
                  {actions.displayZodiac()}
                </Row>
              </Form>
            </Container>
          </React.Fragment>
        );
      }}
    </ContextConsumer>
  );
};

export default PersonalInformation;
