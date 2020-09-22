import React from "react";
import { ContextConsumer } from "./context";

const CardInfoPanel = () => {
  return (
    <ContextConsumer>
      {({ actions, state }) => {
        return (
          <React.Fragment>
            {actions.getCardSelectedDisplay()}
            {/* <table className="card-info-table">
              {actions.getCardInfoDisplay()}
            </table> */}
          </React.Fragment>
        );
      }}
    </ContextConsumer>
  );
};

export default CardInfoPanel;
