import React from "react";
import { ContextConsumer } from "./context";
import Pile from "./Pile";

const CardsGenerator = () => {
  return (
    <ContextConsumer>
      {({ actions, generatedPiles, state }) => {
        function hasGeneratedPiles() {
          console.log("generatedpiles: " + state.generatedPiles);
          if (state.generatedPiles === false) {
            return (
              <React.Fragment>
                Generate New Pile{" "}
                <button onClick={() => actions.generateNewPiles()}>
                  Generate New Piles
                </button>
                <div>Click on generate piles first!</div>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                Generate New Pile{" "}
                <button onClick={() => actions.generateNewPiles()}>
                  Generate New Piles
                </button>
                <div>
                  <Pile id="0" />
                  <Pile id="1" />
                  <Pile id="2" />
                  <Pile id="3" />
                </div>
              </React.Fragment>
            );
          }
        }
        return hasGeneratedPiles();
      }}
    </ContextConsumer>
  );
};

export default CardsGenerator;
