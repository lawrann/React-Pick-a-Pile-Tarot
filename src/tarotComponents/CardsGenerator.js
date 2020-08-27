import React from "react";
import { ContextConsumer } from "./context";
import Card from "./Card";

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
                Generate New Cards{" "}
                <button onClick={() => actions.generateNewCards()}>
                  Generate New Cards
                </button>
                <div>Click on generate cards first!</div>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                Generate New Cards{" "}
                <button onClick={() => actions.generateNewCards()}>
                  Generate New Cards
                </button>
                <div>{displayCards()}</div>
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
