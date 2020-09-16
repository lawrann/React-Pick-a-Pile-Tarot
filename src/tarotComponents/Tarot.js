import React from "react";
import { ContextProvider } from "./context";
import TarotData from "./tarot-images.json";
import * as algo from "./algorithms";
import "./tarotStyles.css";
import { Row, Col, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Tarot extends React.Component {
  state = {
    tarot: TarotData.cards,
    cardPicked: [],
    name: "",
    birthday: "",
    horoscope: "",
    zodiac: "",
    nameNumerology: "",
    singleNumber: "",
    generatedPiles: false,
    number_piles: 35,
    piles: [
      { pile: 1, cardId: -1, display: false },
      { pile: 2, cardId: -1, display: false },
      { pile: 3, cardId: -1, display: false },
      { pile: 4, cardId: -1, display: false },
    ],
    cardsSelected: [],
  };

  getCardSelectedDisplay = () => {
    let uis = [];
    var num = this.state.number_piles;
    let card_true = [];
    for (var i = 0; i < num; i++) {
      if (this.state.piles[i]["display"] === true) {
        card_true.push(this.state.piles[i]["cardId"]);
      }
    }
    for (var i = 0; i < card_true.length; i++) {
      if (this.state.cardsSelected.includes(card_true[i])) {
        continue;
      } else {
        this.state.cardsSelected.push(card_true[i]);
      }
    }
    for (var i = 0; i < this.state.cardsSelected.length; i++) {
      if (card_true.includes(this.state.cardsSelected[i])) {
        continue;
      } else {
        this.state.cardsSelected.splice(i, 1);
      }
    }
    var count = 0;
    for (const cardid of this.state.cardsSelected) {
      uis.push(
        <img
          data-testid={"card-selected-id-" + count}
          className="cards-selected"
          src={require("./cards/" + this.state.tarot[cardid].img)}
          width="150px"
          height="240px"
          key={"cardid-" + count}
        />
      );
      count++;
    }
    return uis;
  };

  getCardInfoDisplay = () => {
    let uis = [];
    var num = this.state.number_piles;
    let card_true = [];
    for (var i = 0; i < num; i++) {
      if (this.state.piles[i]["display"] === true) {
        card_true.push(this.state.piles[i]["cardId"]);
      }
    }
    for (var i = 0; i < card_true.length; i++) {
      if (this.state.cardsSelected.includes(card_true[i])) {
        continue;
      } else {
        this.state.cardsSelected.push(card_true[i]);
      }
    }
    for (var i = 0; i < this.state.cardsSelected.length; i++) {
      if (card_true.includes(this.state.cardsSelected[i])) {
        continue;
      } else {
        this.state.cardsSelected.splice(i, 1);
      }
    }
    for (const cardid of this.state.cardsSelected) {
      uis.push(this.getCardData(cardid));
    }
    console.log("cardsSelected " + this.state.cardsSelected);

    return uis;
  };

  toggleDisplay = (pileNum) => {
    console.log("Select card index: " + pileNum);
    console.log("Tarot card number: " + this.state.piles[pileNum]["cardId"]);
    console.log(
      "Tarot card: " +
        this.state.tarot[this.state.piles[pileNum]["cardId"]].name
    );
    this.state.piles[pileNum]["display"] = !this.state.piles[pileNum][
      "display"
    ];

    this.setState((state) => ({
      piles: this.state.piles,
    }));
  };

  displayNumber = () => {
    return (
      <Col data-testid="namenumerlogy">
        {this.state.nameNumerlogy} / {this.state.singleNumber}
      </Col>
    );
  };

  displayHoroscope = () => {
    return <Col data-testid="horoscope">{this.state.horoscope}</Col>;
  };

  displayZodiac = () => {
    return <Col data-testid="zodiac">{this.state.zodiac}</Col>;
  };

  getName = () => {
    var n = document.getElementById("nameBox").value;
    var numerlogy = algo.getNameNumerology(n);
    this.setState(() => ({
      name: n,
      nameNumerlogy: numerlogy[0],
      singleNumber: numerlogy[1],
    }));
    console.log("name: " + this.state.name);
  };

  getBirthday = () => {
    var b = document.getElementById("birthdayBox").value;
    var month = b.split("-")[1];
    var day = b.split("-")[2];
    var year = b.split("-")[0];
    this.setState(() => ({
      birthday: b,
      horoscope: algo.getHoroscopeSign(day, month),
      zodiac: algo.getZodiacSigns(year),
    }));
  };

  getAnswers = (answer, question, key) => {
    let uis = [];
    if (answer === "" || answer === undefined) {
      return;
    } else if (typeof answer === "object") {
      uis.push(<b key={"1-" + key + "-" + question}>{question}</b>);
      uis.push(<br key={"2-" + key + "-" + question} />);
      var count = 0;
      for (const q of answer) {
        count++;
        uis.push(q);
        uis.push(<br key={"3-" + key + "-" + question + "-" + count} />);
      }
    } else {
      uis.push(<b key={"4-" + key + "-" + question}>{question}</b>);
      uis.push(<br key={"5-" + key + "-" + question} />);
      uis.push(answer);
      uis.push(<br key={"6-" + key + "-" + question} />);
    }
    uis.push(<br key={"7-" + key + "-" + question} />);
    return uis;
  };

  // getCardId = (pileNum) => {
  //   const clonePile = [...this.state.piles];
  //   clonePile[pileNum]["display"] = !clonePile[pileNum]["display"];
  //   this.setState((prevState) => ({
  //     generatedPiles: true,
  //     piles: [...prevState.piles],
  //   }));
  //   return this.state.piles[pileNum]["cardId"];
  // };

  getCardData = (cardNumber) => {
    return (
      <React.Fragment key={cardNumber}>
        <tbody data-testid={"card-data-tbody-id-" + cardNumber}>
          <tr>
            <td>
              <h3>
                {this.state.tarot[cardNumber].name} (
                {this.state.tarot[cardNumber].arcana})
              </h3>
              <img
                data-testid={"card-data-img-id-" + cardNumber}
                // onClick={() => this.getCardId(cardNumber)}
                src={require("./cards/" + this.state.tarot[cardNumber].img)}
                width="300px"
                height="480px"
              />
            </td>
            <td>
              <p>
                {this.getAnswers(
                  this.state.tarot[cardNumber].fortune_telling,
                  "Fortune Telling:",
                  cardNumber + "-" + 1
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber]["Questions to Ask"],
                  "Questions to Ask:",
                  cardNumber + "-" + 2
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].keywords,
                  "Keywords:",
                  cardNumber + "-" + 3
                )}
              </p>
            </td>
            <td>
              <p>
                {this.getAnswers(
                  this.state.tarot[cardNumber].meanings.light,
                  "Light Meaning:",
                  cardNumber + "-" + 4
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].meanings.shadow,
                  "Shadow Meaning:",
                  cardNumber + "-" + 5
                )}
              </p>
            </td>
            <td>
              <p>
                {this.getAnswers(
                  this.state.tarot[cardNumber].number,
                  "Number",
                  cardNumber + "-" + 6
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].suit,
                  "Suit",
                  cardNumber + "-" + 7
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber]["Mythical/Spiritual"],
                  "Mythical/Spiritual:",
                  cardNumber + "-" + 8
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].Archetype,
                  "Archetype:",
                  cardNumber + "-" + 9
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].Elemental,
                  "Elemental:",
                  cardNumber + "-" + 10
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].Affirmation,
                  "Affirmation",
                  cardNumber + "-" + 11
                )}
              </p>
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  };

  generateNewCards = () => {
    // Shuffle deck a random number of times or based on the name numerlogy of the person
    var deck;
    if (this.state.singleNumber === "") {
      let numTimes = Math.floor(Math.random() * 10);
      deck = this.state.tarot;
      var count = 0;
      while (count !== numTimes) {
        deck = algo.shuffle(deck);
        count++;
      }
    } else {
      let numTimes = this.state.singleNumber;
      deck = this.state.tarot;
      var count = 0;
      while (count !== numTimes) {
        deck = algo.shuffle(deck);
        count++;
      }
    }
    let cardArr = [this.state.number_piles];
    var pass_flag = true;

    // Ensuring each card is unique
    do {
      cardArr = [this.state.number_piles];
      pass_flag = true;
      for (var i = 0; i < this.state.number_piles; i++) {
        var newCard = Math.floor(Math.random() * 78);
        if (!cardArr.includes(newCard)) {
          cardArr.push(newCard);
          continue;
        } else {
          pass_flag = false;
          break;
        }
      }
    } while (!pass_flag);
    console.log("final cardArr " + cardArr);

    // add pulls to state piles
    var curPileLen = Object.keys(this.state.piles).length;
    for (var i = 0; i < this.state.number_piles; i++) {
      if (i < curPileLen) {
        this.state.piles[i]["cardId"] = cardArr[i + 1];
        this.state.piles[i]["display"] = false;
      } else {
        this.state.piles.push({
          pile: i,
          cardId: cardArr[i + 1],
          display: false,
        });
      }
    }

    this.setState(() => ({
      generatedPiles: true,
      cardsSelected: [],
      tarot: deck,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="primary">Pick a Pile Tarot Reading</h1>
        <ContextProvider
          value={{
            state: this.state,
            tarot: this.tarot,
            cardPicked: this.cardPicked,
            name: this.name,
            birthday: this.birthday,
            horoscope: this.horoscope,
            zodiac: this.zodiac,
            piles: this.piles,
            generatedPiles: this.generatedPiles,
            number_piles: this.number_piles,
            actions: {
              getCardData: this.getCardData,
              getName: this.getName,
              getBirthday: this.getBirthday,
              displayNumber: this.displayNumber,
              displayHoroscope: this.displayHoroscope,
              displayZodiac: this.displayZodiac,
              generateNewCards: this.generateNewCards,
              getCardId: this.getCardId,
              toggleDisplay: this.toggleDisplay,
              getAnswers: this.getAnswers,
              getCardInfoDisplay: this.getCardInfoDisplay,
              getCardSelectedDisplay: this.getCardSelectedDisplay,
            },
          }}
        >
          {this.props.children}
        </ContextProvider>
      </React.Fragment>
    );
  }
}

export default Tarot;
