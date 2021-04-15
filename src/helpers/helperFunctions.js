/* eslint-disable no-loop-func */
import states from "../data/states.json";

export function checkingUniqueEmailPhone(data) {
  let i = 1;

  do {
    for (let y = 1; y < data.length; y++) {
      if (
        data[y][2].value.toLowerCase() === data[i][2].value.toLowerCase() &&
        i !== y
      ) {
        data[i][10] = { value: y, isValid: true };
        data[i][2] = { ...data[i][2], isValid: false };
        break;
      }
      if (data[y][1].value === data[i][1].value && i !== y) {
        data[i][10] = { value: y, isValid: true };
        data[i][1] = { ...data[i][1], isValid: false };
        break;
      }
      data[i][10] = { value: null, isValid: true };
    }
    i++;
  } while (i < data.length);
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
      return { value: arrColumnName.join(""), isValid: true };
    });
  });
}

export function checkNameOfSate(data) {
  data.forEach((line, ind) => {
    if (ind === 0) {
      return;
    }
    const arrOfStates = line[7].value.split("|");
    let foundSates = [];
    arrOfStates.forEach((inputState) => {
      const stateFromList = states.find(
        (state) =>
          state.name
            .toLowerCase()
            .split("")
            .filter((letter) => letter !== " ")
            .join("") ===
            inputState
              .toLowerCase()
              .split("")
              .filter((letter) => letter !== " ")
              .join("") ||
          state.abbreviation.toLowerCase() === inputState.toLowerCase()
      );
      if (stateFromList) {
        foundSates.push(stateFromList);
      }
      if (!stateFromList) {
        foundSates.push(inputState);
        return (line[7] = { ...line[7], isValid: false });
      }
    });
    let arrOfShortStates;
    if (foundSates) {
      arrOfShortStates = foundSates.map(
        (state) => state && (state.abbreviation || state)
      );
    }
    if (arrOfShortStates.length > 0) {
      return (data[ind][7] = {
        ...data[ind][7],
        value: arrOfShortStates.join(", "),
      });
    }
    data[ind][7] = { value: null, isValid: false };
  });
}

export function modificationPhone(data) {
  data.forEach((line, ind) => {
    if (ind === 0) {
      return;
    }
    const arrWithNumbers = line[1].value.split("");
    if (arrWithNumbers.length === 11 && arrWithNumbers[0] === "1") {
      const modifiedElement = "+" + line[1].value;
      data[ind].splice(1, 1, { value: modifiedElement, isValid: true });
    }
    if (arrWithNumbers.length === 10 && arrWithNumbers[0] !== "+") {
      const modifiedElement = "+1" + line[1].value;
      data[ind].splice(1, 1, { value: modifiedElement, isValid: true });
    }
  });
}

export function modificationHasChildren(data) {
  data.forEach((line, ind) => {
    if (ind === 0) {
      return;
    }
    if (line[6] === "") {
      data[ind].splice(6, 1, { value: "FALSE", isValid: true });
    }
  });
}

export function validationColumnsNames(data) {
  if (
    data[0].some(({ value }) => value.toLowerCase() === "full name") &&
    data[0].some(({ value }) => value.toLowerCase() === "phone") &&
    data[0].some(({ value }) => value.toLowerCase() === "email")
  ) {
    return true;
  }
  return false;
}

export function checkAndModify(data) {
  checkNameOfSate(data);
  modificationPhone(data);
  modificationHasChildren(data);
  checkingUniqueEmailPhone(data);
}
