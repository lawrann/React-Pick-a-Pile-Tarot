import React from "react";
import { ContextConsumer } from "./context";

const CardInfoPanel = () => {
  return (
    <ContextConsumer>
      {({ actions, state }) => {
        return (
          <React.Fragment>
            <h1>Cards selected:</h1>
            {actions.getCardSelectedDisplay()}
            {/* <table className="card-selected-display">
              <tbody>
                <tr>{actions.getCardSelectedDisplay()}</tr>
              </tbody>
            </table> */}
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
