import React from "react";
import { ContextProvider } from "./context";
import TarotData from "./tarot-images.json";
import * as algo from "./algorithms";

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
    number_piles: 4,
    piles: [
      { pile: 1, cardId: -1, display: false },
      { pile: 2, cardId: -1, display: false },
      { pile: 3, cardId: -1, display: false },
      { pile: 4, cardId: -1, display: false },
    ],
  };

  getCardId = (pileNum) => {
    const clonePile = [...this.state.piles];
    console.log("clonePile[0][display]" + clonePile[0]["display"]);
    console.log("clonePile[1][display] " + clonePile[1]["display"]);
    console.log("clonePile[2][display] " + clonePile[2]["display"]);
    console.log("clonePile[3][display] " + clonePile[3]["display"]);

    for (var i = 0; i < this.state.number_piles; i++) {
      console.log("i : " + i + " pileNum : " + pileNum);
      if (i !== pileNum) clonePile[i]["display"] = false;
    }
    clonePile[pileNum]["display"] = true;

    this.setState((prevState) => ({
      generatedPiles: true,
      piles: [...prevState.piles],
    }));
    console.log(
      "this.state.piles[0][display]" + this.state.piles[0]["display"]
    );
    console.log(
      "this.state.piles[1][display] " + this.state.piles[1]["display"]
    );
    console.log(
      "this.state.piles[2][display] " + this.state.piles[2]["display"]
    );
    console.log(
      "this.state.piles[3][display] " + this.state.piles[3]["display"]
    );

    return this.state.piles[pileNum]["cardId"];
  };

  displayNumber = () => {
    return (
      <h3>
        Numerlogy: {this.state.nameNumerlogy} / {this.state.singleNumber}
      </h3>
    );
  };

  displayHoroscope = () => {
    return <h3>{this.state.horoscope}</h3>;
  };

  displayZodiac = () => {
    return <h3>{this.state.zodiac}</h3>;
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

  getCardData = (cardNumber) => {
    return (
      <React.Fragment>
        <img src={require("./cards/" + this.state.tarot[cardNumber].img)} />

        <div>Name: {this.state.tarot[cardNumber].name}</div>
        <div>Image: {this.state.tarot[cardNumber].img}</div>
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
        <div>Suit: {this.state.tarot[cardNumber].suit}</div>
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

  generateNewPiles = () => {
    this.shuffleDeck((this.state.singleNumber = 1));
    let cardArr = [this.state.number_piles];
    var pass_flag = true;
    do {
      cardArr = [this.state.number_piles];
      pass_flag = true;
      for (var i = 0; i < this.state.number_piles; i++) {
        var newCard = Math.floor(Math.random() * 78);
        if (!cardArr.includes(newCard)) {
          cardArr.push(newCard);
          // console.log("Pass cardArr " + cardArr);
          continue;
        } else {
          pass_flag = false;
          // console.log("Break cardArr " + cardArr);
          break;
        }
      }
    } while (!pass_flag);
    console.log("final cardArr " + cardArr);

    this.setState(() => ({
      generatedPiles: true,
      piles: [
        { pile: 1, cardId: cardArr[1], display: false },
        { pile: 2, cardId: cardArr[2], display: false },
        { pile: 3, cardId: cardArr[3], display: false },
        { pile: 4, cardId: cardArr[4], display: false },
      ],
    }));
    console.log("this.state.piles[0][cardId]" + this.state.piles[0]["cardId"]);
    console.log("this.state.piles[1][cardId] " + this.state.piles[1]["cardId"]);
    console.log("this.state.piles[2][cardId] " + this.state.piles[2]["cardId"]);
    console.log("this.state.piles[3][cardId] " + this.state.piles[3]["cardId"]);
  };

  displayUi = (pileNum) => {
    if (this.state.piles[pileNum]["display"] === true) {
      return this.getCardData(pileNum);
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1>Pick a Pile Tarot Reading</h1>
        {/* {this.getCardData(77)}; */}
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
            actions: {
              updateInformation: this.updateInformation,
              getCardData: this.getCardData,
              getName: this.getName,
              getBirthday: this.getBirthday,
              displayNumber: this.displayNumber,
              displayHoroscope: this.displayHoroscope,
              displayZodiac: this.displayZodiac,
              generateNewPiles: this.generateNewPiles,
              getCardId: this.getCardId,
              displayUi: this.displayUi,
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
