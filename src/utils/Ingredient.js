/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { fraction } from "mathjs";
import { getFracStrFromUniChar } from "./formatScrapedRecipe";
import { isCookingUnit, normalizeCookingUnit } from "./cookingUnit";

export default class Ingredient {
  constructor(str) {
    this.str = str;
  }

  getIngredientObjects() {
    const normalizedTokens = Ingredient.getArrayFromIngredient(this.str);
    const ingredientObjects = [];
    let ingredientObject = { str: "" };

    for (let i = 0; i < normalizedTokens.length; i += 1) {
      const token = normalizedTokens[i];
      const nextToken = normalizedTokens[i + 1];

      if (typeof token === "number") {
        // A number and a unit marks the beginning of a new ingredient, so add the previous one to ingredientObjects
        if (ingredientObject.str && isCookingUnit(nextToken)) {
          ingredientObjects.push(ingredientObject);
          ingredientObject = { str: "" };
        }
        if (i !== normalizedTokens.length - 1 && isCookingUnit(nextToken)) {
          ingredientObject.quantity = token;
        } else if (i === 0) {
          ingredientObject.quantity = token;
        }
      } else if (isCookingUnit(token)) {
        ingredientObject.unit = token;
      } else {
        ingredientObject.str += `${token} `;
      }
    }

    ingredientObjects.push(ingredientObject);
    return ingredientObjects;
  }

  static getArrayFromIngredient(str, mult = 1) {
    const strCopy = str.trim();
    const tokens = strCopy.split(" ");
    const ingredientObject = {};

    // Match integers, decimals, and vulgar fractions
    const numericalRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?/;

    // These values will be used to build the final ingredients string
    const normalizedTokens = [];

    for (let i = 0; i < tokens.length; i += 1) {
      const current = tokens[i];
      const match = current.match(numericalRE);
      const num = (match && match[0]) || getFracStrFromUniChar(current);

      // Handle number tokens
      if (num) {
        // If the token from the last iteration was a number, add this one to it
        if (normalizedTokens && typeof normalizedTokens.at(-1) === "number") {
          normalizedTokens[normalizedTokens.length - 1] +=
            Number(fraction(num)) * mult;
        } else {
          normalizedTokens.push(Number(fraction(num)) * mult);
        }
        // Handle cooking unit tokens
      } else if (isCookingUnit(current)) {
        const unit = normalizeCookingUnit(current);

        // Unit should be plural if the number before it was greater than 1
        if (
          typeof normalizedTokens.at(-1) === "number" &&
          normalizedTokens.at(-1) > 1
        ) {
          normalizedTokens.push(`${unit}s`);
        } else {
          normalizedTokens.push(unit);
        }
        // Handle unintersting tokens
      } else {
        // Edge case: Undo multiplication operation of any number token that was
        // not was not followed by a unit, or was not the first in the string
        if (
          normalizedTokens.length > 1 &&
          typeof normalizedTokens.at(-1) === "number"
        ) {
          normalizedTokens[normalizedTokens.length - 1] /= mult;
        }
        normalizedTokens.push(current);
      }

      if (typeof normalizedTokens.at(-1) === "number") {
        normalizedTokens[normalizedTokens.length - 1] =
          Math.round(normalizedTokens[normalizedTokens.length - 1] * 100) / 100;
      }
    }

    return normalizedTokens;
  }
}