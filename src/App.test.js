import React from "react";
import App from "./App";
import TarotBoiler from "./TarotBoiler";
import Tarot from "./tarotComponents/Tarot";
import { ContextProvider, ContextConsumer } from "./tarotComponents/context";
import Card from "./tarotComponents/Card";
import PersonalInformation from "./tarotComponents/PersonalInformation";
import renderer from "react-test-renderer";
import {
  getNameNumerology,
  getZodiacSigns,
  getHoroscopeSign,
  shuffle,
} from "./tarotComponents/algorithms";

// how to test for onchange function?

describe("tarot functions", () => {
  test("getCardData", () => {
    const cardData = renderer.create(
      <Tarot>
        <ContextConsumer>
          {({ actions }) => {
            {
              actions.getCardData(1);
            }
          }}
        </ContextConsumer>
      </Tarot>
    );
    let tree = cardData.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("test context provider", () => {
  it("sets generatedpiles status to false", () => {
    const TestComponent = () => {
      return (
        <ContextConsumer>
          {({ actions, state }) => {
            <div data-testid="value">
              {state.generatedPiles.toString()}
              <button onClick={actions.generateNewCards}>
                generate new cards
              </button>
            </div>;
          }}
        </ContextConsumer>
      );
    };

    const tarotBoilerComponent = renderer.create(
      <Tarot>
        <TestComponent />
      </Tarot>
    );

    let tree = tarotBoilerComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("test algorithms", () => {
  test("name numerology", () => {
    expect(getNameNumerology("A")).toStrictEqual([1, 1]);
    expect(getNameNumerology("B")).toStrictEqual([2, 2]);
    expect(getNameNumerology("R")).toStrictEqual([9, 9]);
    expect(getNameNumerology("AB")).toStrictEqual([3, 3]);
  });

  test("zodiac signs", () => {
    expect(getZodiacSigns("1995")).toStrictEqual("Pig");
    expect(getZodiacSigns("13994")).toStrictEqual("Dog");
    expect(getZodiacSigns("-1")).toStrictEqual("Invalid year");
  });

  test("horoscope signs", () => {
    expect(getHoroscopeSign("26", "6")).toStrictEqual("Cancer - Рак");
    expect(getHoroscopeSign("25", "8")).toStrictEqual(
      "Cusp of Exposure - (Leo-Virgo) / (Лев-Девы)"
    );
    expect(getHoroscopeSign("-1", "-1")).toStrictEqual("Invalid birthday");
  });

  test("shuffle", () => {
    const v_arr = [1, 2, 3, 4, 5, 6];
    expect(shuffle(v_arr)).toHaveLength(v_arr.length);
  });
});

describe("snapshot testing", () => {
  test("TarotBoiler render", () => {
    const tarotBoilerComponent = renderer.create(<TarotBoiler />);
    let tree = tarotBoilerComponent.toJSON(); // toJson is to create the snapshot
    expect(tree).toMatchSnapshot();
  });

  test("Tarot render", () => {
    const tarotComponent = renderer.create(<Tarot />);
    let tree = tarotComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

//   test("Card render", () => {
//     const cardComponent = renderer.create(<Card />);
//     let tree = cardComponent.toJSON();
//     expect(tree).toMatchSnapshot();
//   });

//   test("PersonalInformation render", () => {
//     const component = renderer.create(<PersonalInformation />);
//   });

// // manually trigger the callback
// tree.props.onMouseEnter();
// // re-rendering
// tree = component.toJSON();
// expect(tree).toMatchSnapshot();

// // manually trigger the callback
// tree.props.onMouseLeave();
// // re-rendering
// tree = component.toJSON();
// expect(tree).toMatchSnapshot();

// test("", () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// Snapshot test case renders a UI component, takes a snapshot,
// then compares it to a reference snapshot file stored alongside the test.
// The test will fail if the two snapshots do not match: either the change is unexpected,
// or the reference snapshot needs to be updated to the new version of the UI component.
// test("the pizza data is correct", () => {
//   expect(pizzas).toMatchSnapshot();
// });

// react-testing
// it("renders correctly", () => {
//   const { getByTestId, queryByPlaceholderName } = render(<TarotBoiler />);
//   expect(getByTestId("tarot")).toBeTruthy();
// });
