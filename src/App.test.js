import React from "react";
import Card from "./tarotComponents/Card";
import { ContextProvider, ContextConsumer } from "./tarotComponents/context";
import { render, screen, fireEvent } from "@testing-library/react";
import TarotData from "./tarotComponents/tarot-images.json";
// import renderer from "react-test-renderer";

import App from "./App";
import TarotBoiler from "./TarotBoiler";
import Tarot from "./tarotComponents/Tarot";
import PersonalInformation from "./tarotComponents/PersonalInformation";
import { Row, Col, Container, Form } from "react-bootstrap";

// jest mock for Card Component
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
    require("./tarotComponents/cards/" +
      state.tarot[state.piles[id]["cardId"]].img),
    require("./tarotComponents/cards/cardback.png"),
  ];
  const toggleDisplay = jest.fn();

  test("Card is generated", () => {
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

  test("toggleDisplay is called", () => {
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

  test("card alternates state's display when display value is changed", () => {
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
    // console.log(screen.getByTestId("card-test-id-0").src);
    expect(screen.getByTestId("card-test-id-0").src).toBe(
      "http://localhost/" + images[1]
    );
    state.piles = [{ pile: 1, cardId: 1, display: true }];
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
    // console.log(screen.getByTestId("card-test-id-0").src);
    expect(screen.getByTestId("card-test-id-0").src).toBe(
      "http://localhost/" + images[0]
    );
  });
});

// test("ContextConsumer shows default value", () => {
//   const s = render(<Tarot></Tarot>);
//   expect(s.findAllByTestId("1").textContent).toBe("Pick a Pile Tarot Reading");
// });

// describe("PersonalInformation", () => {
//   test("component render", () => {
//     const personalInfo = renderer.create(
//       <Tarot>
//         <PersonalInformation />
//       </Tarot>
//     );
//     let tree = personalInfo.toJSON();
//     expect(tree).toMatchSnapshot();
//   });

//   test("function", () => {
//     const testfunction = () => {
//       return (
//         <ContextConsumer>
//           {(actions) => {
//             {
//               {
//                 actions.displayNumber();
//               }
//               {
//                 actions.displayHoroscope();
//               }
//               {
//                 actions.displayZodiac();
//               }
//             }
//           }}
//         </ContextConsumer>
//       );
//     };
//     render(
//       <Tarot>
//         <PersonalInformation />
//       </Tarot>
//     );
//     expect(screen.toHaveTextContent("My Name Is: Unknown"));
//   });
// });

// describe("Card", () => {
//   test("Card rendering", () => {
//     const renderCardComponent = renderer.create(
//       <Tarot>
//         <ContextConsumer>
//           {(actions, state) => {
//             {
//               <Card className="card" id={1} />;
//             }
//           }}
//         </ContextConsumer>
//       </Tarot>
//     );
//     let tree = renderCardComponent.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// describe("tarot functions", () => {
//   test("getCardData", () => {
//     const cardData = renderer.create(
//       <Tarot>
//         <ContextConsumer>
//           {({ actions }) => {
//             {
//               actions.getCardData(1);
//             }
//           }}
//         </ContextConsumer>
//       </Tarot>
//     );
//     let tree = cardData.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// describe("test context provider", () => {
//   it("sets generatedpiles status to false", () => {
//     const TestComponent = () => {
//       return (
//         <ContextConsumer>
//           {({ actions, state }) => {
//             <div data-testid="value">
//               {state.generatedPiles.toString()}
//               <button onClick={actions.generateNewCards}>
//                 generate new cards
//               </button>
//             </div>;
//           }}
//         </ContextConsumer>
//       );
//     };

//     const tarotBoilerComponent = renderer.create(
//       <Tarot>
//         <TestComponent />
//       </Tarot>
//     );

//     let tree = tarotBoilerComponent.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// describe("snapshot testing", () => {
//   test("TarotBoiler render", () => {
//     const tarotBoilerComponent = renderer.create(<TarotBoiler />);
//     let tree = tarotBoilerComponent.toJSON(); // toJson is to create the snapshot
//     expect(tree).toMatchSnapshot();
//   });

//   test("Tarot render", () => {
//     const tarotComponent = renderer.create(<Tarot />);
//     let tree = tarotComponent.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });
