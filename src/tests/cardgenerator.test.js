import React from "react";
import CardsGenerator from "../tarotComponents/CardsGenerator";
import {
  hasGeneratedCards,
  displayCards,
} from "../tarotComponents/CardsGenerator";
import { ContextProvider, ContextConsumer } from "../tarotComponents/context";
import { render, screen, fireEvent } from "@testing-library/react";
import TarotData from "../tarotComponents/tarot-images.json";

describe("CardGenerator Component : ", () => {
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
      { pile: 1, cardId: 1, display: false },
      { pile: 2, cardId: 2, display: false },
      { pile: 3, cardId: 3, display: false },
      { pile: 4, cardId: 4, display: false },
    ],
    cardsSelected: [],
  };

  const id = 0;
  const images = [
    require("../tarotComponents/cards/" +
      state.tarot[state.piles[id]["cardId"]].img),
    require("../tarotComponents/cards/cardback.png"),
  ];
  const generateNewCards = jest.fn();

  // create CardsGenerator component
  test("should create card generator component alog with button - Generate Cards", () => {
    const s = render(
      <ContextProvider
        value={{
          state,
          actions: {
            generateNewCards,
          },
        }}
      >
        <CardsGenerator />
      </ContextProvider>
    );
    expect(screen.getByText("Generate Cards")).toBeInTheDocument();
  });

  // clicking Generate Cards should fire generateNewCards
  test("should fire generateNewCards function when generate button is clicked", () => {
    const s = render(
      <ContextProvider
        value={{
          state,
          actions: {
            generateNewCards,
          },
        }}
      >
        <CardsGenerator />
      </ContextProvider>
    );
    const button = screen.getByTestId("button-generate-cards");
    fireEvent.click(button);
    expect(generateNewCards).toHaveBeenCalled();
  });

  // test displayCards function which returns <Cards> component based on state.number_piles
  test("displayCards function", () => {
    const s = render(
      <ContextProvider
        value={{
          state,
        }}
      >
        {displayCards(state)}
      </ContextProvider>
    );
    expect(screen.getByTestId("card-test-id-0")).toBeInTheDocument();
    expect(screen.getByTestId("card-test-id-1")).toBeInTheDocument();
    expect(screen.getByTestId("card-test-id-2")).toBeInTheDocument();
    expect(screen.getByTestId("card-test-id-3")).toBeInTheDocument();
  });

  // test hasGeneratedCards function which checks state.generatedPiles == true/false and displays
  // the appropriate ui (Regenerate cards / generate cards) and displayCards ui
  test("hasGeneratedCards function", () => {
    const getCardSelectedDisplay = jest.fn();
    const getCardInfoDisplay = jest.fn();
    const actions = {
      generateNewCards,
      getCardInfoDisplay,
      getCardSelectedDisplay,
    };
    const s = render(
      <ContextProvider
        value={{
          state,
          actions,
        }}
      >
        {hasGeneratedCards(actions, state)}
      </ContextProvider>
    );
    expect(screen.getByText("Generate Cards")).toBeInTheDocument();
    state.generatedPiles = true;
    s.rerender(
      <ContextProvider
        value={{
          state,
          actions,
        }}
      >
        {hasGeneratedCards(actions, state)}
      </ContextProvider>
    );
    expect(screen.getByText("Regenerate Cards")).toBeInTheDocument();
    const button = screen.getByTestId("button-regenerate-cards");
    fireEvent.click(button);
    expect(generateNewCards).toHaveBeenCalled();
    expect(displayCards(state)).toBeInTheDocument;
  });
});
