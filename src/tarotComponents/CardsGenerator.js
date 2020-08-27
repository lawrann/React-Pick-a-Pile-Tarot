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
        function setCardBack() {
          var num = state.number_piles;
          var images = [require("./cards/cardback.jpg")];
          for (var i = 0; i < num; i++) {
            var imgTag = document.getElementById("cardImg" + i);
            if (imgTag === null) break;
            imgTag.src = images[0];
          }
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
                {setCardBack()}
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
