import React from "react";
import { ContextConsumer } from "./context";

const Card = (prop) => {
  return (
    <ContextConsumer>
      {({ actions, piles }) => {
        return (
          <React.Fragment>
            <img
              src={require("./cards/cardback.jpg")}
              onClick={() => actions.getCardId(prop.id)}
              id={"cardImg" + prop.id}
            />
            {actions.displayUi(prop.id)}
          </React.Fragment>
        );
      }}
    </ContextConsumer>
  );
};

export default Card;
