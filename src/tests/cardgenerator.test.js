import React from "react";
import CardsGenerator from "../tarotComponents/CardsGenerator";
import {
  displayCards,
  hasGeneratedCards,
} from "../tarotComponents/CardsGenerator";
import { ContextProvider, ContextConsumer } from "../tarotComponents/context";
import { render, screen, fireEvent } from "@testing-library/react";
import TarotData from "../tarotComponents/tarot-images.json";

describe("CardGenerator Component : ", () => {
  const state = {
    tarot: TarotData.cards,
    cardPicked: [1, 2, 3, 4],
    name: "Lawrann",
    birthday: "",
    horoscope: "",
    zodiac: "",
    nameNumerology: "",
    singleNumber: "",
    generatedPiles: false,
    number_piles: 35,
    piles: [{ pile: 1, cardId: 1, display: false }],
    cardsSelected: [],
  };

  const id = 0;
  const images = [
    require("../tarotComponents/cards/" +
      state.tarot[state.piles[id]["cardId"]].img),
    require("../tarotComponents/cards/cardback.png"),
  ];
  const generateNewCards = jest.fn();

  test("should create card generator button - Generate Cards", () => {
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

  test("hasGeneratedCards function", () => {
    const actions = {
      generateNewCards,
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
    expect(screen.getByTestId("button-generate-cards")).toBeInTheDocument();
    // const s = render(
    //   <ContextProvider
    //     value={{
    //       state,
    //       actions: {
    //         generateNewCards,
    //       },
    //     }}
    //   >
    //     <CardsGenerator />
    //   </ContextProvider>
    // );
    // const button = screen.getByTestId("button-generate-cards");
    // fireEvent.click(button);
    // expect(generateNewCards).toHaveBeenCalled();
  });
});
