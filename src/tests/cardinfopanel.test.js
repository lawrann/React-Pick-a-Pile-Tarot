import React from "react";
import CardInfoPanel from "../tarotComponents/CardInfoPanel";
import Tarot from "../tarotComponents/Tarot";
import { ContextProvider, ContextConsumer } from "../tarotComponents/context";
import { render, screen, fireEvent } from "@testing-library/react";
import TarotData from "../tarotComponents/tarot-images.json";

describe("CardInfoPanel Component : ", () => {
  const state = {
    tarot: TarotData.cards,
    cardPicked: [],
    name: "Lawrann",
    birthday: "",
    horoscope: "",
    zodiac: "",
    nameNumerology: "",
    singleNumber: "",
    generatedPiles: false,
    number_piles: 4,
    piles: [
      { pile: 1, cardId: 1, display: true },
      { pile: 2, cardId: 2, display: true },
      { pile: 3, cardId: 3, display: true },
      { pile: 4, cardId: 4, display: true },
    ],
    cardsSelected: [],
  };

  const getCardSelectedDisplay = jest.fn();
  const getSelectedCardInfoDisplay = jest.fn();

  // create cardinfopanel component and call getCardSelectedDisplay, getCardInfoDisplay
  test("should create card info panel", () => {
    const s = render(
      <ContextProvider
        value={{
          state,
          actions: {
            getCardSelectedDisplay,
          },
        }}
      >
        <CardInfoPanel />
      </ContextProvider>
    );
    expect(getCardSelectedDisplay).toHaveBeenCalled();
  });

  test("getCardSelectedDisplay", () => {
    const s = render(
      <Tarot>
        <ContextConsumer>
          {({ actions, state }) => {
            state.number_piles = 4;
            state.piles = [
              { pile: 1, cardId: 1, display: true },
              { pile: 2, cardId: 2, display: true },
              { pile: 3, cardId: 3, display: true },
              { pile: 4, cardId: 4, display: true },
            ];
          }}
        </ContextConsumer>
        <CardInfoPanel />
      </Tarot>
    );
    expect(screen.getByTestId("card-selected-id-0")).toBeInTheDocument();
    expect(screen.getByTestId("card-selected-id-1")).toBeInTheDocument();
    expect(screen.getByTestId("card-selected-id-2")).toBeInTheDocument();
    expect(screen.getByTestId("card-selected-id-3")).toBeInTheDocument();
  });
});
