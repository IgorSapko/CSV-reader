import React, { Component } from "react";
import { CSVReader } from "react-papaparse";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import {
  totalValidate,
  validationLicenceNumber,
  selectDuplicatedEmailAndPhone,
} from "../../helpers/validation";
import {
  checkingUniqueEmailPhone,
  decimalYearlyIncome,
  checkNameOfSate,
  deleteSpacing,
  modificationPhone,
  modificationHasChildren,
  validationColumnsNames,
} from "../../helpers/helperFunctions";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import styles from "./CsvReader.module.css";

const buttonRef = React.createRef();

export default class CSVReader1 extends Component {
  state = {
    dataFromCSVFile: null,
    duplicatedEmailsAndPhones: [],
    isValidFile: true,
  };

  componentDidUpdate(prevProps, prevState) {
    this.state.duplicatedEmailsAndPhones.length === 0 &&
      this.state.isValidFile &&
      this.setState((state) => ({
        duplicatedEmailsAndPhones: [
          ...checkingUniqueEmailPhone(state.dataFromCSVFile),
        ],
      }));
  }

  handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data, file) => {
    file && file.name.split(".")[1] !== "csv"
      ? this.setState({ isValidFile: false })
      : !this.state.isValidFile && this.setState({ isValidFile: true });
    if (this.state.isValidFile) {
      const dataWithoutSpacing = deleteSpacing(data);
      !validationColumnsNames(dataWithoutSpacing) &&
        this.setState({ isValidFile: false });
      checkNameOfSate(dataWithoutSpacing);
      modificationPhone(dataWithoutSpacing);
      modificationHasChildren(dataWithoutSpacing);
      this.setState({ dataFromCSVFile: [...dataWithoutSpacing] });
    }
  };

  handleOnError = (err) => {
    alert(err);
  };

  render() {
    const {
      dataFromCSVFile,
      duplicatedEmailsAndPhones,
      isValidFile,
    } = this.state;
    return (
      <>
        <h2 className={styles.title}>Welcome to CSV-file reader</h2>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside className={styles.as}>
              <button
                type="button"
                onClick={this.handleOpenDialog}
                className={styles.button}
              >
                Browse file
              </button>
              <div className={styles.wrapper}>{file && file.name}</div>
            </aside>
          )}
        </CSVReader>
        {dataFromCSVFile && (
          <div className={styles.importDataMarker}>Import users</div>
        )}
        {isValidFile ? (
          dataFromCSVFile && (
            <Table border="2">
              <Thead>
                <Tr className={styles.columnsNames}>
                  <Th key="ID">ID</Th>
                  {dataFromCSVFile[0].map((elem) => (
                    <Th key={elem}>{elem}</Th>
                  ))}
                  <Th key=" Duplicate with"> Duplicate with</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataFromCSVFile.map((elem, indexOfLetter) => {
                  if (indexOfLetter === 0) {
                    return null;
                  }
                  return (
                    <Tr key={indexOfLetter}>
                      {elem.map((element, index) => {
                        if (index === 0) {
                          return [
                            <Td key={indexOfLetter}>{indexOfLetter}</Td>,
                            <Td key={indexOfLetter - 1}>{element}</Td>,
                          ];
                        }
                        if (
                          duplicatedEmailsAndPhones.length > 0 &&
                          index === elem.length - 1
                        ) {
                          const dataOfColumnDuplicateWith = duplicatedEmailsAndPhones
                            .map((pair) => {
                              if (
                                pair.letterWithDuplicatedEmail ===
                                  indexOfLetter ||
                                pair.letterWithDuplicatedPhone === indexOfLetter
                              ) {
                                return [
                                  <Td
                                    key={indexOfLetter}
                                    className={
                                      selectDuplicatedEmailAndPhone(
                                        index,
                                        duplicatedEmailsAndPhones,
                                        indexOfLetter
                                      ) ||
                                      validationLicenceNumber(element, index)
                                        ? styles.selected
                                        : null
                                    }
                                  >
                                    {element}
                                  </Td>,
                                  <Td key={indexOfLetter}>{pair.clone}</Td>,
                                ];
                              }
                              return null;
                            })
                            .filter((elem) => elem);
                          if (dataOfColumnDuplicateWith.length > 0) {
                            return dataOfColumnDuplicateWith;
                          } else {
                            return [
                              <Td key={indexOfLetter}>{element}</Td>,
                              <Td key={indexOfLetter - 2}></Td>,
                            ];
                          }
                        }
                        return (
                          <Td
                            key={indexOfLetter}
                            className={
                              totalValidate(
                                element,
                                index,
                                elem,
                                duplicatedEmailsAndPhones,
                                indexOfLetter
                              )
                                ? styles.selected
                                : null
                            }
                          >
                            {decimalYearlyIncome(element, index) || element}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          )
        ) : (
          <div className={styles.incorrect}>File formai is not correct</div>
        )}
      </>
    );
  }
}
