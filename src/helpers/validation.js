import moment from "moment";

export function totalValidate(element, index, elem) {
  validationAge(element, index);
  validationYearlyIncome(element, index);
  validationExperience(element, index, elem);
  validationExpirationDate(element, index);
  validationPhone(element, index);
  validationHasChildren(element, index);
  validationLicenceNumber(element, index);
}

export function validationAge(data) {
  return data.forEach((line) => {
    const checkPositiveValue = Number(line[3].value) > 0;
    const isAgeInteger = Number.isInteger(Number(line[3].value));
    const checkingMinimalAge = Number(line[3].value) - 21 > 0;
    if (!(isAgeInteger && checkingMinimalAge && checkPositiveValue)) {
      return (line[3] = { ...line[3], isValid: false });
    }
  });
}

export function validationYearlyIncome(data) {
  return data.forEach((line) => {
    const decimalValue = Math.round(Number(line[5].value) * 100) / 100;
    const checkPositiveValue = Number(line[5].value) > 0;
    const checkMaxValue = Number(line[5].value) < 1000000;
    if (!(checkMaxValue && checkPositiveValue && decimalValue)) {
      return (line[5] = {
        ...line[5],
        isValid: false,
      });
    }
    return (line[5] = {
      value: decimalValue,
      isValid: true,
    });
  });
}

export function validationExperience(data) {
  return data.forEach((line) => {
    const checkPositiveValue = Number(line[4].value) > 0;
    const compareWithAge = Number(line[4].value) <= Number(line[3].value);
    if (!(compareWithAge && checkPositiveValue)) {
      return (line[4] = { ...line[4], isValid: false });
    }
  });
}

export function validationExpirationDate(data) {
  moment.defaultFormat1 = "MM/DD/YYYY";
  moment.defaultFormat2 = "YYYY-MM-DD";
  return data.forEach((line, index) => {
    if (index !== 0) {
      const momentObj1 = moment(`${line[8].value}`, moment.defaultFormat1);
      const momentObj2 = moment(`${line[8].value}`, moment.defaultFormat2);
      if (
        (momentObj1._isValid &&
          momentObj1._pf.unusedInput.length === 0 &&
          momentObj1 >= moment() &&
          line[8].value.split("/")[0].length === 2 &&
          line[8].value.split("/")[1].length === 2) ||
        (momentObj2._isValid &&
          momentObj2._pf.unusedInput.length === 0 &&
          momentObj2 >= moment() &&
          line[8].value.split("-")[2].length === 2 &&
          line[8].value.split("-")[1].length === 2)
      ) {
        return;
      }
      line[8] = { ...line[8], isValid: false };
    }
  });
}

export function validationPhone(data) {
  const checkingForNumbers = (arrWithNumbers) => {
    if (arrWithNumbers.slice(1).every((numb) => !isNaN(Number(numb)))) {
      return true;
    }
    return false;
  };
  return data.forEach((line, index) => {
    if (index !== 0) {
      const arrWithNumbers = line[1].value.split("");
      if (
        arrWithNumbers.length === 12 &&
        arrWithNumbers[0] === "+" &&
        arrWithNumbers[1] === "1" &&
        checkingForNumbers(arrWithNumbers)
      ) {
        return;
      }
      if (
        arrWithNumbers.length === 11 &&
        arrWithNumbers[0] === "1" &&
        checkingForNumbers(arrWithNumbers)
      ) {
        return;
      }
      if (
        arrWithNumbers.length === 10 &&
        arrWithNumbers[0] !== "+" &&
        checkingForNumbers(arrWithNumbers)
      ) {
        return;
      }
      return (line[1] = { ...line[1], isValid: false });
    }
  });
}

export function validationHasChildren(data) {
  return data.forEach((line, index) => {
    if (index !== 0) {
      if (line[6].value === "TRUE" || line[6].value === "FALSE") {
        return;
      }
      if (line[6].value === "") {
        return (line[6] = { value: "FALSE", isValid: true });
      }
      return (line[6] = { ...line[6], isValid: false });
    }
  });
}

export function validationLicenceNumber(data) {
  return data.forEach((line, index) => {
    if (index !== 0) {
      let reg = new RegExp("[^a-zA-Z0-9]+");
      let isPositiveValue = true;
      if (!isNaN(Number(line[9].value))) {
        if (Number(line[9].value) >= 0) {
          isPositiveValue = true;
        }
        isPositiveValue = false;
      }
      if (
        line[9].value.length === 6 &&
        !reg.test(line[9].value) &&
        isPositiveValue
      ) {
        return;
      }
      return (line[9] = { ...line[9], isValid: false });
    }
  });
}
