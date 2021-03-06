import React, { useState } from 'react';

import './Form.scss';

export const Form = () => {
  const [rowsInputValue, setRowsInputValue] = useState('');
  const [rowsIsValid, setRowsIsValid] = useState(true);
  const [columnsInputValue, setColumnsInputValue] = useState('');
  const [columnsIsValid, setColumnsIsValid] = useState(true);
  const [closestInputValue, setClosestInputValue] = useState('');
  const [closestIsValid, setClosestIsValid] = useState(true);


  const rowsAndColumnsValidation = (inputValue) => {
    if (inputValue && typeof Number(inputValue) === 'number') {
      return true;
    } else {
      return false;
    }
  }

  const closestValidation = (value) => {
    if (rowsInputValue && columnsInputValue) {
      if (Number(value) <= Number(rowsInputValue) * Number(columnsInputValue)) {
        return true;
      } else {
        return false;
      }
    }
  }

  const makeMatrix = (e) => {
    e.preventDefault()

    if (rowsAndColumnsValidation(rowsInputValue) && rowsAndColumnsValidation(columnsInputValue)) {
      if (closestValidation(closestInputValue)) {
        location.assign(`http://localhost:3000/columns=${columnsInputValue}/rows=${rowsInputValue}/closest=${closestInputValue}`);
      } else {
        setClosestIsValid(false);
      }
    } else {
      setRowsIsValid(false);
      setColumnsIsValid(false);
    }
  }

   return (
     <form className="form" onSubmit={makeMatrix} >
       <h1>Matrix Maker</h1>
       <div className="form__input-wrapper">
          <label className="form__label">
            Number of rows
            <input
              type="text"
              name="rows"
              className="form__input"
              onChange={(e) => setRowsInputValue(e.target.value)}
            />
          </label>
          <p className="form__error" style={rowsIsValid ? { opacity: '0' } : {opacity: '1'}}>
            Enter a number of rows
          </p>
       </div>
       <div className="form__input-wrapper">
          <label className="form__label">
            Number of columns 
            <input
              type="text"
              name="columns"
              className="form__input"
              onChange={(e) => setColumnsInputValue(e.target.value)}
            />
          </label>
          <p className="form__error" style={columnsIsValid ? { opacity: '0' } : {opacity: '1'}}>
            Enter a number of columns
          </p>
       </div>
       <div className="form__input-wrapper">
          <label className="form__label">
          Number of closest cells to shown
            <input
              type="text"
              id="closest"
              name="closest"
              className="form__input"
              onChange={(e) => setClosestInputValue(e.target.value)}
            />
          </label>
          <p className="form__error" style={closestIsValid ? { opacity: '0' } : {opacity: '1'}}>
            Enter a number of closest cells to shown (min: 1, max: columns * rows)
          </p>
       </div>
       <button className="form__button">Make a matrix</button>
     </form>
   )
}
 