import React from "react";
import { ContextConsumer } from "./context";

const CardInfoPanel = () => {
  return (
    <ContextConsumer>
      {({ actions, state }) => {
        return (
          <React.Fragment>
            <h1>Cards selected:</h1>
            <table className="card-info-table">
              {actions.getCardInfoDisplay()}
            </table>
          </React.Fragment>
        );
      }}
    </ContextConsumer>
  );
};

export default CardInfoPanel;
