import React from "react";
import { ContextConsumer } from "./context";
import Card from "./Card";
import CardInfoPanel from "./CardInfoPanel";
import { Alert, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const displayCards = (state) => {
  let uis = [];
  for (var i = 0; i < state.number_piles; i++) {
    uis.push(<Card className="card" id={i} key={i} />);
  }
  return uis;
};

const hasGeneratedCards = (actions, state) => {
  if (state.generatedPiles === false) {
    return (
      <React.Fragment>
        <Button
          className="btn btn-primary btn-sm m-2"
          onClick={() => actions.generateNewCards()}
          data-testid={"button-generate-cards"}
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
          data-testid={"button-regenerate-cards"}
        >
          Regenerate Cards
        </Button>
        <div className="card-list">{displayCards(state)}</div>
        <CardInfoPanel />
      </React.Fragment>
    );
  }
};

const CardsGenerator = () => {
  return (
    <ContextConsumer>
      {({ actions, state }) => {
        return hasGeneratedCards(actions, state);
      }}
    </ContextConsumer>
  );
};

export default CardsGenerator;
export { hasGeneratedCards, displayCards };
