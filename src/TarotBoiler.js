import React from "react";
import Tarot from "./tarotComponents/Tarot";
import PersonalInformation from "./tarotComponents/PersonalInformation";
import CardsGenerator from "./tarotComponents/CardsGenerator";
import CardInfoPanel from "./tarotComponents/CardInfoPanel";

const TarotBoiler = () => {
  return (
    <div className="tarotBoiler">
      <Tarot>
        <PersonalInformation />
        <CardsGenerator />
      </Tarot>
    </div>
  );
};

export default TarotBoiler;
