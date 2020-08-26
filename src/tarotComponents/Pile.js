import React from "react";
import { ContextConsumer } from "./context";

const Pile = (prop) => {
  return (
    <ContextConsumer>
      {({ actions, piles }) => {
        return (
          <React.Fragment>
            <div>
              <img src={require("./cards/cardback.jpg")} />
              <button onClick={() => actions.getCardId(prop.id)}>
                Select Card {prop.id}
              </button>
              {actions.displayUi(prop.id)}
            </div>
          </React.Fragment>
        );
      }}
    </ContextConsumer>
  );
};

export default Pile;
