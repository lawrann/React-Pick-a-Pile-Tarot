import React from "react";
import {
  getNameNumerology,
  getZodiacSigns,
  getHoroscopeSign,
  shuffle,
} from "../tarotComponents/algorithms";

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
