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
        function setCardBack() {
          var num = state.number_piles;
          var images = [require("./cards/cardback.jpg")];
          for (var i = 0; i < num; i++) {
            var imgTag = document.getElementById("cardImg" + i);
            if (imgTag === null) break;
            // imgTag.src = images[0];
          }
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
                <Alert isopen={"0"} variant="success">
                  Cards successfully generated
                </Alert>
                <Button
                  className="btn btn-primary btn-sm m-2"
                  onClick={() => actions.generateNewCards()}
                >
                  Regenerate Cards
                </Button>
                <div>{displayCards()}</div>
                {/* {setCardBack()} */}
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
