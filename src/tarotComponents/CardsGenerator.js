import React from "react";
import { ContextConsumer } from "./context";
import Card from "./Card";
import CardInfoPanel from "./CardInfoPanel";
import { Alert, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CardsGenerator = () => {
  return (
    <ContextConsumer>
      {({ actions, state }) => {
        function displayCards() {
          let uis = [];
          for (var i = 0; i < state.number_piles; i++) {
            uis.push(<Card id={i} key={i} />);
          }
          return uis;
        }
        function hasGeneratedCards() {
          if (state.generatedPiles === false) {
            return (
              <React.Fragment>
                <Button
                  className="btn btn-primary btn-sm m-2"
                  onClick={() => actions.generateNewCards()}
                >
                  Generate Cards
                </Button>
                <Alert variant="primary">Click on generate cards first!</Alert>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                <Button
                  className="btn btn-primary btn-sm m-2"
                  onClick={() => actions.generateNewCards()}
                >
                  Regenerate Cards
                </Button>
                <div>{displayCards()}</div>
                <CardInfoPanel />
              </React.Fragment>
            );
          }
        }

        return hasGeneratedCards();
      }}
    </ContextConsumer>
  );
};

export default CardsGenerator;
