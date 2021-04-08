export function totalValidate(
  element,
  index,
  elem,
  duplicatedEmailsAndPhones,
  indexOfLetter
) {
  return (
    validationAge(element, index) ||
    validationYearlyIncome(element, index) ||
    validationExperience(element, index, elem) ||
    validationExpirationDate(element, index) ||
    validationPhone(element, index) ||
    validationHasChildren(element, index) ||
    validationLicenceNumber(element, index) ||
    selectDuplicatedEmailAndPhone(
      index,
      duplicatedEmailsAndPhones,
      indexOfLetter
    )
  );
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

export function validationAge(element, index) {
  if (index === 3) {
    const checkPositiveValue = !Boolean(Number(element) > 0);
    const isAgeInteger = !Number.isInteger(Number(element));
    const checkingMinimalAge = !Boolean(Number(element) - 21 > 0);
    return isAgeInteger || checkingMinimalAge || checkPositiveValue;
  }
}

export function validationYearlyIncome(element, index) {
  if (index === 5) {
    const checkPositiveValue = !Boolean(Number(element) > 0);
    const checkMaxValue = !Boolean(Number(element) < 1000000);
    return checkMaxValue || checkPositiveValue;
  }
}

export function validationExperience(element, index, elem) {
  if (index === 4) {
    const checkPositiveValue = !Boolean(Number(element) > 0);
    const compareWithAge = !Boolean(Number(element) <= Number(elem[index - 1]));
    return compareWithAge || checkPositiveValue;
  }
}

export function validationExpirationDate(element, index) {
  if (index === 8) {
    const arrWithcurrentDate = new Date().toLocaleDateString().split(".");
    const currentDate = new Date();
    let arrWithExpirationDate = element.split("-");
    let slashSeparate;
    if (arrWithExpirationDate.length < 3) {
      arrWithExpirationDate = element.split("/");
      slashSeparate = true;
    }
    if (arrWithExpirationDate.length !== 3) {
      return true;
    }
    let expirationDate;
    slashSeparate
      ? (expirationDate = new Date(
          arrWithExpirationDate[2],
          arrWithExpirationDate[0],
          arrWithExpirationDate[1]
        ))
      : (expirationDate = new Date(
          arrWithExpirationDate[0],
          arrWithExpirationDate[1],
          arrWithExpirationDate[2]
        ));
    let checkingYear;
    let checkingTotalDate;
    if (
      arrWithExpirationDate[2].length === 4 &&
      arrWithExpirationDate[0].length === 2 &&
      arrWithExpirationDate[1].length === 2 &&
      slashSeparate
    ) {
      checkingYear = !Boolean(
        Number(arrWithExpirationDate[2]) >= Number(arrWithcurrentDate[2])
      );
      checkingTotalDate = !Boolean(currentDate < expirationDate);
    } else if (
      arrWithExpirationDate[0].length === 4 &&
      arrWithExpirationDate[2].length === 2 &&
      arrWithExpirationDate[1].length === 2 &&
      !slashSeparate
    ) {
      checkingYear = !Boolean(
        Number(arrWithExpirationDate[0]) >= Number(arrWithcurrentDate[2])
      );
      checkingTotalDate = !Boolean(currentDate < expirationDate);
    } else {
      checkingYear = true;
    }
    return checkingYear || checkingTotalDate;
  }
}

export function validationPhone(element, index) {
  const checkingForNumbers = (arrWithNumbers) => {
    if (
      arrWithNumbers.slice(1).every((numb) => !isNaN(Number(numb))) &&
      arrWithNumbers.length >= 10
    ) {
      return false;
    }
    return true;
  };
  if (index === 1) {
    const arrWithNumbers = element.split("");
    if (
      arrWithNumbers.length === 12 &&
      arrWithNumbers[0] === "+" &&
      arrWithNumbers[1] === "1"
    ) {
      checkingForNumbers(arrWithNumbers);
      return false || checkingForNumbers(arrWithNumbers);
    }
    if (arrWithNumbers.length === 11 && arrWithNumbers[0] === "1") {
      checkingForNumbers(arrWithNumbers);
      return false || checkingForNumbers(arrWithNumbers);
    }
    if (arrWithNumbers.length === 10 && arrWithNumbers[0] !== "+") {
      checkingForNumbers(arrWithNumbers);
      return false || checkingForNumbers(arrWithNumbers);
    }
    return true;
  }
}

export function validationHasChildren(element, index) {
  if (index === 6) {
    if (element === "TRUE" || element === "FALSE" || element === "") {
      return false;
    }
    return true;
  }
}

export function validationLicenceNumber(element, index) {
  if (index === 9) {
    let reg = new RegExp("[^a-zA-Z0-9]+");
    if (element.length === 6 && !reg.test(element)) {
      return false;
    }
    return true;
  }
}
