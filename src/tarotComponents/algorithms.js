function getZodiacSigns(year) {
  if (year < 4) return "Invalid year";
  switch ((year - 4) % 12) {
    case 0:
      return "Rat";

    case 1:
      return "Ox";

    case 2:
      return "Tiger";

    case 3:
      return "Rabbit";

    case 4:
      return "Dragon";

    case 5:
      return "Snake";

    case 6:
      return "Horse";

    case 7:
      return "Goat";

    case 8:
      return "Monkey";

    case 9:
      return "Rooster";

    case 10:
      return "Dog";

    case 11:
      return "Pig";
  }
}

function getHoroscopeSign(day, month) {
  var zodiacSigns = {
    capricorn: "Capricorn - Козерог",
    aquarius: "Aquarius - Водолей",
    pisces: "Pisces - Рыбы",
    aries: "Aries - Овен",
    taurus: "Taurus - Телец",
    gemini: "Gemini - Близнецы",
    cancer: "Cancer - Рак",
    leo: "Leo - Лев",
    virgo: "Virgo - Девы",
    libra: "Libra - Весы",
    scorpio: "Scorpio - Скорпион",
    sagittarius: "Sagittarius - Стрелец",
  };

  var cuspSigns = {
    mystery: "Cusp of Mystery - (Capricorn-Aquarius) / (Козерог-Водолей)", // Jan 16-23
    sensitivity: "Cusp of Sensitivity / (Aquarius-Pisces) / (Водолей-Рыбы)", // Feburary 15-21
    rebirth: "Cusp of Rebirth - (Pisces-Aries) / (Рыбы-Овен)", // March 17-23
    power: "Cusp of Power - (Aries-Taurus) / (Овен-Телец)", // April 16–22
    energy: "Cusp of Energy - (Taurus-Gemini) / (Телец-Близнецы)", // May 17–23
    magic: "Cusp of Magic - (Gemini-Cancer) / (Близнецы-Рак)", // June 17–23
    oscillation: "Cusp of Oscillation - (Cancer-Leo) / (Рак-Лев)", // July 19-25
    exposure: "Cusp of Exposure - (Leo-Virgo) / (Лев-Девы)", // Aug 19-25
    beauty: "Cusp of Beauty - (Virgo-Libra) / (Девы-Весы)", // Sep 19-25
    drama: "Cusp of Drama - (Libra-Scorpio) / (Весы-Скорпион)", // Oct 19-25
    revolution:
      "Cusp of Revolution - (Scorpio-Sagittarius) / (Скорпион-Стрелец)", // Nov 18-24
    prophecy: "Cusp of Prophecy - (Saggittarius-Capricorn) / (Стрелец-Козерог)", // Dec 18-24
  };
  if (month == 1 && day >= 16 && day <= 23) return cuspSigns.mystery;
  if (month == 2 && day >= 15 && day <= 21) return cuspSigns.sensitivity;
  if (month == 3 && day >= 17 && day <= 23) return cuspSigns.rebirth;
  if (month == 4 && day >= 16 && day <= 22) return cuspSigns.power;
  if (month == 5 && day >= 17 && day <= 23) return cuspSigns.energy;
  if (month == 6 && day >= 17 && day <= 23) return cuspSigns.magic;
  if (month == 7 && day >= 19 && day <= 25) return cuspSigns.oscillation;
  if (month == 8 && day >= 19 && day <= 25) return cuspSigns.exposure;
  if (month == 9 && day >= 19 && day <= 25) return cuspSigns.beauty;
  if (month == 10 && day >= 19 && day <= 25) return cuspSigns.drama;
  if (month == 11 && day >= 18 && day <= 24) return cuspSigns.revolution;
  if (month == 12 && day >= 18 && day <= 24) return cuspSigns.prophecy;

  if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
    return zodiacSigns.capricorn;
  } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    return zodiacSigns.aquarius;
  } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    return zodiacSigns.pisces;
  } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return zodiacSigns.aries;
  } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    return zodiacSigns.taurus;
  } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    return zodiacSigns.gemini;
  } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    return zodiacSigns.cancer;
  } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
    return zodiacSigns.leo;
  } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
    return zodiacSigns.virgo;
  } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
    return zodiacSigns.libra;
  } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
    return zodiacSigns.scorpio;
  } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
    return zodiacSigns.sagittarius;
  }
  return "Invalid birthday";
}

function getNameNumerology(name) {
  var x = {
    A: 1,
    J: 1,
    S: 1,
    B: 2,
    K: 2,
    T: 2,
    C: 3,
    L: 3,
    U: 3,
    D: 4,
    M: 4,
    V: 4,
    E: 5,
    N: 5,
    W: 5,
    F: 6,
    O: 6,
    X: 6,
    G: 7,
    P: 7,
    Y: 7,
    H: 8,
    Q: 8,
    Z: 8,
    I: 9,
    R: 9,
  };

  var nameVal = 0;
  for (var i = 0; i < name.length; i++) {
    var curChar = name.charAt(i).toUpperCase();
    if (curChar === " " || curChar === ",") {
      continue;
    }
    var curValue = x[curChar];
    nameVal = nameVal + curValue;
  }
  var singleDigitScore = nameVal;
  while (singleDigitScore >= 10) {
    var total = 0;
    var str = "" + singleDigitScore;
    for (var j = 0; j < str.length; j++) {
      total = total + parseInt(str.charAt(j));
    }
    singleDigitScore = total;
  }
  return [nameVal, singleDigitScore];
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export { getHoroscopeSign, getZodiacSigns, getNameNumerology, shuffle };
