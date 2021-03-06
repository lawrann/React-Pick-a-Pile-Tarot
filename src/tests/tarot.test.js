import React from "react";
import PersonalInformation from "../tarotComponents/PersonalInformation";
import { ContextProvider, ContextConsumer } from "../tarotComponents/context";
import { render, screen, fireEvent } from "@testing-library/react";
import TarotData from "../tarotComponents/tarot-images.json";
import Tarot from "../tarotComponents/Tarot";
import * as algo from "../tarotComponents/algorithms";
import CardGenerator from "../tarotComponents/CardsGenerator";
import CardInfoPanel from "../tarotComponents/CardInfoPanel";

describe("Tarot Component : ", () => {
  test("getCardSelectedDisplay", () => {
    const selectCards = [9, 10, 1, 2];
    const s = render(
      <Tarot>
        <ContextConsumer>
          {({ actions, state }) => {
            state.number_piles = 4;
            state.piles = [
              { pile: 1, cardId: selectCards[0], display: true },
              { pile: 2, cardId: selectCards[1], display: true },
              { pile: 3, cardId: selectCards[2], display: true },
              { pile: 4, cardId: selectCards[3], display: true },
            ];
            return actions.getCardSelectedDisplay();
          }}
        </ContextConsumer>
      </Tarot>
    );
    const images = [
      require("../tarotComponents/cards/" +
        TarotData.cards[selectCards[0]].img),
      require("../tarotComponents/cards/" +
        TarotData.cards[selectCards[1]].img),
      require("../tarotComponents/cards/" +
        TarotData.cards[selectCards[2]].img),
      require("../tarotComponents/cards/" +
        TarotData.cards[selectCards[3]].img),
    ];
    expect(screen.getByTestId("card-selected-id-0")).toBeInTheDocument();
    expect(screen.getByTestId("card-selected-id-1")).toBeInTheDocument();
    expect(screen.getByTestId("card-selected-id-2")).toBeInTheDocument();
    expect(screen.getByTestId("card-selected-id-3")).toBeInTheDocument();
    expect(screen.getByTestId("card-selected-id-0").src).toBe(
      "http://localhost/" + images[0]
    );
    expect(screen.getByTestId("card-selected-id-1").src).toBe(
      "http://localhost/" + images[1]
    );
    expect(screen.getByTestId("card-selected-id-2").src).toBe(
      "http://localhost/" + images[2]
    );
    expect(screen.getByTestId("card-selected-id-3").src).toBe(
      "http://localhost/" + images[3]
    );
  });

  test("getCardInfoDisplay - getCardData - getCardId", () => {
    const selectCards = [9, 10, 1, 2];
    const s = render(
      <Tarot>
        <table>
          <ContextConsumer>
            {({ actions, state }) => {
              state.number_piles = 4;
              state.cardsSelected = selectCards;
              state.piles = [
                { pile: 1, cardId: selectCards[0], display: true },
                { pile: 2, cardId: selectCards[1], display: true },
                { pile: 3, cardId: selectCards[2], display: true },
                { pile: 4, cardId: selectCards[3], display: true },
              ];
              return actions.getCardInfoDisplay();
            }}
          </ContextConsumer>
        </table>
      </Tarot>
    );
    const images = [
      require("../tarotComponents/cards/" +
        TarotData.cards[selectCards[0]].img),
      require("../tarotComponents/cards/" +
        TarotData.cards[selectCards[1]].img),
      require("../tarotComponents/cards/" +
        TarotData.cards[selectCards[2]].img),
      require("../tarotComponents/cards/" +
        TarotData.cards[selectCards[3]].img),
    ];
    expect(
      screen.getByTestId("card-data-tbody-id-" + selectCards[0])
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("card-data-tbody-id-" + selectCards[1])
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("card-data-tbody-id-" + selectCards[2])
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("card-data-tbody-id-" + selectCards[3])
    ).toBeInTheDocument();
    expect(screen.getByTestId("card-data-img-id-" + selectCards[0]).src).toBe(
      "http://localhost/" + images[0]
    );
    expect(screen.getByTestId("card-data-img-id-" + selectCards[1]).src).toBe(
      "http://localhost/" + images[1]
    );
    expect(screen.getByTestId("card-data-img-id-" + selectCards[2]).src).toBe(
      "http://localhost/" + images[2]
    );
    expect(screen.getByTestId("card-data-img-id-" + selectCards[3]).src).toBe(
      "http://localhost/" + images[3]
    );
  });

  test("displayNumber", () => {
    const namenumerlogy = 7;
    const singleNumber = 7;
    const s = render(
      <Tarot>
        <ContextConsumer>
          {({ actions, state }) => {
            state.nameNumerlogy = namenumerlogy;
            state.singleNumber = 7;
            return actions.displayNumber();
          }}
        </ContextConsumer>
      </Tarot>
    );
    expect(screen.getByTestId("namenumerlogy").textContent).toBe("7 / 7");
  });
  test("displayHoroscope", () => {
    const horoscope = "Cancer";
    const s = render(
      <Tarot>
        <ContextConsumer>
          {({ actions, state }) => {
            state.horoscope = horoscope;
            return actions.displayHoroscope();
          }}
        </ContextConsumer>
      </Tarot>
    );
    expect(screen.getByTestId("horoscope").textContent).toBe("Cancer");
  });
  test("displayZodiac", () => {
    const zodiac = "Pig";
    const s = render(
      <Tarot>
        <ContextConsumer>
          {({ actions, state }) => {
            state.zodiac = zodiac;
            return actions.displayZodiac();
          }}
        </ContextConsumer>
      </Tarot>
    );
    expect(screen.getByTestId("zodiac").textContent).toBe("Pig");
  });

  test("getAnswers", () => {
    var question = "Name";
    var answer = "Lawrann";
    const s = render(
      <Tarot>
        <ContextConsumer>
          {({ actions }) => {
            return (
              <span data-testid={"getAnswerTest"}>
                {actions.getAnswers(answer, question, "key")}
              </span>
            );
          }}
        </ContextConsumer>
      </Tarot>
    );
    console.log(screen.getByTestId("getAnswerTest").textContent);
    expect(screen.getByTestId("getAnswerTest").textContent).toBe(
      question + answer
    );
  });

  test("getCardData", () => {
    var cardNum = 0;
    const s = render(
      <Tarot>
        <ContextConsumer>
          {({ actions, state }) => {
            return (
              <table data-testid={"getCardData"}>
                {actions.getCardData(cardNum)}
              </table>
            );
          }}
        </ContextConsumer>
      </Tarot>
    );
    expect(
      screen.getByTestId("card-data-tbody-id-" + cardNum).toBeInTheDocument
    );
  });

  test("generateNewCards", () => {
    const spy = jest.spyOn(algo, "shuffle");
    const s = render(
      <Tarot>
        <ContextConsumer>
          {({ state }) => {
            state.singleNumber = 6;
          }}
        </ContextConsumer>
        <CardGenerator />
      </Tarot>
    );
    const button = screen.getByTestId("button-generate-cards");
    fireEvent.click(button);
    expect(spy).toHaveBeenCalledTimes(6);
  });

  test("displayModal", () => {
    const dm = jest.fn();
    const s = render(
      <Tarot>
        <CardGenerator />
      </Tarot>
    );
    const button = screen.getByTestId("button-generate-cards");
    fireEvent.click(button);
    const card = screen.getByTestId("card-test-id-0");
    fireEvent.click(card);
    const cardselected = screen.getByTestId("card-selected-id-0");
    fireEvent.click(cardselected);
    expect(screen.getByTestId("modal").toBeInTheDocument);
    const closebtn = screen.getByTestId("close-test");
    fireEvent.click(closebtn);
    expect(screen.getByTestId("modal")).not.toBeInTheDocument;
  });
});
