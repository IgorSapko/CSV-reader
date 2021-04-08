/* eslint-disable no-loop-func */
import states from "../data/states.json";

export function checkingUniqueEmailPhone(data) {
  let duplicatedEmailAndPhone = [];
  let i = 1;
  do {
    data.forEach((elem, ind) => {
      if (elem[2].toLowerCase() === data[i][2].toLowerCase() && i !== ind) {
        duplicatedEmailAndPhone.push({
          letterWithDuplicatedEmail: i,
          clone: ind,
        });
        // increment because of we need the first duplicated data
        i++;
      }
      if (elem[1] === data[i][1] && i !== ind) {
        duplicatedEmailAndPhone.push({
          letterWithDuplicatedPhone: i,
          clone: ind,
        });
        // increment because of we need the first duplicated data
        i++;
      }
    });
    i++;
  } while (i < data.length);
  if (duplicatedEmailAndPhone.length > 0) {
    return duplicatedEmailAndPhone;
  }
  return ["Duplicated data not found"];
}

export function selectDuplicatedEmailAndPhone(
  index,
  duplicatedEmailsAndPhones,
  indexOfLetter
) {
  return (
    (index === 1 || index === 2) &&
    duplicatedEmailsAndPhones.length > 0 &&
    duplicatedEmailsAndPhones.some(
      (elem) =>
        (indexOfLetter === elem.letterWithDuplicatedPhone && index === 1) ||
        (indexOfLetter === elem.letterWithDuplicatedEmail && index === 2)
    )
  );
}

export function decimalYearlyIncome(element, index) {
  if (index === 5) {
    return Math.round(Number(element) * 100) / 100;
  }
}

export function deleteSpacing(data) {
  return data.map((elem) => {
    return elem.data.map((element) => {
      const arrColumnName = element
        .split(" ")
        .filter((letter) => letter !== "");
      if (arrColumnName.length === 2) {
        arrColumnName.splice(1, 0, " ");
      }
      return arrColumnName.join("");
    });
  });
}

export function checkNameOfSate(data) {
  data.forEach((line, ind) => {
    if (ind === 0) {
      return;
    }
    const arrOfStates = line[7].split("|");
    let foundSates = [];
    arrOfStates.forEach((inputState) => {
      const stateFromList = states.find(
        (state) =>
          state.name
            .toLowerCase()
            .split("")
            .filter((letter) => letter !== " ")
            .join("") === inputState.toLowerCase().split("")
            .filter((letter) => letter !== " ")
            .join("") ||
          state.abbreviation.toLowerCase() === inputState.toLowerCase()
      );
      stateFromList
        ? foundSates.push(stateFromList)
        : foundSates.push("State not found");
    });
    const arrOfShortStates = foundSates.map(
      (state) => state.abbreviation || state
    );
    foundSates.length > 0
      ? data[ind].splice(7, 1, arrOfShortStates.join(", "))
      : data[ind].splice(7, 1, "State not found");
  });
}

export function modificationPhone(data) {
  data.forEach((line, ind) => {
    if (ind === 0) {
      return;
    }
    const arrWithNumbers = line[1].split("");
    if (arrWithNumbers.length === 11 && arrWithNumbers[0] === "1") {
      const modifiedElement = "+" + line[1];
      data[ind].splice(1, 1, modifiedElement);
    }
    if (arrWithNumbers.length === 10 && arrWithNumbers[0] !== "+") {
      const modifiedElement = "+1" + line[1];
      data[ind].splice(1, 1, modifiedElement);
    }
  });
}

export function modificationHasChildren(data) {
  data.forEach((line, ind) => {
    if (ind === 0) {
      return;
    }
    if (line[6] === "") {
      data[ind].splice(6, 1, "FALSE");
    }
  });
}

export function validationColumnsNames(data) {
  if (
    data[0].some((elem) => elem.toLowerCase() === "full name") &&
    data[0].some((elem) => elem.toLowerCase() === "phone") &&
    data[0].some((elem) => elem.toLowerCase() === "email")
  ) {
    return true;
  }
  return false;
}
