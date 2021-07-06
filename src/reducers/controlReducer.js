import { ADD_LINE, REMOVE_LINE, SHOW_TOOLTIP } from '../actions/chartActions';

const initialState = {
  doShow: true,
  lines: ['New York_1', 'San Francisco_1', 'Austin_1', 'New York_2', 'San Francisco_2', 'Austin_2'],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_TOOLTIP: {
      return {
        ...state,
        doShow: !state.doShow,
      };
    }
    case ADD_LINE: {
      return {
        ...state,
        lines: [...state.lines, action.payload],
      };
    }
    case REMOVE_LINE: {
      return {
        ...state,
        lines: state.lines.filter((line) => line !== action.payload),
      };
    }
    default:
      return state;
  }
}

export const getDoShow = (state) => state.chartControl.doShow;
export const getLines = (state) => state.chartControl.lines;
