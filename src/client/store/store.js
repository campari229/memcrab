import {createStore, AnyAction } from 'redux';
import { getAverageValues, findClosest } from '../lib/lib.js';

const SET_CELLS = 'SET_CELLS';
const ADD_ROW = 'ADD_ROW';
const REMOVE_ROW = 'REMOVE_ROW';
const INCREMENT = 'INCREMENT';
const PERCENTS_TOGGLE = 'PERCENTS_TOGGLE';
const SET_NUMBER_OF_CLOSEST = 'SET_NUMBER_OF_CLOSEST';
const SHOW_CLOSEST = 'SHOW_CLOSEST';

export const setCells = (cells) => ({
  type: SET_CELLS,
  cells,
});
export const addRow = (row) => ({
  type: ADD_ROW,
  row,
})
export const removeRow = (number) => ({
  type: REMOVE_ROW,
  number,
})
export const increment = (id, rowIndex) => ({
  type: INCREMENT,
  id,
  rowIndex,
})
export const percentsToggle = (rowIndex) => ({
  type: PERCENTS_TOGGLE,
  rowIndex,
})
export const showClosest = (target) => ({
  type: SHOW_CLOSEST,
  target,
})
export const setNumberOfClosest = (numberOfClosest) => ({
  type: SET_NUMBER_OF_CLOSEST,
  numberOfClosest,
})

export const getCells = (state) => state.cells;
export const getTableFooter = (state) => state.tableFooter;

// type InitialState = {
//   cells: Cell[][];
//   tableFooter: Cell[];
//   numberOfClosest: number;
// };

// const initialState = {
//   cells: [],
//   tableFooter: [],
//   numberOfClosest: 0,
// };



export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CELLS':
      return {
        ...state,
        cells: action.cells,
        tableFooter: getAverageValues(action.cells),
      };

    case 'ADD_ROW':
      return {
        ...state,
        cells: [
          ...state.cells,
          action.row,
        ],
        tableFooter: getAverageValues([...state.cells, action.row])
      };

    case 'REMOVE_ROW':
      const filteredCells = state.cells.filter((row, index) => index !== action.number)
      return {
        ...state,
        cells: filteredCells,
        tableFooter: getAverageValues(filteredCells),
      }

    case 'INCREMENT':
      const cells = [...state.cells]
      const incrementedCell = cells[action.rowIndex].find(cell => cell.id === action.id);
      if (incrementedCell) {
        incrementedCell.amount++;
      }
      return {
        ...state,
        ...cells,
        tableFooter: getAverageValues(cells),
      }

      case 'PERCENTS_TOGGLE':
        const percentsCells = [...state.cells]
        percentsCells[action.rowIndex] = percentsCells[action.rowIndex].map(cell => ({
          ...cell,
          isPercentsShown: !cell.isPercentsShown
        }))
        return {
          ...state,
          cells: percentsCells,
        }

      case 'SET_NUMBER_OF_CLOSEST':
        return {
          ...state,
          numberOfClosest: action.numberOfClosest,
        }

      case 'SHOW_CLOSEST':
        const closest = findClosest(state.cells, action.target, state.numberOfClosest);
        const closestCells = [...state.cells];
        closestCells.forEach(row => {
          row.forEach(cell => {
            if (closest.includes(cell)) {
              cell.isCloser = !cell.isCloser
            }
          })
        })
        return {
          ...state,
          cells: closestCells,
        };

    default:
      return state;
  }
};

// const store = createStore(reducer);

// export default store;
