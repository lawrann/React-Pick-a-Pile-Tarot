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
    number_piles: 20,
    piles: [
      { pile: 1, cardId: -1, display: false },
      { pile: 2, cardId: -1, display: false },
      { pile: 3, cardId: -1, display: false },
      { pile: 4, cardId: -1, display: false },
    ],
    cardsSelected: [],
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

  getCardId = (pileNum) => {
    const clonePile = [...this.state.piles];
    clonePile[pileNum]["display"] = !clonePile[pileNum]["display"];
    this.setState((prevState) => ({
      generatedPiles: true,
      piles: [...prevState.piles],
    }));
    return this.state.piles[pileNum]["cardId"];
  };

  displayNumber = () => {
    return (
      <Col>
        Numerlogy: {this.state.nameNumerlogy} / {this.state.singleNumber}
      </Col>
    );
  };

  displayHoroscope = () => {
    return <Col>{this.state.horoscope}</Col>;
  };

  displayZodiac = () => {
    return <Col>{this.state.zodiac}</Col>;
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

  displayUi = (cardNum) => {
    if (this.state.piles[cardNum]["display"] === true) {
      return this.getCardData(cardNum);
    }
  };

  getAnswers(question, text) {
    let uis = [];
    if (question === "" || question === undefined) {
      return;
    } else if (typeof question === "object") {
      uis.push(<b>{text}</b>);
      uis.push(<br></br>);
      for (const q of question) {
        uis.push(q);
        uis.push(<br></br>);
      }
    } else {
      uis.push(<b>{text}</b>);
      uis.push(<br></br>);
      uis.push(question);
      uis.push(<br></br>);
    }
    uis.push(<br></br>);
    return uis;
  }

  getCardData = (cardNumber) => {
    return (
      <React.Fragment key={cardNumber}>
        <tbody>
          <tr>
            <td>
              <h2>{this.state.tarot[cardNumber].name}</h2>
              <h2>Arcana: {this.state.tarot[cardNumber].arcana}</h2>
              <img
                onClick={() => this.getCardId(cardNumber)}
                src={require("./cards/" + this.state.tarot[cardNumber].img)}
              />
            </td>
            <td>
              <p>
                {this.getAnswers(
                  this.state.tarot[cardNumber].fortune_telling,
                  "Fortune Telling:"
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber]["Questions to Ask"],
                  "Questions to Ask:"
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].keywords,
                  "Keywords:"
                )}
              </p>
            </td>
            <td>
              <p>
                {this.getAnswers(
                  this.state.tarot[cardNumber].meanings.light,
                  "Light Meaning:"
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].meanings.shadow,
                  "Shadow Meaning:"
                )}
              </p>
            </td>
            <td>
              <p>
                {this.getAnswers(this.state.tarot[cardNumber].number, "Number")}
                {this.getAnswers(this.state.tarot[cardNumber].suit, "Suit")}
                {this.getAnswers(
                  this.state.tarot[cardNumber]["Mythical/Spiritual"],
                  "Mythical/Spiritual:"
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].Archetype,
                  "Archetype:"
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].Elemental,
                  "Elemental:"
                )}
                {this.getAnswers(
                  this.state.tarot[cardNumber].Affirmation,
                  "Affirmation"
                )}
              </p>
            </td>
          </tr>
        </tbody>
        {/*<div>Image: {this.state.tarot[cardNumber].img}</div>
        <div>Keywords: {this.state.tarot[cardNumber].keywords}</div>
        <div>Affirmation: {this.state.tarot[cardNumber].Affirmation}</div>
        <div>Archetype: {this.state.tarot[cardNumber].Archetype}</div>
        <div>Elemental: {this.state.tarot[cardNumber].Elemental}</div>
        <div>
          Hebrew Alphabet: {this.state.tarot[cardNumber]["Hebrew Alphabet"]}
        </div>
        <div>
          Mythical/Spiritual:{" "}
          {this.state.tarot[cardNumber]["Mythical/Spiritual"]}
        </div>
        <div>Numerology: {this.state.tarot[cardNumber].Numerology}</div>
        <div>
          Questions to Ask: {this.state.tarot[cardNumber]["Questions to Ask"]}
        </div>
        <div>Arcana: {this.state.tarot[cardNumber].arcana}</div>
        <div>
          Fortune Telling: {this.state.tarot[cardNumber].fortune_telling}
        </div>
        <div>Keywords: {this.state.tarot[cardNumber].keywords}</div>
        <div>
          Meaning - Light: {this.state.tarot[cardNumber].meanings.light}
        </div>
        <div>
          Meaning - Shadow: {this.state.tarot[cardNumber].meanings.shadow}
        </div>
        <div>Number: {this.state.tarot[cardNumber].number}</div>
        <div>Suit: {this.state.tarot[cardNumber].suit}</div> */}
      </React.Fragment>
    );
  };

  shuffleDeck = (numTimes) => {
    let deck = this.state.tarot;
    var count = 0;
    while (count !== numTimes) {
      deck = algo.shuffle(deck);
      count++;
    }
    this.setState((prevState) => ({
      tarot: deck,
    }));
  };

  generateNewCards = () => {
    // Shuffle deck a random number of times or based on the name numerlogy of the person
    if (this.state.singleNumber === "") {
      this.shuffleDeck(Math.floor(Math.random() * 10));
    } else {
      this.shuffleDeck(this.state.singleNumber);
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
              displayUi: this.displayUi,
              toggleDisplay: this.toggleDisplay,
              getCardInfoDisplay: this.getCardInfoDisplay,
              setDisplay: this.setDisplay,
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
