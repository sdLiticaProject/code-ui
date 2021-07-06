export const SHOW_TOOLTIP = 'SHOW_TOOLTIP';
export const ADD_LINE = 'ADD_LINE';
export const REMOVE_LINE = 'REMOVE_LINE';

export const showTooltip = () => ({
  type: SHOW_TOOLTIP,
});

export const addLine = (line) => ({
  type: ADD_LINE,
  payload: line,
});

export const removeLine = (line) => ({
  type: REMOVE_LINE,
  payload: line,
});
