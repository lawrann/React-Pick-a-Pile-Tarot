import React from "react";
import Card from "../tarotComponents/Card";
import { ContextProvider, ContextConsumer } from "../tarotComponents/context";
import { render, screen, fireEvent } from "@testing-library/react";
import TarotData from "../tarotComponents/tarot-images.json";

describe("Card Component : ", () => {
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
  const toggleDisplay = jest.fn();

  test("should generate card", () => {
    const s = render(
      <ContextProvider
        value={{
          state,
          actions: {
            toggleDisplay,
          },
        }}
      >
        <Card id={id}></Card>
      </ContextProvider>
    );
    expect(screen.getByTestId("card-test-id-0")).toBeInTheDocument();
    expect(screen.getByTestId("card-test-id-0").src).toBe(
      "http://localhost/" + images[1]
    );
  });

  test("should call toggleDisplay", () => {
    const s = render(
      <ContextProvider
        value={{
          state,
          actions: {
            toggleDisplay,
          },
        }}
      >
        <Card id={id}></Card>
      </ContextProvider>
    );
    const button = screen.getByTestId("card-test-id-0");
    fireEvent.click(button);
    expect(toggleDisplay).toHaveBeenCalled();
  });

  test("should display appropriate img based on display state - cardBack()", () => {
    const cardBack = () => {
      if (state.piles[id]["display"]) {
        return images[0];
      } else {
        return images[1];
      }
    };
    cardBack();
    expect(cardBack()).toBe(images[1]);
    state.piles = [{ pile: 1, cardId: 1, display: true }];
    expect(cardBack()).toBe(images[0]);
    state.piles = [{ pile: 1, cardId: 1, display: false }];
  });

  test("should alternate img display when state's display is changed", () => {
    const s = render(
      <ContextProvider
        value={{
          state,
          actions: {
            toggleDisplay,
          },
        }}
      >
        <Card id={id}></Card>
      </ContextProvider>
    );
    expect(screen.getByTestId("card-test-id-0").src).toBe(
      "http://localhost/" + images[1]
    );
    state.piles = [{ pile: 1, cardId: 1, display: true }]; // change display to true, check if img src changes
    s.rerender(
      <ContextProvider
        value={{
          state,
          actions: {
            toggleDisplay,
          },
        }}
      >
        <Card id={id}></Card>
      </ContextProvider>
    );
    expect(screen.getByTestId("card-test-id-0").src).toBe(
      "http://localhost/" + images[0]
    );
  });
});
