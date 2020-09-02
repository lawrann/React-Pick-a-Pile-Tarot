import React from "react";
import { ContextConsumer } from "./context";

const Card = (prop) => {
  return (
    <ContextConsumer>
      {({ actions, state }) => {
        function cardBack() {
          var images = [
            require("./cards/" +
              state.tarot[state.piles[prop.id]["cardId"]].img),
            require("./cards/cardback.jpg"),
          ];
          if (state.piles[prop.id]["display"]) {
            return images[0];
          } else {
            return images[1];
          }
        }
        return (
          <React.Fragment>
            <img
              // src={require("./cards/cardback.jpg")}
              src={cardBack()}
              width="200px"
              height="320px"
              onClick={() => actions.toggleDisplay(prop.id)}
              id={"cardImg" + prop.id}
            />
          </React.Fragment>
        );
      }}
    </ContextConsumer>
  );
};

export default Card;
