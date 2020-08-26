import React from "react";
import { ContextConsumer } from "./context";

const PersonalInformation = () => {
  return (
    <ContextConsumer>
      {({ actions }) => {
        return (
          <React.Fragment>
            <h2>Information</h2>
            <div>
              Full Name:{" "}
              <input
                type="text"
                placeholder="Full Name"
                id="nameBox"
                onChange={actions.getName}
              ></input>
            </div>
            <div>
              Birthday:{" "}
              <input
                type="date"
                id="birthdayBox"
                onChange={actions.getBirthday}
              ></input>
            </div>
            <div>Name Numerology: {actions.displayNumber()}</div>
            <div>Horoscope: {actions.displayHoroscope()}</div>
            <div>Chinese Zodiac: {actions.displayZodiac()}</div>
          </React.Fragment>
        );
      }}
    </ContextConsumer>
  );
};

export default PersonalInformation;
