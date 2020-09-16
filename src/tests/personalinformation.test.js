import React from "react";
import PersonalInformation from "../tarotComponents/PersonalInformation";
import { ContextProvider, ContextConsumer } from "../tarotComponents/context";
import { render, screen, fireEvent } from "@testing-library/react";
import TarotData from "../tarotComponents/tarot-images.json";
import Tarot from "../tarotComponents/Tarot";

describe("PersonalInformation Component : ", () => {
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

  // create PersonalInformation component
  test("should create personal information component", () => {
    const getName = jest.fn();
    const getBirthday = jest.fn();
    const displayNumber = jest.fn();
    const displayHoroscope = jest.fn();
    const displayZodiac = jest.fn();
    const s = render(
      <ContextProvider
        value={{
          state,
          actions: {
            getName,
            getBirthday,
            displayNumber,
            displayHoroscope,
            displayZodiac,
          },
        }}
      >
        <PersonalInformation />
      </ContextProvider>
    );
    expect(screen.getByText("Full Name:")).toBeInTheDocument();
    expect(
      screen.getByText("You name is used to calculate your Name's Numerlogy")
    ).toBeInTheDocument();
    expect(screen.getByText("Date of Birth:")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You DOB is used to calculate your Horoscope and Zodiac signs"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Name Numerology:")).toBeInTheDocument();
    expect(screen.getByText("Horoscope:")).toBeInTheDocument();
    expect(screen.getByText("Chinese Zodiac:")).toBeInTheDocument();
  });

  // onChange to name textbox - getName displayNumber function is called
  test("should call getName - displayNumber", () => {
    const getName = jest.fn();
    const getBirthday = jest.fn();
    const displayNumber = jest.fn();
    const displayHoroscope = jest.fn();
    const displayZodiac = jest.fn();
    const s = render(
      <ContextProvider
        value={{
          state,
          actions: {
            getName,
            getBirthday,
            displayNumber,
            displayHoroscope,
            displayZodiac,
          },
        }}
      >
        <PersonalInformation />
      </ContextProvider>
    );
    const input = screen.getByTestId("test-full-name-input");
    fireEvent.change(input, { target: { value: "Lawrann" } });
    expect(getName).toHaveBeenCalled();
    expect(getName).toBeCalledTimes(1);
    expect(displayNumber).toHaveBeenCalled();
  });

  // onChange to birthday text - getBirthday, displayHoroscope, displayZodiac function is called
  test("should call getBirthday - displayHoroscope - displayZodiac", () => {
    const getName = jest.fn();
    const getBirthday = jest.fn();
    const displayNumber = jest.fn();
    const displayHoroscope = jest.fn();
    const displayZodiac = jest.fn();
    const s = render(
      <ContextProvider
        value={{
          state,
          actions: {
            getName,
            getBirthday,
            displayNumber,
            displayHoroscope,
            displayZodiac,
          },
        }}
      >
        <PersonalInformation />
      </ContextProvider>
    );
    const input = screen.getByTestId("test-birthday-input");

    fireEvent.change(input, {
      target: { value: "1995-06-26" },
    });
    expect(getBirthday).toHaveBeenCalled();
    expect(getBirthday).toBeCalledTimes(1);
    expect(displayHoroscope).toHaveBeenCalled();
    expect(displayZodiac).toHaveBeenCalled();
  });

  // onchange to name & birthday textbox, appropriate numerlogy, zodiac and horoscope is shown
  test("should reflect name numerology, zodiac and horoscope upon input of name and birthday", () => {
    const s = render(
      <Tarot>
        <PersonalInformation />
      </Tarot>
    );
    const name = screen.getByTestId("test-full-name-input");
    const birthday = screen.getByTestId("test-birthday-input");
    fireEvent.change(birthday, {
      target: { value: "1995-06-26" },
    });
    fireEvent.change(name, {
      target: { value: "Lawrann" },
    });
    expect(screen.getByText("29 / 2")).toBeInTheDocument();
    expect(screen.getByText("Cancer - Рак")).toBeInTheDocument();
    expect(screen.getByText("Pig")).toBeInTheDocument();
  });
});
